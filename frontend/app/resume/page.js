"use client"
import React from 'react'
import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaJava } from "react-icons/fa"
import { SiTailwindcss, SiNextdotjs } from "react-icons/si"
import { PiFileCpp } from "react-icons/pi";
import { useState } from "react"
import Details from '../components/Details';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// about data 
const about = {
    title: "About Me",
    des: '"Sharing a glimpse into my personal background."',
    info: [
        {
            fieldname: 'Name',
            fieldvalue: 'Saad Imran',
        },
        {
            fieldname: 'Phone',
            fieldvalue: '+92 3354747057',
        },
        {
            fieldname: 'Email',
            fieldvalue: 'saadimran936@gmail.com',
        },
        {
            fieldname: 'Nationality',
            fieldvalue: 'Pakistan',
        },
        {
            fieldname: 'Freelance',
            fieldvalue: 'Available',
        },
        {
            fieldname: 'Languages',
            fieldvalue: 'English, Urdu',
        },
    ]
}
const experience = {
    icon: '',
    title: 'My Experience',
    des: '"Showcasing my diverse experience from various industries."',
    items: [
        {
            company: 'Freelance',
            position: "Web Developer",
            duration: "2023 - Current",
        },
        {
            company: 'HiSkyTech',
            position: "Front-End Developer",
            duration: "Jul 2024 - Aug 2024",
        },
    ]
}
const education = {
    icon: '',
    title: 'My Education',
    des: '"Highlighting my academic background and relevant qualifications."',
    items: [
        {
            institute: 'Coursera',
            degree: "FullStack Web Development Course",
            duration: "2023",
        },
        {
            institute: 'University of Management and Technology, Lahore',
            degree: "Bachelor in Information Technology (BS IT)",
            duration: "2021 - Current",
        },
        {
            institute: 'Punjab Group of Colleges, Lahore',
            degree: "Intermediate in Science (FSc Pre Engineering)",
            duration: "2018 - 2020",
        },
        {
            institute: 'M.N Education Campus, Lahore',
            degree: "Matriculation in Science with Computer",
            duration: "2016 - 2018",
        },

    ]
}

const skills = {
    title: "My Skills",
    des: '"Demonstrating my proficiency in key skills and technologies that drive my work and projects."',
    skillset: [
        {
            icon: <FaHtml5 />,
            name: "HTML 5",
        },
        {
            icon: <FaCss3 />,
            name: "CSS 3",
        },
        {
            icon: <FaJs />,
            name: "Javascript",
        },
        {
            icon: <FaReact />,
            name: "React.js",
        },
        {
            icon: <SiNextdotjs />,
            name: "next.js",
        },
        {
            icon: <SiTailwindcss />,
            name: "Tailwind CSS",
        },
        {
            icon: <FaNodeJs />,
            name: "Node JS",
        },
        {
            icon: <PiFileCpp />,
            name: "C++",
        },

    ]

}



const Resume = () => {

    const [details, setDetails] = useState(experience)
    const [active, setActive] = useState("exp")

    const handleClick = (e) => {

        if (e.target.value === 'education') {
            setDetails(education)
            setActive('edu')
        }
        else if (e.target.value === 'experience') {
            setDetails(experience)
            setActive('exp')
        }
        else if (e.target.value === 'skills') {
            setDetails(skills)
            setActive('skill')
        }
        else if (e.target.value === 'about') {
            setDetails(about)
            setActive('about')
        }
    }

    useGSAP(() => {
        gsap.fromTo(".container .det", { opacity: 0, x: 20 }, {
            delay: 0.3,
            opacity: 1,
            duration: 0.5,
            x: 0
        })
    }, [details])

    return (
        <div>
            <div className="container flex  min-h-[80vh]  mx-auto my-5 min-w-[90%] lg:flex-row sm:flex-col lg:justify-start sm:justify-center lg:items-start sm:items-center">
                <div className="2xl:w-[50%] lg:w-[30%] sm:w-[70%] min-h-full  flex flex-col items-center gap-8 pt-10 text-white font-medium">
                    <button className={`2xl:w-[50%] lg:w-[80%] sm:w-[80%] bg-[#27272c] p-3 rounded-lg transition-all duration-300 hover:font-bold hover:bg-accent hover:text-primary ${(active === 'exp') ? 'bg-accent text-primary font-bold' : ''}`} value={'experience'} onClick={handleClick}>Experience</button>
                    <button className={`2xl:w-[50%] lg:w-[80%] sm:w-[80%] bg-[#27272c] p-3 rounded-lg transition-all duration-300 hover:font-bold hover:bg-accent hover:text-primary ${(active === 'edu') ? 'bg-accent text-primary font-bold' : ''}`} value={'education'} onClick={handleClick}>Education</button>
                    <button className={`2xl:w-[50%] lg:w-[80%] sm:w-[80%] bg-[#27272c] p-3 rounded-lg transition-all duration-300 hover:font-bold hover:bg-accent hover:text-primary ${(active === 'skill') ? 'bg-accent text-primary font-bold' : ''}`} value={'skills'} onClick={handleClick}>Skills</button>
                    <button className={`2xl:w-[50%] lg:w-[80%] sm:w-[80%] bg-[#27272c] p-3 rounded-lg transition-all duration-300 hover:font-bold hover:bg-accent hover:text-primary ${(active === 'about') ? 'bg-accent text-primary font-bold' : ''}`} value={'about'} onClick={handleClick}>About me</button>
                </div>
                <div className="det 2xl:w-[50%] lg:w-[70%] min-h-full flex flex-col pt-10 items-center">
                    <Details details={details} />
                </div>
            </div>
        </div>
    )
}

export default Resume
