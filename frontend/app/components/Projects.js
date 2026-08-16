"use client";

import { useState, useEffect } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  const handleCardClick = (id) => {
    // Keep routing simple, if they want to build detail pages they can use the actual object ID
    router.push(`/work?slug=${id}`);
  };

  if (loading) {
    return (
      <section className="projects py-16 bg-primary/5" id="projects">
        <div className="container mx-auto px-6 lg:px-12 text-center text-accent">Loading Projects...</div>
      </section>
    );
  }

  // Treat the first loaded project as spotlight (or a specific AI one), rest as carousel
  const spotlightProject = projects[0];
  const carouselProjects = projects.slice(1);

  return (
    <section className="projects py-16 bg-primary/5" id="projects">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-accent mb-4">Projects</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A selection of my work showcasing full-stack apps, AI / LLM / RAG products, and web platforms.
          </p>
        </div>

        {spotlightProject && (
          <div
            className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-[#1a2433] via-[#152028] to-[#1b1b1d] p-4 lg:p-5 shadow-2xl shadow-accent/10 max-w-5xl mx-auto cursor-pointer"
            onClick={() => handleCardClick(spotlightProject._id)}
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl"></div>
            <div className="grid lg:grid-cols-2 gap-5 items-stretch relative z-10">
              <div className="relative min-h-[220px] lg:min-h-[320px] rounded-2xl overflow-hidden border border-accent/25">
                <Image
                  src={spotlightProject.imageUrl || "/ip1.JPG"}
                  alt={spotlightProject.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col gap-3 lg:gap-4 justify-center">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-accent text-primary">
                    Featured Project
                  </span>
                  <span className="text-sm text-accent/90">
                    {spotlightProject.category}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold leading-tight text-white">{spotlightProject.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm lg:text-base">{spotlightProject.description}</p>

                <div className="flex flex-wrap gap-2">
                  {spotlightProject.technologies.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-primary/30 border border-accent/30 text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-2">
                  {spotlightProject.githubLink && (
                    <a href={spotlightProject.githubLink} target="_blank" className="flex items-center gap-2 text-accent hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                      <FiGithub /> GitHub
                    </a>
                  )}
                  {spotlightProject.liveLink && (
                    <a href={spotlightProject.liveLink} target="_blank" className="flex items-center gap-2 text-accent hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(spotlightProject._id);
                    }}
                    className="ml-auto px-4 py-2 rounded-full bg-accent text-primary font-semibold hover:bg-accent/90"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {carouselProjects.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full max-w-6xl mt-4"
          >
            {carouselProjects.map((project) => (
              <SwiperSlide key={project._id}>
                <div
                  className="group p-6 bg-primary/10 rounded-2xl border border-accent/30 shadow-lg shadow-accent/10 flex flex-col lg:flex-row gap-8 hover:border-accent/50 transition-all duration-500 cursor-pointer"
                  onClick={() => handleCardClick(project._id)}
                >
                  <div className="relative w-full lg:w-1/2 h-[250px] lg:h-[320px] rounded-xl overflow-hidden border border-accent/20">
                    <Image
                      src={project.imageUrl || "/ip1.JPG"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="flex flex-col gap-4 lg:w-1/2 justify-center">
                    <span className="text-accent font-bold tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-semibold text-white">{project.title}</h3>
                    <p className="text-white/70 leading-relaxed line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-sm rounded-full bg-primary/20 border border-accent/20 text-white/80">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-4">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" className="flex items-center gap-2 text-accent hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                          <FiGithub /> GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" className="flex items-center gap-2 text-accent hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex justify-center mt-8">
          <a href="/showcase" className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
            Show All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
