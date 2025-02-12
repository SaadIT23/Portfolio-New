"use client"
import { FiDownload } from "react-icons/fi";
import Social from "./components/Social";
import Photo from "./components/Photo";
import Stats from "./components/Stats";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Home() {
  let timeline = gsap.timeline();

  useGSAP(() => {
    timeline.from(".left > div", {
      x: -20,
      opacity: 0,
      stagger: 0.5,
      duration: 0.5,
      delay: 1
    });

    timeline.from(".right", {
      x: 30,
      opacity: 0,
      duration: 0.5,
    })

  });



  return (
    <>
      <div className="container  min-h-[76vh] mx-auto flex xl:my-2 lg:w-[90%] xl:w-[100%] md:w-[80%] lg:my-2 lg:mb-5 lg:flex-row sm:flex-col sm:justify-center sm:items-center lg:justify-start lg:items-center lg:gap-0 sm:gap-8 sm:my-8">
        <div className="left flex justify-center items-center gap-5 flex-col  min-h-full lg:w-1/2 sm:w-[100%] sm:order-2 lg:order-none">
          <div className="flex flex-col gap-3">
            <p className="xl:text-xl lg:text-[18px] lg:text-start sm:text-[20px] sm:text-center">Software Developer</p>
            <h1 className="xl:text-[80px] lg:text-[60px] lg:text-start sm:text-[50px] sm:text-center font-semibold leading-[1.1]">Hello I&apos;m <br /> <span className="text-accent">Saad Imran</span></h1>
            {/* <h1 className="text-[48px] font-semibold leading-[1.1] text-accent">Saad Imran</h1> */}
            <p className="text-white/80 lg:max-w-[500px] xl:text-[16px] lg:text-left lg:text-[14px] sm:text-center sm:max-w-[450px]">Passionate software developer with expertise in building innovative and efficient solutions, leveraging modern technologies to create impactful applications.</p>
          </div>

          <div className="flex lg:gap-6  xl:min-w-[500px] lg:min-w-[450px] lg:flex-row lg:justify-start lg:items-start sm:flex-col sm:justify-center sm:items-center sm:gap-[10px]">
            <div className="btn bg-transparent border border-1 border-accent rounded-full px-7 py-2 text-accent hover:bg-accent/90 hover:cursor-pointer hover:text-white hover:transition-all duration-500 ">
              <a href="Saad CV.pdf" download={"Saad CV.pdf"} className="flex justify-center items-center gap-2 uppercase">Download CV <FiDownload className="text-lg" /></a>
            </div>
            <Social ConStyle={"social flex gap-5"} iconStyle={"w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"} />
          </div>

        </div>

        <div className="right min-h-full w-1/2 flex justify-center items-center mix-blend-lighten sm:order-1 lg:order-none">
          <Photo />
        </div>
      </div>
      <Stats />
    </>
  );
}
