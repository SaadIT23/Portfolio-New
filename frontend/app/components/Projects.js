// components/Projects.jsx
"use client";

import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
    {
        id: "e-commerce-store",
        num: "01",
        category: "Full Stack Project",
        title: "E Commerce Store",
        des: "A full-stack e-commerce project involves creating a comprehensive online store, combining a responsive front-end with secure back-end systems for managing products, orders, and payments efficiently.",
        stack: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
        image: "/E1.JPG",
        github: "https://github.com/SaadIT23/E-commerce-Project",
    },
    {
        id: "iphone-16-landing-page",
        num: "02",
        category: "Front End Landing Page",
        title: "iPhone 16 Landing Page",
        des: "The iPhone 16 landing page features a sleek, modern design with animations and responsive UI for an immersive user experience.",
        stack: ["HTML", "CSS", "React.js", "Tailwind", "GSAP"],
        image: "/ip1.JPG",
        github: "https://github.com/SaadIT23/iPhone-16-Pro-Landing-Page",
        live: "https://iphone-16-pro-landing-page.vercel.app/",
    },
    {
        id: "job-portal-app",
        num: "03",
        category: "Full Stack Project",
        title: "Job Portal Web Application",
        des: "A job portal with separate modules for seekers and companies. Companies can post jobs, track applications, and schedule interviews. Seekers can search and filter jobs, apply, track status, and create/upload resumes (including video resumes). Includes a chatbot for assistance, profile management, and secure authentication.",
        stack: [
            "ASP.NET",
            "C#",
            "MongoDB",
            "HTML5",
            "CSS3",
            "JavaScript",
            "AI Chatbot",
        ],
        image: "/job2.JPG",
        github: "",
        live: "",
    },
    {
        id: "movies-music-app",
        num: "04",
        category: "Full Stack Project",
        title: "Movies & Music Web Application",
        des: "A MERN stack web app where users can explore trending movies and music, search by genre, and view detailed content pages. Includes personalized playlists, watchlists, audio/video streaming, and secure authentication for user profiles. Admins can manage content, while users enjoy a smooth, responsive, and engaging multimedia experience.",
        stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "React.js",
            "Express.js",
            "Node.js",
            "MongoDB",
        ],
        image: "/mov1.JPG",
        github: "",
        live: "",
    },

    // 👉 Add more projects here
];

export default function Projects() {

    const router = useRouter()

    const handleCardClick = (id) => {
        router.push(`/work?slug=${id}`)
    }

    return (
        <section className="projects py-16 bg-primary/5" id="projects">
            <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-12">
                {/* Section Title */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-accent mb-4">Projects</h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        A selection of my work showcasing full-stack apps, landing pages, and web platforms.
                    </p>
                </div>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    className="w-full max-w-6xl"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="group p-6 bg-primary/10 rounded-2xl border border-accent/30 shadow-lg shadow-accent/10 flex flex-col lg:flex-row gap-8 hover:border-accent/50 transition-all duration-500 hover:cursor-pointer" onClick={() => handleCardClick(project.id)} >
                                {/* Image */}
                                <div className="relative w-full lg:w-1/2 h-[250px] lg:h-[320px] rounded-xl overflow-hidden border border-accent/20">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="flex flex-col gap-4 lg:w-1/2">
                                    <span className="text-accent font-bold tracking-wide">
                                        {project.num} — {project.category}
                                    </span>
                                    <h3 className="text-2xl lg:text-3xl font-semibold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/70 leading-relaxed">{project.des}</p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.stack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm rounded-full bg-primary/20 border border-accent/20 text-white/80"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4 mt-4">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                                            >
                                                <FiGithub /> GitHub
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                                            >
                                                <FiExternalLink /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Show All Projects Button */}
                <div className="flex justify-center mt-8">
                    <a
                        href="/showcase"
                        className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all"
                    >
                        Show All Projects
                    </a>
                </div>
            </div>
        </section>
    );
}
