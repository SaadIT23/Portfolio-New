// components/Services.jsx
"use client";

import { Code, Smartphone, Server, Globe } from "lucide-react";

const services = [
    {
        id: 1,
        icon: <Code className="w-10 h-10 text-accent" />,
        title: "Frontend Development",
        desc: "Building modern, responsive, and user-friendly interfaces using React, Next.js, and Tailwind.",
    },
    {
        id: 2,
        icon: <Server className="w-10 h-10 text-accent" />,
        title: "Backend Development",
        desc: "Developing secure and scalable APIs with Django, Spring Boot, Node.js, and Express.",
    },
    {
        id: 3,
        icon: <Smartphone className="w-10 h-10 text-accent" />,
        title: "Mobile App Development",
        desc: "Creating smooth, performant mobile apps with React Native and Flutter for cross-platform solutions.",
    },
    {
        id: 4,
        icon: <Globe className="w-10 h-10 text-accent" />,
        title: "Full Stack Solutions",
        desc: "Delivering complete web platforms with both frontend and backend, including deployment and database integration.",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-16 bg-primary/5">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-accent mb-4">Services</h2>
                    <p className="text-white/70 text-lg">
                        What I offer as a developer — from frontend design to full-stack solutions.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group p-6 bg-primary/10 border border-accent/20 rounded-2xl shadow-md shadow-accent/5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
                        >
                            <div className="mb-4 p-4 rounded-full bg-primary/20 group-hover:bg-accent/10 transition-all">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
