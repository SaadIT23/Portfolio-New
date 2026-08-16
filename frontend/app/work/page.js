"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function WorkContent() {
  const searchparams = useSearchParams();
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);

        // Process slug
        const slug = searchparams.get("slug");
        const foundIndex = data.findIndex((item) => item._id === slug);

        if (foundIndex !== -1) {
          setProject(data[foundIndex]);
          setIndex(foundIndex);
        } else if (data.length > 0) {
          setProject(data[0]);
          setIndex(0);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [searchparams]);

  const handleNext = () => {
    if (projects.length === 0) return;
    setDirection("next");
    const nextIndex = (index + 1) % projects.length;

    // Instead of local state swap, push route to fix slug parameter logically
    router.push(`/work?slug=${projects[nextIndex]._id}`);
  };

  const handlePrev = () => {
    if (projects.length === 0) return;
    setDirection("prev");
    const prevIndex = (index - 1 + projects.length) % projects.length;

    router.push(`/work?slug=${projects[prevIndex]._id}`);
  };

  useGSAP(() => {
    if (!isLoading && project) {
      const tl = gsap.timeline();
      const xStart = direction === "next" ? 100 : -100;

      tl.fromTo(
        ".project-content",
        { opacity: 0, x: xStart },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      );

      tl.fromTo(
        ".project-image",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, [isLoading, project, direction]);

  if (isLoading || !project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-950">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <p className="text-xl text-white font-medium">Loading Project Details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full relative bg-gray-950 py-10">
      <div className="container mx-auto min-h-[80vh] my-3 flex gap-10 xl:w-[85vw] lg:w-[97vw] lg:flex-row sm:flex-col justify-center items-center">

        {/* Project Details Content */}
        <div className="project-content lg:w-[40%] sm:w-[95%] min-h-[100%] flex flex-col gap-6 justify-center">
          <div className="flex gap-4 mb-4">
            <button
              onClick={handlePrev}
              className="bg-accent/10 hover:bg-accent hover:text-white border border-accent text-accent text-[22px] w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <PiCaretLeftBold />
            </button>
            <button
              onClick={handleNext}
              className="bg-accent/10 hover:bg-accent hover:text-white border border-accent text-accent text-[22px] w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <PiCaretRightBold />
            </button>
          </div>

          <div className="text-6xl md:text-8xl leading-none font-extrabold text-transparent text-outline drop-shadow-xl">0{index + 1}</div>
          <h3 className="leading-none text-md text-accent tracking-widest font-bold uppercase">{project.category}</h3>
          <h2 className="text-[35px] md:text-[50px] font-bold leading-none text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-white/70 xl:text-lg md:text-md text-sm leading-relaxed border-l-4 border-accent pl-4 py-1">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies.map((item, idx) => (
              <span key={idx} className="bg-primary/30 border border-accent/20 px-3 py-1 rounded-full text-xs font-semibold text-accent shadow-sm shadow-accent/10">
                {item}
              </span>
            ))}
          </div>
          <div className="border-b border-gray-800 w-full my-2"></div>

          <div className="flex gap-4">
            {project.githubLink && (
              <Link className="w-[60px] h-[60px] rounded-full bg-gray-900 border border-gray-800 hover:border-accent hover:bg-accent/20 flex justify-center items-center group relative transition-all duration-300" href={project.githubLink} target="_blank">
                <BsGithub className="text-white group-hover:text-accent text-2xl" />
              </Link>
            )}

            {project.liveLink && (
              <Link className="w-[60px] h-[60px] rounded-full bg-gray-900 border border-gray-800 hover:border-accent hover:bg-accent/20 flex justify-center items-center group relative transition-all duration-300" href={project.liveLink} target="_blank">
                <BsArrowUpRight className="text-white group-hover:text-accent text-2xl" />
              </Link>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="lg:w-[60%] sm:w-[95%] min-h-[100%] flex flex-col justify-center items-center">
          <div className="project-image w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-accent/20 border border-gray-800 relative group bg-gray-900/50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
            {project.imageUrl ? (
              <NextImage
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90"
              />
            ) : (
              <div className="flex flex-col items-center justify-center opacity-50 z-20">
                <NextImage src="/ip1.JPG" alt="placeholder" fill className="object-cover opacity-20" />
                <p className="text-white text-xl z-20 absolute font-bold backdrop-blur-sm bg-black/40 px-4 py-2 rounded-xl border border-gray-700">No Image Uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><Loader2 className="animate-spin text-accent w-10 h-10" /></div>}>
      <WorkContent />
    </Suspense>
  );
}
