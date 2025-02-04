"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const projects = [
    {
        id: "e-commerce-store",
        title: "E Commerce Store",
        image: "/E1.jpg",
    },
    {
        id: "iphone-16-landing-page",
        title: "iPhone 16 Landing Page",
        image: "/ip1.jpg"
    },
    {
        id: "portfolio-website",
        title: "Portfolio Website",
        image: "/p1.jpg",
    },
    {
        id: "todo-list-app",
        title: "Todo List App",
        image: "/t1.jpg",
    },
    {
        id: "tourist-app",
        title: "Tourist App",
        image: "/to1.jpg"
    }
]

const Showcase = () => {

    const router = useRouter();

    const handleCardClick = (id) => {
        router.push(`/work?slug=${id}`);
    };

    useGSAP(() => {
        let timeline = gsap.timeline();

        // Animation for the heading
        timeline.from(".head", {
            y: -20,
            opacity: 0,
            duration: 0.4,
        });

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
            }
        );
    });

    return (
        <div className='w-[85%] md:w-[98%] mx-auto'>
            <h1 className='head text-xl md:text-2xl lg:text-4xl font-bold border-b-4 border-accent w-fit pb-2 mx-auto my-4'>Project Showcase</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-full justify-items-center  gap-6 my-10'>


                {projects.map((item, index) => (
                    <div key={index} className='card text-center h-fit md:h-[30vh] w-fit border rounded-xl md:rounded-3xl hover:cursor-pointer border-accent md:border-white md:hover:border-accent shadow-accent shadow-md md:shadow-none  md:hover:shadow-accent md:hover:shadow-md transition-all duration-200 overflow-hidden relative group flex flex-col justify-center items-center' onClick={() => handleCardClick(item.id)}>
                        <img src={item.image} className='object-contain md:object-cover h-full opacity-50 md:opacity-100   md:group-hover:opacity-50' alt="" />

                        <p className='z-10 absolute w-[70%] md:w-full opacity-100   md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 text-xs md:text-xl font-bold text-white/90'>{item.title}</p>

                    </div>
                ))}






            </div>

        </div>
    )
}

export default Showcase
