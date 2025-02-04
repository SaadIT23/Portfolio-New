"use client"
import React, { useEffect, Suspense } from 'react'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { BsArrowUpRight, BsGithub } from 'react-icons/bs'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation'
const projects = [
    {
        id: "e-commerce-store",
        num: "01",
        category: "Full Stack Project",
        title: "E Commerce Store",
        des: "A full-stack e-commerce project involves creating a comprehensive online store, combining a responsive front-end with secure back-end systems for managing products, orders, and payments efficiently.",
        stack: [{ name: "HTML" }, { name: "CSS" }, { name: "Javascript" }, { name: "PHP" }, { name: "MySQL" }],
        image: [{ src: "/E1.JPG" }, { src: "/E2.JPG" }, { src: "/E3.JPG" }, { src: "/E8.JPG" },],
        github: "https://github.com/SaadIT23/E-commerce-Project",
    },
    {
        id: "iphone-16-landing-page",
        num: "02",
        category: "Front End Landing Page",
        title: "iPhone 16 Landing Page",
        des: "The iPhone 16 landing page features a sleek, modern design that showcases the device's stunning display and key features with high-quality images and engaging animations, providing an immersive and intuitive user experience across all devices.",
        stack: [{ name: "HTML" }, { name: "CSS" }, { name: "React js" }, { name: "Tailwind" }, { name: "GSAP" }],
        image: [{ src: "/ip1.JPG" }, { src: "/ip2.JPG" }, { src: "/ip3.JPG" }, { src: "/ip5.JPG" },],
        github: "https://github.com/SaadIT23/iPhone-16-Pro-Landing-Page",
    },
    {
        id: "portfolio-website",
        num: "03",
        category: "Frontend Project",
        title: "Portfolio Website",
        des: "A portfolio website showcases an individual's skills, projects, and achievements in a visually appealing and organized manner.",
        stack: [{ name: "HTML" }, { name: "CSS" }, { name: "Javascript" }, { name: "Bootstrap" }],
        image: [{ src: "/p1.JPG" }, { src: "/p2.JPG" }, { src: "/p3.JPG" }, { src: "/p4.JPG" },],
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
        image: [{ src: "/to1.JPG" }, { src: "/to2.JPG" }, { src: "/to3.JPG" }, { src: "/to4.JPG" },],
        github: "",
    },

]

const Work = () => {
    const searchparams = useSearchParams();
    const [project, setProject] = useState(projects[0]);
    const [index, setIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);



    const handleNext = () => {
        setIsFading(true);
        setTimeout(() => {
            setIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % projects.length;
                setProject(projects[newIndex]);
                setIsFading(false); // Remove fade-out effect
                return newIndex;
            });
        }, 300); // Animation duration
    };

    const handlePrev = () => {
        setIsFading(true);
        setTimeout(() => {
            setIndex((prevIndex) => {
                const newIndex = (prevIndex - 1 + projects.length) % projects.length;
                setProject(projects[newIndex]);
                setIsFading(false); // Remove fade-out effect
                return newIndex;
            });
        }, 300); // Animation duration
    };

    useGSAP(() => {
        gsap.fromTo(".container", { opacity: 0 }, {
            opacity: 1,
            delay: 0.3,
            duration: 0.1

        })
    })

    useEffect(() => {
        const slug = searchparams.get('slug');
        const index = projects.findIndex((item) => item.id === slug);

        // Ensure a valid project is always set
        if (index !== -1) {
            setProject(projects[index]);
            setIndex(index);
        } else {
            setProject(projects[0]); // Default project if no slug
            setIndex(0);
        }
    }, [searchparams]);


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='container mx-auto  min-h-[80vh] my-3 flex gap-5 xl:w-[85vw] lg:w-[97vw] lg:flex-row sm:flex-col  justify-center items-center  transition-all duration-500 opacity-0'>
                <div className={`lg:w-[35%] sm:w-[95%] min-h-[100%] flex flex-col gap-[20px] justify-center transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="btns flex gap-3">
                        <button onClick={() => handlePrev()} className='bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex items-center justify-center'><PiCaretLeftBold /></button>
                        <button onClick={() => handleNext()} className='bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex items-center justify-center'><PiCaretRightBold /></button>
                    </div>
                    <div className='text-6xl md:text-8xl leading-none font-extrabold text-transparent text-outline'>{project.num}</div>
                    <h3 className='leading-none text-sm text-accent border-b border-accent w-fit'>{project.title}</h3>
                    <h2 className='text-[35px] md:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize'>{project.category}</h2>
                    <p className='text-white/60 xl:text-[16px] md:text-[14px] text-[12px]'>{project.des}</p>

                    <ul className='flex gap-3'>
                        {project.stack.map((item, index) => {
                            return <li key={index} className='xl:text-xl md:text-lg text-sm text-accent'>{item.name}
                                {index !== project.stack.length - 1 && ","}
                            </li>
                        })}
                    </ul>
                    <div className="border border-white/20"></div>

                    <Link className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group' href={project.github} target='_blank'><BsGithub className='text-white text-3xl group-hover:text-accent' /></Link>
                </div>
                <div className={`lg:w-[65%] sm:w-[80%] min-h-[100%] grid grid-cols-1 md:grid-cols-2 gap-8 m-3 justify-items-center items-center place-content-center transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                    {project.image.map((img, index) => {
                        return <div key={index} className='w-[100%] h-[100%] shadow-md shadow-accent hover:border-2 hover:border-accent'>
                            <Image src={img.src} width={400} height={280} quality={100} priority={true} className='object-contain w-full h-full' alt='' />
                        </div>
                    })}
                </div>
            </div>
        </Suspense>
    )
}

export default Work
