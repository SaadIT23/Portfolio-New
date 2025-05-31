"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Loader2 } from "lucide-react"

const projects = [
    {
        id: "e-commerce-store",
        title: "E Commerce Store",
        image: "/E1.JPG",
    },
    {
        id: "iphone-16-landing-page",
        title: "iPhone 16 Landing Page",
        image: "/ip1.JPG",
    },
    {
        id: "portfolio-website",
        title: "Portfolio Website",
        image: "/p1.JPG",
    },
    {
        id: "todo-list-app",
        title: "Todo List App",
        image: "/t1.JPG",
    },
    {
        id: "tourist-app",
        title: "Tourist App",
        image: "/to1.JPG",
    },
    {
        id: "it-agency-admin",
        title: "IT Agency Website",
        image: "/it1.JPG",
    },
    {
        id: "job-portal-app",
        title: "Job Portal Web Application",
        image: "/job1.JPG",
    },
]

const Showcase = () => {
    const router = useRouter()
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [loadedCount, setLoadedCount] = useState(0)
    const totalImages = projects.length

    // Function to handle image load events
    const handleImageLoaded = () => {
        setLoadedCount((prev) => {
            const newCount = prev + 1
            if (newCount >= totalImages) {
                setImagesLoaded(true)
            }
            return newCount
        })
    }

    // Preload images
    useEffect(() => {
        // Create an array to hold all image elements
        const imageElements = []

        projects.forEach((project) => {
            const img = new Image()
            img.src = project.image
            img.onload = handleImageLoaded
            img.onerror = handleImageLoaded // Count errors as loaded to prevent infinite loading
            imageElements.push(img)
        })

        // Cleanup function
        return () => {
            imageElements.forEach((img) => {
                img.onload = null
                img.onerror = null
            })
        }
    }, [])

    const handleCardClick = (id) => {
        router.push(`/work?slug=${id}`)
    }

    useGSAP(() => {
        if (imagesLoaded) {
            const timeline = gsap.timeline()

            // Animation for the heading
            timeline.from(".head", {
                y: -20,
                opacity: 0,
                duration: 0.4,
            })

            // Stagger animation for the cards
            timeline.fromTo(
                ".card",
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.1, // Duration for each card
                    stagger: 0.2, // Stagger delay between animations
                },
            )
        }
    }, [imagesLoaded]) // Run GSAP animations when images are loaded

    // Calculate loading percentage
    const loadingPercentage = Math.round((loadedCount / totalImages) * 100)

    return (
        <div className="w-[85%] md:w-[98%] mx-auto">
            {!imagesLoaded ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
                    <p className="text-lg font-medium">Loading projects... {loadingPercentage}%</p>
                    <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                        <div
                            className="h-full bg-accent transition-all duration-300 ease-in-out"
                            style={{ width: `${loadingPercentage}%` }}
                        ></div>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="head text-xl md:text-2xl lg:text-4xl font-bold border-b-4 border-accent w-fit pb-2 mx-auto my-4">
                        Project Showcase
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full justify-items-center gap-6 my-10">
                        {projects.map((item, index) => (
                            <div
                                key={index}
                                className="card text-center h-fit md:h-[30vh] w-fit border rounded-xl md:rounded-3xl hover:cursor-pointer border-accent md:border-white md:hover:border-accent shadow-accent shadow-md md:shadow-none md:hover:shadow-accent md:hover:shadow-md transition-all duration-200 overflow-hidden relative group flex flex-col justify-center items-center"
                                onClick={() => handleCardClick(item.id)}
                            >
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    className="object-contain md:object-cover h-full opacity-50 md:opacity-100 md:group-hover:opacity-50"
                                    alt={item.title}
                                />
                                <p className="z-10 absolute w-[70%] md:w-full opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 text-xs md:text-xl font-bold text-white/90">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Showcase
