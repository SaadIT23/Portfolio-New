"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import portfolio from "@/data/portfolio.json";

const Navbar = () => {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
    return null;
  }
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Resume", path: "/resume" },
    { name: "Work", path: "/showcase" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      ref.current.style.transform = "translateX(0)";
      ref.current.style.opacity = "1";
    } else {
      ref.current.style.transform = "translateX(-100%)";
      ref.current.style.opacity = "0";
    }
  }, [open]);

  const tl = gsap.timeline();
  useGSAP(() => {
    tl.from("nav .logo", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
    });

    tl.from("ul .links", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.12,
    });
  });

  return (
    <>
      <div
        ref={ref}
        className="transition-all duration-500 md:hidden mob min-h-screen fixed top-0 left-0 w-[80vw] border bg-primary z-50 flex-col justify-center transform -translate-x-full opacity-0"
      >
        <button onClick={() => setOpen(!open)} className="self-start absolute top-3 left-2 text-3xl font-bold">
          <RxCross2 />
        </button>
        <div className="h-screen">
          <ul className="flex flex-col gap-5 justify-center items-center h-full">
            {links.map((link, index) => (
              <Link
                className={`text-base ${link.path === pathname ? "text-accent border-b-2 border-accent" : ""} capitalize font-medium hover:text-accent transition-all`}
                href={link.path}
                key={index}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <nav className="flex flex-row justify-between md:justify-around mx-4 md:mx-0 items-center py-[25px] md:gap-0 gap-3">
        <div className="logo">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              {portfolio.site.logoText}
              <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <div className="md:hidden block">
          <button className="text-lg" onClick={() => setOpen(!open)}>
            <GiHamburgerMenu />
          </button>
        </div>
        <ul className="md:flex gap-12 hidden">
          {links.map((link, index) => (
            <Link
              className={`links text-base ${link.path === pathname ? "text-accent border-b-2 border-accent" : ""} capitalize font-medium hover:text-accent`}
              href={link.path}
              key={index}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
