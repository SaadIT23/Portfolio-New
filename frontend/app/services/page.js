"use client"
import React from 'react'
import { BsArrowDownRight } from "react-icons/bs";
import Link from 'next/link';
import { useState, useEffect } from "react";

const services = [
    {
        num: "01",
        title: "Web Development",
        des: "Crafting responsive, user-friendly websites with modern technologies.",
        href: ""
    },
    {
        num: "02",
        title: "UX/UI Design",
        des: "Creating intuitive, visually appealing user interfaces and experiences.",
        href: ""
    },
    {
        num: "03",
        title: "Database Development",
        des: "Designing robust, scalable databases for efficient data management.",
        href: ""
    },
    {
        num: "04",
        title: "Backend Development",
        des: "Building secure, high-performance server-side applications that support seamless user experiences.",
        href: ""
    },

]
const Services = () => {
    // <BsArrowDownRight />

    const [transition, setTransition] = useState(false);

    useEffect(() => {
        setTransition(true);
    }, [])

    return (

        <div className='container mx-auto min-h-[80vh]  m-3 flex xl:min-w-[90%] sm:min-w-[100%] md:gap-8 text-white/60 md:flex-row sm:flex-col  sm:justify-center sm:items-center md:justify-start sm:gap-[30px]'>

            <div className=' md:w-[50%] min-h-full flex justify-center md:items-end flex-col md:gap-6 sm:w-[100%] sm:gap-[30px] sm:items-center'>

                <div className={`2xl:h-[40%] xl:h-[50%] w-[80%] flex flex-col gap-4 justify-center group transition-all duration-500 transform ${transition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-200`}>
                    <div className='flex justify-between items-center'>
                        <p className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>{services[0].num}</p>
                        <Link href={services[0].href} className='xl:w-[70px] xl:h-[70px] sm:h-[60px] sm:w-[60px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45'>
                            <BsArrowDownRight className='text-primary text-3xl' />
                        </Link>
                    </div>

                    <h2 className='xl:text-[42px] lg:text-[35px] md:text-[25px] sm:text-[35px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{services[0].title}</h2>
                    <p className='xl:text-[16px] md:text-[13px]'>{services[0].des}</p>
                    <div className='border-b border-white/20 '></div>
                </div>

                <div className={`2xl:h-[40%] xl:h-[50%] w-[80%] flex flex-col gap-4 justify-center group transition-all duration-500 transform ${transition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-300`}>
                    <div className='flex justify-between items-center'>
                        <p className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>{services[1].num}</p>
                        <Link href={services[1].href} className='xl:w-[70px] xl:h-[70px] sm:h-[60px] sm:w-[60px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45'>
                            <BsArrowDownRight className='text-primary text-3xl' />
                        </Link>
                    </div>

                    <h2 className='xl:text-[42px] lg:text-[35px] md:text-[25px] sm:text-[35px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{services[1].title}</h2>
                    <p className='xl:text-[16px] md:text-[13px]'>{services[1].des}</p>
                    <div className='border-b border-white/20 '></div>
                </div>

            </div>

            <div className='md:w-[50%] min-h-full flex justify-center md:items-start flex-col md:gap-6 sm:w-[100%] sm:gap-[30px] sm:items-center'>
                <div className={`2xl:h-[40%] xl:h-[50%] w-[80%] flex flex-col gap-4 justify-center group transition-all duration-500 transform ${transition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-500`}>
                    <div className='flex justify-between items-center'>
                        <p className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>{services[2].num}</p>
                        <Link href={services[2].href} className='xl:w-[70px] xl:h-[70px] sm:h-[60px] sm:w-[60px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45'>
                            <BsArrowDownRight className='text-primary text-3xl' />
                        </Link>
                    </div>

                    <h2 className='xl:text-[42px] lg:text-[35px] md:text-[25px] sm:text-[35px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{services[2].title}</h2>
                    <p className='xl:text-[16px] md:text-[13px]'>{services[2].des}</p>
                    <div className='border-b border-white/20 '></div>
                </div>

                <div className={`2xl:h-[40%] xl:h-[50%] w-[80%] flex flex-col gap-4 justify-center group transition-all duration-500 transform ${transition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-700`}>
                    <div className='flex justify-between items-center'>
                        <p className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>{services[3].num}</p>
                        <Link href={services[3].href} className='xl:w-[70px] xl:h-[70px] sm:h-[60px] sm:w-[60px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45'>
                            <BsArrowDownRight className='text-primary text-3xl' />
                        </Link>
                    </div>

                    <h2 className='xl:text-[42px] lg:text-[35px] md:text-[25px] sm:text-[35px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{services[3].title}</h2>
                    <p className='xl:text-[16px] md:text-[13px]'>{services[3].des}</p>
                    <div className='border-b border-white/20 '></div>
                </div>


            </div>
        </div>

    )
}

export default Services
