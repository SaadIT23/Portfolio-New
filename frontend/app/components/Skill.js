// components/Skills.jsx
"use client";
import { FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3, FaJs, FaJava, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTailwindcss, SiFirebase, SiDocker, SiMysql, SiPostgresql, SiDjango, SiSpringboot } from "react-icons/si";
import { PiFileCpp } from "react-icons/pi";
import { FaFigma } from "react-icons/fa";



export default function Skills() {
    const skills = [
        {
            category: "Frontend",
            items: [
                { name: "HTML 5", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
                { name: "CSS 3", icon: <FaCss3 className="text-blue-500 text-3xl" /> },
                { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-3xl" /> },
                { name: "React.js", icon: <FaReact className="text-sky-400 text-3xl" /> },
                { name: "Next.js", icon: <SiNextdotjs className="text-white text-3xl" /> },
                { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-300 text-3xl" /> },
            ],
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
                { name: "Django", icon: <SiDjango className="text-green-700 text-3xl" /> },
                { name: "Spring Boot", icon: <SiSpringboot className="text-green-500 text-3xl" /> },
            ],
        },
        {
            category: "Databases",
            items: [
                { name: "MySQL", icon: <SiMysql className="text-blue-600 text-3xl" /> },
                { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-700 text-3xl" /> },
                { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-3xl" /> },
                { name: "Firebase", icon: <SiFirebase className="text-yellow-400 text-3xl" /> },
            ],
        },
        {
            category: "Programming Languages",
            items: [
                { name: "C++", icon: <PiFileCpp className="text-blue-400 text-3xl" /> },
                { name: "Java", icon: <FaJava className="text-red-500 text-3xl" /> },
                { name: "Python", icon: <FaPython className="text-yellow-300 text-3xl" /> },
            ],
        },
        {
            category: "Tools & Platforms",
            items: [
                { name: "Git", icon: <FaGitAlt className="text-orange-500 text-3xl" /> },
                { name: "Docker", icon: <SiDocker className="text-blue-400 text-3xl" /> },
            ],
        },
        {
            category: "Design",
            items: [
                { name: "Figma", icon: <FaFigma className="text-pink-500 text-3xl" /> },
            ],
        },
    ];


    return (
        <section className="skills py-16 bg-primary/5" id="skills">
            <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-12">

                {/* Section Title */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-accent mb-4">Skills & Tech Stack</h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Demonstrating my proficiency in key skills and technologies that drive my work and projects.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((group, idx) => (
                        <div
                            key={idx}
                            className="p-6 bg-primary/10 rounded-2xl border border-accent/30 shadow-md shadow-accent/10 hover:shadow-accent/30 transition-all duration-300"
                        >
                            <h3 className="text-xl font-semibold text-accent mb-4 text-center">{group.category}</h3>
                            <div className="flex flex-wrap md:justify-start justify-center gap-6">
                                {group.items.map((skill, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-primary/20 border border-accent/20 hover:bg-accent/10 transition-all duration-300"
                                    >
                                        {skill.icon}
                                        <span className="text-white/80 text-sm mt-2">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
