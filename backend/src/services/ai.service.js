const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})


const interviewReportSchema = z.object({

  // ─── Meta ───────────────────────────────────────────────────────────────────
  title: z
    .string()
    .min(3)
    .max(100)
    .describe(
      "Exact job title as written in the job description (e.g. 'Senior Frontend Engineer – React'). " +
      "Do NOT paraphrase or generalise."
    ),

  company: z
    .string()
    .optional()
    .describe("Company name if mentioned in the job description, else omit."),

  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      "Integer 0-100 representing how well the candidate's current skills match the job requirements. " +
      "Use the full range: 0-30 = weak fit, 31-60 = partial fit, 61-85 = strong fit, 86-100 = near-perfect fit. " +
      "Penalise for each high-severity skill gap (-10 per gap), medium (-5), low (-2). " +
      "Do NOT round to a suspiciously round number; be specific (e.g. 67, not 70)."
    ),

  // ─── Questions ──────────────────────────────────────────────────────────────
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A realistic, specific technical question an interviewer would ask for this exact role and seniority level. " +
            "Avoid vague questions like 'Tell me about React'. Prefer targeted ones like " +
            "'How would you optimise a React component that re-renders 200 times per second?'"
          ),
        intention: z
          .string()
          .max(200)
          .describe(
            "One or two sentences: what skill, depth of knowledge, or thinking pattern is the " +
            "interviewer trying to assess with this question? Be specific to this question, not generic."
          ),
        answer: z
          .string()
          // .min(100)
          .describe(
            "A complete model answer the candidate should give. Cover: (1) core concept or definition, " +
            "(2) relevant trade-offs or caveats, (3) a concrete example or code sketch, " +
            "(4) how it applies to THIS job's stack/domain. Min 3-4 sentences. " +
            "Do not use filler phrases like 'Great question'. Write as if coaching the candidate directly."
          ),
      })
    )
    .min(5)
    .max(10)
    .describe(
      "5-10 technical interview questions ordered from foundational to advanced. " +
      "Cover the primary tech stack, one system design/architecture question (if the role warrants it), " +
      "and at least one debugging or trade-off scenario."
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A realistic behavioral question using STAR-compatible phrasing " +
            "(e.g. 'Describe a time when...', 'How have you handled...'). " +
            "Make it specific to the seniority and domain of the role."
          ),
        intention: z
          .string()
          .max(200)
          .describe(
            "One or two sentences explaining which competency this question probes " +
            "(e.g. conflict resolution, ownership, communication under pressure). " +
            "Tie it to what this specific role requires."
          ),
        answer: z
          .string()
          // .min(80)
          .describe(
            "STAR-structured coaching guidance: Situation setup → Task the candidate owned → " +
            "Action they took (emphasise individual contribution) → Result with a measurable outcome. " +
            "List 2-3 key points the candidate must include. Note any common mistakes to avoid."
          ),
      })
    )
    .min(3)
    .max(6)
    .describe(
      "3-6 behavioral questions that reflect the company's likely culture and the role's key challenges. " +
      "Include at least one question about collaboration, one about handling failure or ambiguity, " +
      "and one relevant to the candidate's career stage."
    ),

  // ─── Gaps ───────────────────────────────────────────────────────────────────
  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "The specific technology, concept, or competency the candidate is missing or underqualified in " +
            "(e.g. 'Redis caching strategies', 'TypeScript generics', 'system design at scale'). " +
            "Be precise — do NOT write 'backend skills' when you mean 'Node.js streaming APIs'."
          ),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "low = nice-to-have, easily learned on the job; " +
            "medium = frequently used in the role, candidate would struggle initially; " +
            "high = core requirement listed in JD, candidate is significantly unprepared and this " +
            "could be a hiring blocker."
          ),
        recommendation: z
          .string()
          .max(500)
          .describe(
            "One concrete action the candidate should take to close this gap before the interview " +
            "(e.g. 'Complete the official Redis tutorial and build a simple rate-limiter in 2 days'). " +
            "Must be actionable and time-bounded. Do NOT say 'study more'."
          ),
      })
    )
    .describe(
      "All meaningful gaps between the candidate's profile and the job requirements. " +
      "List high-severity gaps first. Do not list skills the candidate already has. " +
      "Omit gaps so minor they would not influence hiring decisions."
    ),

  // ─── Preparation Plan ───────────────────────────────────────────────────────
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .int()
          .min(1)
          .describe("Day number starting from 1, sequential, no gaps."),
        focus: z
          .string()
          .max(80)
          .describe(
            "The single primary theme for the day (e.g. 'System design fundamentals', " +
            "'React performance & profiling', 'Mock technical interview'). " +
            "One focus per day — do NOT list multiple topics here."
          ),
        tasks: z
          .array(
            z.string().describe(
              "One concrete, completable task (e.g. " +
              "'Read the official Next.js data-fetching docs and summarise the difference between SSR and SSG', " +
              "'Solve 3 LeetCode medium array problems', " +
              "'Record a 5-minute mock answer to the top behavioural question and review it'). " +
              "Must be specific enough that the candidate knows exactly what to do. " +
              "Avoid vague tasks like 'review JavaScript'."
            )
          )
          .min(2)
          .max(5)
          .describe("2-5 tasks for the day, ordered by priority (most important first)."),
      })
    )
    .min(3)
    .describe(
      "A day-by-day preparation plan long enough to meaningfully close the identified skill gaps. " +
      "Days 1-2: cover high-severity gaps. Middle days: medium gaps + core revision. " +
      "Final day: mock interview + rest. Do NOT pad with filler days."
    ),
});




async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


  const prompt = `
Act as an expert Technical Interviewer and Career Coach. 
Your task is to analyze the provided Resume and Job Description (JD) to generate a structured Interview Preparation Report.

### INPUT DATA:
- Resume: ${resume}
- Self Description: ${selfDescription}
- Job Description: ${jobDescription}

### GOAL:
Based on the candidate's background and the JD requirements, generate a JSON object that matches the schema exactly.
1. Identify the 'matchScore' based on skills.
2. Generate 'technicalQuestions' and 'behavioralQuestions' tailored to this specific candidate's gaps and strengths.
3. Identify 'skillGaps' (e.g., if the JD asks for .NET but they only know Node.js).
4. Create a 7-day 'preparationPlan' to help this candidate bridge those gaps.

### OUTPUT INSTRUCTIONS:
- Generate ONLY valid JSON.
- DO NOT use keys like 'candidate_details' or 'job_role'.
- USE ONLY these top-level keys: "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title".
- Ensure 'severity' is strictly one of: "low", "medium", or "high".
- No conversational text before or after the JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    // model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          matchScore: { type: "integer" },
          technicalQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" }
              },
              required: ["question", "intention", "answer"]
            }
          },
          behavioralQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" }
              },
              required: ["question", "intention", "answer"]
            }
          },
          skillGaps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                severity: { type: "string", enum: ["low", "medium", "high"] },
                recommendation: { type: "string" }
              },
              required: ["skill", "severity", "recommendation"]
            }
          },
          preparationPlan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: { type: "integer" },
                focus: { type: "string" },
                tasks: { type: "array", items: { type: "string" } }
              },
              required: ["day", "focus", "tasks"]
            }
          }
        },
        required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
      }
    }
  })

  const raw = JSON.parse(response.text)

  const parsed = interviewReportSchema.safeParse(raw)
  if (!parsed.success) {
    console.error("Zod validation failed:", parsed.error.flatten())
    throw new Error("AI returned invalid structure")
  }

  return parsed.data
}



module.exports = { generateInterviewReport }