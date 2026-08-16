"use client";

import React from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import portfolio from "@/data/portfolio.json";

gsap.registerPlugin(useGSAP);

const Stats = () => {
  useGSAP(() => {
    gsap.from(".stats", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 2.1,
      stagger: 0.4,
    });
  });

  return (
    <div className="container mx-auto lg:my-0 sm:my-[20px]">
      <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none lg:justify-around sm:justify-center items-center overflow-hidden">
        {portfolio.stats.map((item, index) => (
          <div className="stats flex gap-4 items-center justify-center" key={index}>
            <CountUp end={item.num} duration={4} delay={2.2} className="text-4xl xl:text-6xl font-extrabold" />
            <p className="leading-snug text-accent/80 w-[50%] text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
