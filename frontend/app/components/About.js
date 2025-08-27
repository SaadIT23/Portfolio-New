// components/About.jsx
"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="about bg-primary/5 py-20 lg:py-28 overflow-x-hidden" id="about">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 px-6 lg:px-12">

                {/* Left Side - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 flex justify-center"
                >
                    <img
                        src="/saadbg.png"
                        alt="Saad Imran"
                        className="rounded-2xl w-[75%] max-w-[380px] border-2 border-accent/40 shadow-xl shadow-accent/20 hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                {/* Right Side - Text */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 flex flex-col gap-6 text-center lg:text-left"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-accent mb-4">
                        About Me
                    </h2>
                    <p className="text-white/80 leading-relaxed text-lg">
                        I am <span className="text-accent font-semibold">Saad Imran</span>, a passionate
                        software developer with expertise in creating efficient, scalable,
                        and user-friendly applications. I thrive on exploring modern technologies,
                        solving real-world problems, and transforming ideas into impactful digital
                        experiences.
                    </p>
                    <p className="text-white/80 leading-relaxed text-lg">
                        With strong skills in <span className="text-accent">JavaScript, React, Next.js,
                            and Node.js</span>, I specialize in building modern web solutions.
                        I’m always eager to learn, grow, and collaborate on innovative projects.
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-5 mt-6">
                        {[
                            { title: "Experience", value: "2+ Years" },
                            { title: "Projects", value: "10+ Completed" },
                            { title: "Location", value: "Lahore, Pakistan" },
                            { title: "Availability", value: "Open to Work" },
                        ].map((info, idx) => (
                            <div
                                key={idx}
                                className="p-4 rounded-xl bg-primary/10 border border-accent/30 hover:bg-primary/20 transition duration-300"
                            >
                                <h3 className="text-accent font-semibold text-lg">{info.title}</h3>
                                <p className="text-white/70 text-sm">{info.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
