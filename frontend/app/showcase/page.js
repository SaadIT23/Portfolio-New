"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Loader2 } from "lucide-react";

export default function Showcase() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (e) {
        console.error(e);
      }
    }
    getProjects();
  }, []);

  const totalImages = projects.length;

  const handleImageLoaded = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) setImagesLoaded(true);
      return newCount;
    });
  };

  useEffect(() => {
    if (projects.length === 0) return;

    // Safety timeout in case images fail or don't trigger load
    const safetyTimeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 5000);

    const imageElements = [];
    projects.forEach((project) => {
      if (!project.imageUrl) {
        handleImageLoaded();
        return;
      }
      const img = new Image();
      img.src = project.imageUrl;
      img.onload = handleImageLoaded;
      img.onerror = handleImageLoaded;
      imageElements.push(img);
    });

    return () => {
      clearTimeout(safetyTimeout);
      imageElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [projects]);

  const handleCardClick = (id) => {
    router.push(`/work?slug=${id}`);
  };

  useGSAP(() => {
    if (imagesLoaded && projects.length > 0) {
      setLoadingComplete(true);
      const timeline = gsap.timeline();

      timeline.from(".head", {
        y: -20,
        opacity: 0,
        duration: 0.4,
      });

      timeline.fromTo(
        ".card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1, stagger: 0.1 },
      );
    }
  }, [imagesLoaded, projects.length]);

  const loadingPercentage = totalImages > 0 ? Math.round((loadedCount / totalImages) * 100) : 0;

  return (
    <div className="w-[85%] md:w-[98%] mx-auto min-h-[70vh] flex flex-col justify-center">
      {(!imagesLoaded || projects.length === 0) && !loadingComplete ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
          <p className="text-lg font-medium text-white">
            {projects.length === 0 ? "Fetching projects..." : `Loading images... ${loadingPercentage}%`}
          </p>
          <div className="w-64 h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-accent transition-all duration-300 ease-in-out" style={{ width: `${loadingPercentage}%` }}></div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="head text-xl md:text-2xl lg:text-4xl font-bold border-b-4 border-accent w-fit pb-2 mx-auto my-4 text-white">
            Project Showcase
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full justify-items-center gap-6 my-10">
            {projects.map((item) => (
              <div
                key={item._id}
                className="card text-center h-[200px] md:h-[30vh] w-full max-w-[350px] border rounded-xl md:rounded-3xl hover:cursor-pointer border-accent/40 hover:border-accent bg-gray-900 shadow-lg shadow-accent/5 hover:shadow-accent/40 transition-all duration-300 overflow-hidden relative group flex flex-col justify-center items-center"
                onClick={() => handleCardClick(item._id)}
              >
                <img src={item.imageUrl || "/ip1.JPG"} className="object-cover h-full w-full opacity-60 md:opacity-80 group-hover:opacity-30 transition-opacity duration-300" alt={item.title} />
                <p className="z-10 absolute w-[90%] opacity-100 md:opacity-0 transition-all duration-300 md:group-hover:opacity-100 text-lg md:text-xl font-extrabold text-white bg-black/60 p-2 rounded-lg backdrop-blur-sm shadow-black/50 shadow-md">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
