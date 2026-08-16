"use client";

import React, { useState, useEffect } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import portfolio from "@/data/portfolio.json";

const Services = () => {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <div className="container mx-auto min-h-[80vh] m-3 p-6 flex flex-col xl:min-w-[90%] sm:min-w-[100%] md:gap-12 text-white/60 items-center justify-center bg-gray-950">
      <div className="text-center mb-10 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 border-b-4 border-accent pb-2 w-fit mx-auto shadow-accent/20">My Services</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Providing high quality technical solutions to help businesses and individuals succeed in the modern digital era.</p>
      </div>

      <div className="flex md:flex-row sm:flex-col sm:justify-center sm:items-stretch w-full justify-center md:gap-10 sm:gap-6">
        {[0, 1].map((colIndex) => (
          <div
            key={colIndex}
            className="md:w-[50%] flex justify-center md:items-start flex-col md:gap-10 sm:w-[100%] sm:gap-[30px] sm:items-center"
          >
            {portfolio.services.slice(colIndex * 2, colIndex * 2 + 2).map((service, index) => (
              <div
                key={service.id}
                className={`w-[90%] md:w-[100%] bg-gray-900/40 p-8 rounded-3xl border border-gray-800 hover:border-accent hover:bg-gray-900/80 shadow-lg hover:shadow-accent/5 flex flex-col gap-5 justify-center group transition-all duration-500 transform ${transition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: `${(colIndex * 2 + index + 1) * 120}ms` }}
              >
                <div className="flex justify-between items-center bg-black/20 p-2 rounded-2xl">
                  <p className="text-5xl md:text-6xl font-extrabold text-transparent text-outline group-hover:text-accent transition-all duration-500 pl-4 bg-clip-text drop-shadow-md">
                    {String(colIndex * 2 + index + 1).padStart(2, "0")}
                  </p>
                  <Link
                    href="/contact"
                    className="xl:w-[70px] xl:h-[70px] sm:h-[60px] sm:w-[60px] rounded-full bg-gray-800 text-white group-hover:bg-accent group-hover:text-primary transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-3xl" />
                  </Link>
                </div>

                <h2 className="xl:text-[36px] lg:text-[30px] md:text-[25px] sm:text-[28px] font-bold leading-tight text-white group-hover:text-accent transition-all duration-300">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
