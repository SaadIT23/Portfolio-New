"use client";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const Timeline = ({ data, type }) => {
  return (
    <section className="w-full py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-accent">
            {data.title}
          </h2>
          <p className="text-white/70 mt-2 italic">{data.des}</p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-accent/50">
          {data.items.map((item, index) => (
            <div key={index} className="mb-10 ml-6">
              {/* Icon */}
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-accent text-primary rounded-full ring-4 ring-primary">
                {type === "experience" ? <FaBriefcase /> : <FaGraduationCap />}
              </span>

              {/* Card */}
              <div className="p-5 bg-primary/10 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-lg font-semibold text-white">
                  {type === "experience" ? item.position : item.degree}
                </h3>
                <p className="text-accent font-medium">
                  {type === "experience" ? item.company : item.institute}
                </p>
                <span className="block text-sm text-white/60 mt-1">
                  {item.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
