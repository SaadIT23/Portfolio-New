"use client";

import React, { useState } from "react";
import Details from "../components/Details";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import portfolio from "@/data/portfolio.json";

const buildResumeData = () => {
  const about = {
    title: "About Me",
    des: portfolio.resume.aboutDescription,
    info: portfolio.resume.aboutInfo,
  };

  const experience = {
    title: "My Experience",
    des: "Showcasing my professional journey and real-world development experience.",
    items: portfolio.resume.experience,
  };

  const education = {
    title: "My Education",
    des: "Highlighting my academic background and technical learning path.",
    items: portfolio.resume.education,
  };

  const skills = {
    title: "My Skills",
    des: "Demonstrating the technologies and tools I use to build high-quality products.",
    skillset: portfolio.skills.flatMap((group) => group.items),
  };

  const achievements = {
    title: "Achievements",
    des: "Recognition and milestones highlighting consistency, technical growth, and impact.",
    items: portfolio.resume.achievements || [],
  };

  const certifications = {
    title: "Certifications",
    des: "Certifications and participation records that support continuous learning.",
    items: portfolio.resume.certifications || [],
  };

  return { about, experience, education, skills, achievements, certifications };
};

const Resume = () => {
  const { about, experience, education, skills, achievements, certifications } = buildResumeData();

  const [details, setDetails] = useState(experience);
  const [active, setActive] = useState("exp");

  const handleClick = (val, sec) => {
    setDetails(val);
    setActive(sec);
  };

  useGSAP(() => {
    gsap.fromTo(
      ".container .det",
      { opacity: 0, scale: 0.98 },
      {
        delay: 0.1,
        opacity: 1,
        duration: 0.3,
        scale: 1,
      },
    );
  }, [details]);

  return (
    <div className="bg-gray-950 py-10 min-h-screen">
      <div className="container flex min-h-[80vh] mx-auto min-w-[90%] lg:flex-row sm:flex-col lg:justify-center sm:justify-center lg:items-start sm:items-center gap-10">

        {/* Sidebar Nav */}
        <div className="2xl:w-[30%] lg:w-[35%] sm:w-[95%] min-h-full flex flex-col items-center gap-4 text-white font-medium sticky top-[100px]">

          <div className="w-full rounded-2xl bg-gray-900 border border-gray-800 shadow-xl shadow-black p-6 hover:border-accent/30 transition-all">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 mb-3 tracking-tight">Biography</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{portfolio.resume.aboutDescription}</p>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="bg-gray-800/80 px-4 py-3 rounded-lg border-l-4 border-accent shadow-sm flex items-center gap-3">
                <span className="font-semibold text-white">BS IT (2025)</span> <span className="text-gray-400">- CGPA 3.82</span>
              </div>
              <div className="bg-gray-800/80 px-4 py-3 rounded-lg border-l-4 border-red-500 shadow-sm flex items-center gap-3">
                <span className="font-semibold text-white">2nd Position</span> <span className="text-gray-400">- BOP Tech Batch</span>
              </div>
              <div className="bg-gray-800/80 px-4 py-3 rounded-lg border-l-4 border-green-500 shadow-sm flex items-center gap-3">
                <span className="font-semibold text-white">Focus:</span> <span className="text-gray-400">Full-Stack & Analytics</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            {[
              { val: experience, sec: "exp", label: "Experience" },
              { val: education, sec: "edu", label: "Education" },
              { val: skills, sec: "skill", label: "Skills" },
              { val: about, sec: "about", label: "About me" },
              { val: achievements, sec: "ach", label: "Achievements" },
              { val: certifications, sec: "cert", label: "Certifications" },
            ].map((btn) => (
              <button
                key={btn.sec}
                className={`w-full text-left font-medium px-6 py-4 rounded-xl transition-all duration-300 shadow-md ${active === btn.sec ? "bg-accent text-primary scale-[1.02]" : "bg-gray-900 border border-gray-800 text-gray-300 hover:border-accent/40 hover:bg-gray-900/80 hover:text-white"}`}
                onClick={() => handleClick(btn.val, btn.sec)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Render Pane */}
        <div className="det 2xl:w-[65%] lg:w-[65%] sm:w-[95%] min-h-[70vh] flex flex-col items-start rounded-3xl border border-gray-800 bg-gray-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <Details details={details} />
        </div>

      </div>
    </div>
  );
};

export default Resume;
