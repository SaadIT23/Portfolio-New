"use client"
import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const Navbar = () => {
  const pathname = usePathname()
  const ref = useRef()
  const [open, setopen] = useState(false)
  const Links = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Services',
      path: '/services',
    },
    {
      name: 'Resume',
      path: '/resume',
    },
    {
      name: 'Work',
      path: '/showcase',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ]

  const handleClick = () => {
    setopen(!open)
  }

  useEffect(() => {
    setopen(false)
  }, [])

  useEffect(() => {
    if (open) {
      ref.current.style.transform = "translateX(0)"
      ref.current.style.opacity = "1"
    }
    else {
      ref.current.style.transform = "translateX(-100%)"
      ref.current.style.opacity = "0"
    }
  }, [open])

  useEffect(() => {
    setopen(false)
  }, [pathname])

  const tl = gsap.timeline()
  useGSAP(() => {

    tl.from("nav .logo", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      delay: 0.5
    })

    tl.from("ul .links", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.2
    })
  })


  return (
    <>
      <div ref={ref} className="transition-all duration-500 md:hidden mob min-h-screen fixed top-0 left-0 w-[80vw] border bg-primary z-50 flex-col justify-center transform -translate-x-full opacity-0">
        <button onClick={handleClick} className='self-start absolute top-3 left-2 text-3xl font-bold'><RxCross2 /></button>
        <div className='h-screen'>
          <ul className='flex flex-col gap-5 justify-center items-center h-full'>
            {Links.map((link, index) => {
              return <Link className={`text-base ${link.path === pathname && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`} href={link.path} key={index}>{link.name}</Link>
            })}
          </ul>
        </div>
      </div>
      <nav className='flex flex-row justify-between md:justify-around mx-4 md:mx-0 items-center py-[25px]  md:gap-0 gap-3'>
        <div className="logo">
          <Link href={'/'}><h1 className='text-4xl font-semibold'>Saad<span className='text-accent'>.</span></h1> </Link>
        </div>
        <div className='md:hidden block'>
          <button className='text-lg' onClick={handleClick}><GiHamburgerMenu /></button>
        </div>
        <ul className='md:flex gap-12 hidden'>
          {Links.map((link, index) => {
            return <Link className={`links text-base ${link.path === pathname && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent`} href={link.path} key={index}>{link.name}</Link>
          })}
        </ul>
      </nav>
    </>
  )
}

export default Navbar