"use client"
import { FiExternalLink, FiGithub } from "react-icons/fi"

const ProjectCard = ({ project, index }) => {
  return (
    <div className="project-card group bg-primary/30 rounded-xl overflow-hidden hover:bg-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
            <FiExternalLink className="text-white text-xl" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
            <FiGithub className="text-white text-xl" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/70 mb-4 text-sm leading-relaxed">{project.description}</p>

        {project.tech && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <span key={techIndex} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
