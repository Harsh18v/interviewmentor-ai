import { useState, useEffect } from "react";
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
            <div className='w-full h-screen bg-[#0d0d0d] flex flex-col items-center justify-center gap-4'>
                <div className='w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin'></div>
                <p className='text-sm text-neutral-500 tracking-widest uppercase'
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    Loading report
                </p>
            </div>
        )
    }

    const score = report.matchScore;

    const getScoreColor = (score) => {
        if (score < 50) return "text-red-400";
        if (score < 80) return "text-yellow-400";
        return "text-green-400";
    };

    const getScoreRing = (score) => {
        if (score < 50) return "border-red-500";
        if (score < 80) return "border-yellow-500";
        return "border-green-500";
    };

    const getScoreLabel = (score) => {
        if (score < 50) return "Needs Improvement";
        if (score < 80) return "Partially Aligned";
        return "Strong Fit";
    };

    const handleUserLogout = async () => {
        handleLogout()
        navigate('/')
    }

    const tabs = [
        { key: "technicalQuestions", label: "Technical" },
        { key: "behavioralQuestions", label: "Behavioral" },
        { key: "preparationPlan", label: "Roadmap" },
    ]

    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col">

            <nav className='w-full bg-[#0d0d0d] border-b border-neutral-800 px-4 md:px-8 py-4 flex flex-wrap gap-4 items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm font-semibold tracking-widest uppercase text-neutral-400'>
                        InterviewMentor AI
                    </span>
                </div>

                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => navigate('/generate', { replace: true })}
                        className='text-sm md:text-sm text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-3 md:px-4 py-1.5 rounded-lg transition-all duration-200'>
                        New report
                    </button>
                    <span className='text-xs md:text-sm text-neutral-500'>
                        {user.name}
                    </span>
                    <button
                        onClick={handleUserLogout}
                        className='text-sm md:text-sm text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-3 md:px-4 py-1.5 rounded-lg transition-all duration-200'>
                        Logout
                    </button>
                </div>
            </nav>

            {/* MAIN LAYOUT */}
            <div className="flex flex-col lg:flex-row flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-10 gap-6">

                <div className="flex-1 flex flex-col gap-6">

                    <div className="flex gap-2 border-b border-neutral-800 pb-4 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActive(tab.key)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap text-md font-medium transition-all duration-200
                                    ${active === tab.key
                                        ? 'bg-white text-black'
                                        : 'text-neutral-500 hover:text-white hover:bg-neutral-800'
                                    }`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4">
                        {report[active]?.map((item, i) => (
                            <div
                                key={i}
                                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3">

                                <p className="text-sm font-semibold text-white leading-relaxed">
                                    {i + 1}. {item.question || item.focus}
                                </p>

                                <div className="border-t border-neutral-800" />

                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {active === "preparationPlan"
                                        ? item.tasks.join(", ")
                                        : item.answer}
                                </p>

                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="w-full lg:w-64 flex flex-col gap-8">

                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col items-center gap-4">
                        <p className="text-sm text-neutral-400 uppercase tracking-widest">
                            Match Score
                        </p>

                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center text-xl md:text-2xl font-bold
                            ${getScoreRing(score)} ${getScoreColor(score)}`}>
                            {score}%
                        </div>

                        <p className={`text-sm font-medium ${getScoreColor(score)}`}>
                            {getScoreLabel(score)}
                        </p>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col gap-4">
                        <p className="text-sm text-neutral-400 uppercase tracking-widest">
                            Skill Gaps
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps?.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium
                                        ${gap.severity === "high"
                                            ? "bg-red-950 text-red-400 border border-red-900"
                                            : gap.severity === "medium"
                                                ? "bg-yellow-950 text-yellow-400 border border-yellow-900"
                                                : "bg-green-950 text-green-400 border border-green-900"
                                        }`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}