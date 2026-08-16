"use client";

import portfolio from "@/data/portfolio.json";

const Blogs = () => {
  return (
    <section className="min-h-[80vh] container mx-auto px-6 lg:px-12 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-accent mb-3">Blogs</h1>
        <p className="text-white/70">Thoughts, learnings, and project breakdowns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.blogs.map((blog) => (
          <article key={blog.id} className="p-6 rounded-2xl border border-accent/20 bg-primary/10">
            <p className="text-sm text-white/50 mb-2">{blog.date}</p>
            <h2 className="text-2xl font-semibold mb-3">{blog.title}</h2>
            <p className="text-white/70 mb-4">{blog.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full border border-accent/30 text-accent">
                  {tag}
                </span>
              ))}
            </div>
            <a href={blog.url} className="text-accent hover:underline">
              Read More
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
