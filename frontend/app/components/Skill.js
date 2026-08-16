"use client";

import portfolio from "@/data/portfolio.json";
import { skillIconMap } from "./iconMaps";
import { getSkillColorClass } from "./skillColorClass";

export default function Skills() {
  return (
    <section className="skills py-16 bg-primary/5" id="skills">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-accent mb-4">Skills & Tech Stack</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Demonstrating my proficiency in key skills and technologies that drive my work and projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.skills.map((group, idx) => (
            <div
              key={idx}
              className="p-6 bg-primary/10 rounded-2xl border border-accent/30 shadow-md shadow-accent/10 hover:shadow-accent/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-accent mb-4 text-center">{group.category}</h3>
              <div className="flex flex-wrap md:justify-start justify-center gap-6">
                {group.items.map((skill, i) => {
                  const Icon = skillIconMap[skill.icon];
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-primary/20 border border-accent/20 hover:bg-accent/10 transition-all duration-300"
                    >
                      {Icon ? <Icon className={`text-3xl ${getSkillColorClass(skill.color)}`} /> : null}
                      <span className="text-white/80 text-sm mt-2 text-center">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
