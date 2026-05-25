import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { useInterview } from "../hooks/useInterview.js"
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate } from "react-router";

export default function Report() {

    const { handleLogout, user } = useAuth()
    const navigate = useNavigate()
    const { report, getReportById, interviewId, loading } = useInterview()
    const [active, setActive] = useState("technicalQuestions");

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    if (loading || !report) {
        return (
            <div className='w-full h-screen bg-gray-900 flex justify-center items-center text-white text-3xl'>
                <h1>Loading Report.....</h1>
            </div>
        )
    }

    const score = report.matchScore;

    const getColor = (score) => {
        if (score < 50) return "text-red-400";
        if (score < 80) return "text-yellow-400";
        return "text-green-400";
    };

    const getRing = (score) => {
        if (score < 50) return "border-red-500";
        if (score < 80) return "border-yellow-500";
        return "border-green-500";
    };

    const handleUserLogout = async () => {
        handleLogout()
        navigate('/home')
    }



    return (

        <div className="w-full min-h-screen bg-gray-950 flex flex-col items-center">

            {/* HEADER */}
            <div className="w-full bg-gray-900 flex justify-around items-center p-4 text-white">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-8 md:w-10" />
                    <h1 className="text-lg md:text-xl font-bold">
                        InterviewMentor <span className="text-blue-400">AI</span>
                    </h1>
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <button onClick={()=>{navigate('/generate')}}
                    className="bg-blue-500 hover:bg-blue-600 px-2 py-2 md:px-4 rounded-lg text-sm font-semibold">
                        Generate a new report
                    </button>
                    <button onClick={handleUserLogout}
                        className='bg-red-600 hover:bg-red-500 px-2 py-2 md:px-4 rounded-lg text-sm font-semibold'>
                        Logout
                    </button>
                    <span>{user.name}</span>
                </div>
            </div>

            {/* MAIN CONTAINER */}
            <div className="w-[95%] lg:w-[80%] my-6 text-white flex flex-col lg:flex-row rounded-2xl overflow-hidden">

                {/* LEFT SIDEBAR */}
                <div className="bg-gray-900 p-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">

                    {["technicalQuestions", "behavioralQuestions", "preparationPlan"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActive(type)}
                            className={`px-3 py-2 rounded whitespace-nowrap ${active === type ? "bg-blue-600" : "hover:bg-gray-800"
                                }`}
                        >
                            {type === "technicalQuestions"
                                ? "Technical"
                                : type === "behavioralQuestions"
                                    ? "Behavioral"
                                    : "Roadmap"}
                        </button>
                    ))}

                </div>

                {/* MIDDLE CONTENT */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-800 max-h-[60vh] lg:max-h-none">

                    <h1 className="text-lg md:text-xl font-semibold mb-4 capitalize">
                        {active}
                    </h1>

                    <div className="space-y-4">
                        {report[active]?.map((item, i) => (
                            <div key={i} className="bg-gray-900 p-4 rounded-lg">

                                <p className="font-semibold text-blue-400 mb-2 text-sm md:text-base">
                                    {i + 1}. {item.question || item.focus}
                                </p>

                                <p className="text-gray-500 text-sm mb-2">
                                    {active === "preparationPlan"
                                        ? `Day ${item.day}`
                                        : `Intention: ${item.intention}`}
                                </p>

                                <p className="text-gray-400 text-sm">
                                    {active === "preparationPlan"
                                        ? `Tasks: ${item.tasks.join(", ")}`
                                        : `Answer: ${item.answer}`}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="bg-gray-900 p-5 flex flex-col gap-6 lg:w-72">

                    {/* Match Score */}
                    <div className="text-center">
                        <h2 className="text-gray-400 text-sm mb-2">MATCH SCORE</h2>

                        <div
                            className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 flex items-center justify-center text-lg md:text-xl font-bold ${getRing(
                                score
                            )} ${getColor(score)}`}
                        >
                            {score}%
                        </div>

                        <p className={`text-sm mt-2 ${getColor(score)}`}>
                            {score < 50
                                ? "Needs Improvement"
                                : score < 80
                                    ? "Partially Aligned"
                                    : "Strong Fit"}
                        </p>
                    </div>

                    {/* Skill Gaps */}
                    <div>
                        <h2 className="text-gray-400 text-sm mb-3">SKILL GAPS</h2>

                        <div className="flex flex-wrap gap-2 text-sm">
                            {report.skillGaps?.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 rounded ${gap.severity === "high"
                                        ? "bg-red-900/40 text-red-400"
                                        : gap.severity === "medium"
                                            ? "bg-yellow-900/40 text-yellow-400"
                                            : "bg-green-900/40 text-green-400"
                                        }`}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    );
}
