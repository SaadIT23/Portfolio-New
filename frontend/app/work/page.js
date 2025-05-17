"use client"
import { useEffect } from "react"
import { useState } from "react"

import Link from "next/link"
import NextImage from "next/image"
import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useSearchParams } from "next/navigation"

const projects = [
    {
        id: "e-commerce-store",
        num: "01",
        category: "Full Stack Project",
        title: "E Commerce Store",
        des: "A full-stack e-commerce project involves creating a comprehensive online store, combining a responsive front-end with secure back-end systems for managing products, orders, and payments efficiently.",
        stack: [{ name: "HTML" }, { name: "CSS" }, { name: "Javascript" }, { name: "PHP" }, { name: "MySQL" }],
        image: [{ src: "/E1.JPG" }, { src: "/E2.JPG" }, { src: "/E3.JPG" }, { src: "/E8.JPG" }],
        github: "https://github.com/SaadIT23/E-commerce-Project",
    },
    {
        id: "iphone-16-landing-page",
        num: "02",
        category: "Front End Landing Page",
        title: "iPhone 16 Landing Page",
        des: "The iPhone 16 landing page features a sleek, modern design that showcases the device's stunning display and key features with high-quality images and engaging animations, providing an immersive and intuitive user experience across all devices.",
        stack: [{ name: "HTML" }, { name: "CSS" }, { name: "React js" }, { name: "Tailwind" }, { name: "GSAP" }],
        image: [{ src: "/ip1.JPG" }, { src: "/ip2.JPG" }, { src: "/ip3.JPG" }, { src: "/ip5.JPG" }],
        github: "https://github.com/SaadIT23/iPhone-16-Pro-Landing-Page",
        live: "https://iphone-16-pro-landing-page.vercel.app/",
    },
    {
        id: "portfolio-website",
        num: "03",
        category: "Frontend Project",
        title: "Portfolio Website",
        des: "A portfolio website showcases an individual's skills, projects, and achievements in a visually appealing and organized manner.",
        stack: [{ name: "HTML" }, { name: "CSS" }, { name: "Javascript" }, { name: "Bootstrap" }],
        image: [{ src: "/p1.JPG" }, { src: "/p2.JPG" }, { src: "/p3.JPG" }, { src: "/p4.JPG" }],
        github: "https://github.com/SaadIT23/Mahad-Portfolio",
    },
    {
        id: "todo-list-app",
        num: "04",
        category: "Frontend + Backend",
        title: "Todo List App",
        des: "A to-do list web app helps users organize and track tasks efficiently.",
        stack: [{ name: "React" }, { name: "CSS" }, { name: "Tailwind" }],
        image: [{ src: "/t1.JPG" }, { src: "/t2.JPG" }],
        github: "https://github.com/SaadIT23/Todo-App.git",
    },
    {
        id: "tourist-app",
        num: "05",
        category: "Full Stack Project",
        title: "Tourist App",
        des: "A user-friendly platform for travelers to explore destinations, view locations on Google Maps, check ratings, filter by price or rating, save favorites, and share feedback for an enhanced travel experience.",
        stack: [{ name: "React" }, { name: "Tailwind" }, { name: "Node.js" }, { name: "MongoDB" }],
        image: [{ src: "/to1.JPG" }, { src: "/to2.JPG" }, { src: "/to3.JPG" }, { src: "/to4.JPG" }],
        github: "",
    },
    {
        id: "it-agency-admin",
        num: "06",
        category: "Full Stack Project",
        title: "IT Agency Website with Admin Panel",
        des: "A dynamic and responsive web application for an IT agency featuring a public-facing site for showcasing services and an admin panel for content management, client handling, and service analytics. Includes secure authentication for both admin and users, service request forms, project listings, and real-time updates.",
        stack: [
            { name: "MongoDB" },
            { name: "Express.js" },
            { name: "React" },
            { name: "Node.js" },
            { name: "JWT Auth" },
            { name: "Tailwind" },
        ],
        image: [{ src: "/it1.JPG" }, { src: "/it5.JPG" }, { src: "/it3.JPG" }, { src: "/it4.JPG" }],
        github: "",
        live: "https://logi-xolve.vercel.app/",
    },
]

const Work = () => {
    const searchparams = useSearchParams({ forceDynamic: true })
    const [project, setProject] = useState(projects[0])
    const [index, setIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [loadedCount, setLoadedCount] = useState(0)
    const [direction, setDirection] = useState("next") // For slide direction

    // Function to handle image load events
    const handleImageLoaded = () => {
        setLoadedCount((prev) => {
            const newCount = prev + 1
            if (newCount >= project.image.length) {
                // Small delay to ensure smooth transition
                setTimeout(() => {
                    setIsLoading(false)
                }, 300)
            }
            return newCount
        })
    }

    // Reset loading state when project changes
    useEffect(() => {
        setIsLoading(true)
        setLoadedCount(0)

        // Preload images for the current project
        const imageElements = []

        project.image.forEach((img) => {
            const imgElement = new window.Image()
            imgElement.src = img.src
            imgElement.onload = handleImageLoaded
            imgElement.onerror = handleImageLoaded // Count errors as loaded to prevent infinite loading
            imageElements.push(imgElement)
        })

        // If there are no images, set as loaded
        if (project.image.length === 0) {
            setIsLoading(false)
        }

        // Cleanup function
        return () => {
            imageElements.forEach((img) => {
                img.onload = null
                img.onerror = null
            })
        }
    }, [project])

    const handleNext = () => {
        setDirection("next")
        setIsLoading(true) // Start loading

        const nextIndex = (index + 1) % projects.length
        setIndex(nextIndex)
        setProject(projects[nextIndex])
    }

    const handlePrev = () => {
        setDirection("prev")
        setIsLoading(true) // Start loading

        const prevIndex = (index - 1 + projects.length) % projects.length
        setIndex(prevIndex)
        setProject(projects[prevIndex])
    }

    // GSAP animations
    useGSAP(() => {
        // Only animate when content is loaded
        if (!isLoading) {
            const tl = gsap.timeline()

            // Slide in animation based on direction
            const xStart = direction === "next" ? 100 : -100

            // Animate content
            tl.fromTo(
                ".project-content",
                {
                    opacity: 0,
                    x: xStart,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out",
                },
            )

            // Animate images with stagger
            tl.fromTo(
                ".project-image",
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.3", // Start slightly before the previous animation finishes
            )
        }
    }, [isLoading, direction])

    useEffect(() => {
        const slug = searchparams.get("slug")
        const foundIndex = projects.findIndex((item) => item.id === slug)

        // Ensure a valid project is always set
        if (foundIndex !== -1) {
            setProject(projects[foundIndex])
            setIndex(foundIndex)
        } else {
            setProject(projects[0]) // Default project if no slug
            setIndex(0)
        }
    }, [searchparams])

    // Calculate loading percentage
    const loadingPercentage = project.image.length > 0 ? Math.round((loadedCount / project.image.length) * 100) : 100

    return (
        <div className="min-h-[80vh] w-full relative">
            {/* Custom Loader */}
            <div
                className={`absolute inset-0 z-10 bg-black/90 flex flex-col items-center justify-center transition-opacity duration-500 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-4 border-accent/70 rounded-full animate-spin animation-delay-150"></div>
                    <div className="absolute inset-4 border-b-4 border-accent/50 rounded-full animate-spin animation-delay-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-accent font-bold">{loadingPercentage}%</span>
                    </div>
                </div>
                <p className="text-lg font-medium text-white mt-4">Loading project...</p>
            </div>

            {/* Project Content */}
            <div className="container mx-auto min-h-[80vh] my-3 flex gap-5 xl:w-[85vw] lg:w-[97vw] lg:flex-row sm:flex-col justify-center items-center">
                {/* Project Info */}
                <div className="project-content lg:w-[35%] sm:w-[95%] min-h-[100%] flex flex-col gap-[20px] justify-center">
                    {/* Navigation Controls - Now part of the content section for better mobile positioning */}
                    <div className="flex gap-3 mb-2">
                        <button
                            onClick={handlePrev}
                            className="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex items-center justify-center"
                            aria-label="Previous project"
                        >
                            <PiCaretLeftBold />
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex items-center justify-center"
                            aria-label="Next project"
                        >
                            <PiCaretRightBold />
                        </button>
                    </div>

                    <div className="text-6xl md:text-8xl leading-none font-extrabold text-transparent text-outline">
                        {project.num}
                    </div>
                    <h3 className="leading-none text-sm text-accent border-b border-accent w-fit">{project.title}</h3>
                    <h2 className="text-[35px] md:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                        {project.category}
                    </h2>
                    <p className="text-white/60 xl:text-[16px] md:text-[14px] text-[12px]">{project.des}</p>

                    <ul className="flex gap-3 flex-wrap">
                        {project.stack.map((item, idx) => (
                            <li key={idx} className="xl:text-xl md:text-lg text-sm text-accent">
                                {item.name}
                                {idx !== project.stack.length - 1 && ","}
                            </li>
                        ))}
                    </ul>
                    <div className="border border-white/20"></div>

                    <div className="flex gap-4">
                        {project.github && (
                            <Link
                                className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group relative"
                                href={project.github}
                                target="_blank"
                            >
                                <BsGithub className="text-white text-3xl group-hover:text-accent" />
                                <p className="absolute text-xs font-bold -bottom-3 text-gray-700 rounded-lg p-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Github
                                </p>
                            </Link>
                        )}

                        {project.live && (
                            <Link
                                className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group relative"
                                href={project.live}
                                target="_blank"
                            >
                                <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                                <p className="absolute text-xs font-bold -bottom-3 text-gray-700 rounded-lg p-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Live
                                </p>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Project Images */}
                <div className="lg:w-[65%] sm:w-[80%] min-h-[100%] grid grid-cols-1 md:grid-cols-2 gap-8 m-3 justify-items-center items-center place-content-center">
                    {project.image.map((img, idx) => (
                        <div
                            key={idx}
                            className="project-image w-[100%] h-[100%] shadow-md shadow-accent hover:border-2 hover:border-accent"
                        >
                            <NextImage
                                src={img.src || "/placeholder.svg"}
                                width={400}
                                height={280}
                                quality={100}
                                priority={true}
                                className="object-contain w-full h-full"
                                alt={`${project.title} image ${idx + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {projects.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === index ? "bg-accent w-6" : "bg-white/30"} transition-all duration-300`}
                        onClick={() => {
                            setDirection(idx > index ? "next" : "prev")
                            setIsLoading(true)
                            setIndex(idx)
                            setProject(projects[idx])
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Work
