"use client";

import portfolio from "@/data/portfolio.json";
import { serviceIconMap } from "./iconMaps";

export default function Services() {
  return (
    <section id="services" className="py-16 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-accent mb-4">Services</h2>
          <p className="text-white/70 text-lg">What I offer as a developer from frontend to AI-enabled full-stack products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolio.services.map((service) => {
            const Icon = serviceIconMap[service.icon];

            return (
              <div
                key={service.id}
                className="group p-6 bg-primary/10 border border-accent/20 rounded-2xl shadow-md shadow-accent/5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-4 rounded-full bg-primary/20 group-hover:bg-accent/10 transition-all">
                  {Icon ? <Icon className="w-10 h-10 text-accent" /> : null}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
