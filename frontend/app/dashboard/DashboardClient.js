"use client";

import { useEffect, useState } from "react";

const emptyProject = {
  id: "",
  num: "",
  featured: false,
  category: "",
  title: "",
  des: "",
  stack: [],
  image: "",
  images: [],
  github: "",
  live: "",
};

const DashboardClient = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setStatus("Loading...");
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    const result = await res.json();
    if (!res.ok) {
      setStatus(result.error || "Failed to load.");
      return;
    }
    setData(result.data);
    setStatus("Loaded.");
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    if (!data) return;
    setSaving(true);
    setStatus("Saving...");
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const result = await res.json();
    setSaving(false);
    setStatus(res.ok ? result.message : result.error || "Save failed.");
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Upload failed.");
    return result.path;
  };

  const updateSite = (key, value) => {
    setData((prev) => ({ ...prev, site: { ...prev.site, [key]: value } }));
  };

  const updateSkillColor = (groupIndex, skillIndex, color) => {
    setData((prev) => {
      const skills = [...prev.skills];
      skills[groupIndex] = { ...skills[groupIndex] };
      skills[groupIndex].items = [...skills[groupIndex].items];
      skills[groupIndex].items[skillIndex] = { ...skills[groupIndex].items[skillIndex], color };
      return { ...prev, skills };
    });
  };

  const updateService = (index, key, value) => {
    setData((prev) => {
      const services = [...prev.services];
      services[index] = { ...services[index], [key]: value };
      return { ...prev, services };
    });
  };

  const updateResumeItem = (section, index, key, value) => {
    setData((prev) => {
      const resume = { ...prev.resume };
      resume[section] = [...resume[section]];
      resume[section][index] = { ...resume[section][index], [key]: value };
      return { ...prev, resume };
    });
  };
  const addResumeItem = (section, template) => {
    setData((prev) => {
      const resume = { ...prev.resume };
      resume[section] = [...(resume[section] || []), template];
      return { ...prev, resume };
    });
  };

  const removeResumeItem = (section, index) => {
    setData((prev) => {
      const resume = { ...prev.resume };
      resume[section] = (resume[section] || []).filter((_, i) => i !== index);
      return { ...prev, resume };
    });
  };

  const updateBlog = (index, key, value) => {
    setData((prev) => {
      const blogs = [...prev.blogs];
      blogs[index] = { ...blogs[index], [key]: value };
      return { ...prev, blogs };
    });
  };

  const updateProject = (index, key, value) => {
    setData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [key]: value };
      return { ...prev, projects };
    });
  };

  const updateProjectStack = (index, value) => {
    const stack = value.split(",").map((item) => item.trim()).filter(Boolean);
    updateProject(index, "stack", stack);
  };

  const updateProjectImages = (index, value) => {
    const images = value.split(",").map((item) => item.trim()).filter(Boolean);
    updateProject(index, "images", images);
  };

  const addProject = () => {
    setData((prev) => ({ ...prev, projects: [...prev.projects, { ...emptyProject, num: String(prev.projects.length + 1).padStart(2, "0") }] }));
  };

  const removeProject = (index) => {
    setData((prev) => {
      const projects = prev.projects.filter((_, i) => i !== index);
      return { ...prev, projects };
    });
  };

  if (!data) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <section className="min-h-screen bg-[#0f1117] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-accent">Local Dashboard</h1>
            <p className="text-white/60 text-sm">Use this local interface to update portfolio content and images.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadData} className="px-4 py-2 rounded-lg border border-accent/30 hover:bg-accent/10">
              Reload
            </button>
            <button onClick={saveData} disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-primary font-semibold disabled:opacity-70">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <p className="mb-6 text-sm text-white/70">{status}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Profile</h2>
            {[
              ["ownerName", "Name"],
              ["role", "Role"],
              ["headline", "Headline"],
              ["heroIntro", "Hero Intro"],
              ["heroDescription", "Hero Description"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["location", "Location"],
              ["cvFile", "CV File Name"],
            ].map(([key, label]) => (
              <div key={key} className="mb-3">
                <label className="block text-sm text-white/70 mb-1">{label}</label>
                <input
                  value={data.site[key] || ""}
                  onChange={(e) => updateSite(key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20 outline-none focus:border-accent"
                />
              </div>
            ))}
            <div className="mb-3">
              <label className="block text-sm text-white/70 mb-1">Hero Image Path</label>
              <div className="flex gap-2">
                <input
                  value={data.site.heroImage || ""}
                  onChange={(e) => updateSite("heroImage", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20 outline-none focus:border-accent"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const imagePath = await uploadImage(file);
                    updateSite("heroImage", imagePath);
                  }}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Stats</h2>
            {data.stats.map((stat, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="number"
                  value={stat.num}
                  onChange={(e) =>
                    setData((prev) => {
                      const stats = [...prev.stats];
                      stats[idx] = { ...stats[idx], num: Number(e.target.value || 0) };
                      return { ...prev, stats };
                    })
                  }
                  className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                />
                <input
                  value={stat.text}
                  onChange={(e) =>
                    setData((prev) => {
                      const stats = [...prev.stats];
                      stats[idx] = { ...stats[idx], text: e.target.value };
                      return { ...prev, stats };
                    })
                  }
                  className="col-span-2 px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <label className="block text-sm text-white/70 mb-1">About Image</label>
            <div className="flex gap-2 mb-3">
              <input
                value={data.about.image || ""}
                onChange={(e) => setData((prev) => ({ ...prev, about: { ...prev.about, image: e.target.value } }))}
                className="w-full px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
              />
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const imagePath = await uploadImage(file);
                  setData((prev) => ({ ...prev, about: { ...prev.about, image: imagePath } }));
                }}
                className="text-xs"
              />
            </div>

            {data.about.paragraphs.map((paragraph, idx) => (
              <div key={idx} className="mb-3">
                <label className="block text-sm text-white/70 mb-1">Paragraph {idx + 1}</label>
                <textarea
                  value={paragraph}
                  onChange={(e) =>
                    setData((prev) => {
                      const paragraphs = [...prev.about.paragraphs];
                      paragraphs[idx] = e.target.value;
                      return { ...prev, about: { ...prev.about, paragraphs } };
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20 min-h-20"
                />
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Services</h2>
            {data.services.map((service, idx) => (
              <div key={service.id} className="p-3 mb-3 rounded-lg border border-white/15 bg-[#0f1117]">
                <input
                  value={service.title}
                  onChange={(e) => updateService(idx, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 mb-2"
                  placeholder="Service title"
                />
                <input
                  value={service.icon}
                  onChange={(e) => updateService(idx, "icon", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 mb-2"
                  placeholder="Icon key (code/server/globe/sparkles)"
                />
                <textarea
                  value={service.desc}
                  onChange={(e) => updateService(idx, "desc", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 min-h-16"
                  placeholder="Service description"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-accent/20 bg-[#151924] mb-8">
          <h2 className="text-xl font-semibold mb-3">Skills Colors</h2>
          {data.skills.map((group, gIdx) => (
            <div key={group.category} className="mb-4">
              <h3 className="text-accent mb-2">{group.category}</h3>
              <div className="grid md:grid-cols-3 gap-2">
                {group.items.map((item, sIdx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-28 text-sm text-white/70">{item.name}</span>
                    <input
                      value={item.color || ""}
                      onChange={(e) => updateSkillColor(gIdx, sIdx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                      placeholder="text-orange-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Resume Experience</h2>
            <div className="mb-3">
              <button
                onClick={() =>
                  addResumeItem("experience", {
                    company: "",
                    position: "",
                    duration: "",
                    highlights: [],
                  })
                }
                className="px-3 py-2 rounded-lg border border-accent/30 hover:bg-accent/10 text-sm"
              >
                Add Experience
              </button>
            </div>
            {data.resume.experience.map((item, idx) => (
              <div key={idx} className="p-3 mb-3 rounded-lg border border-white/15 bg-[#0f1117]">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    value={item.company}
                    onChange={(e) => updateResumeItem("experience", idx, "company", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                    placeholder="Company"
                  />
                  <input
                    value={item.position}
                    onChange={(e) => updateResumeItem("experience", idx, "position", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                    placeholder="Position"
                  />
                  <input
                    value={item.duration}
                    onChange={(e) => updateResumeItem("experience", idx, "duration", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                    placeholder="Duration"
                  />
                </div>
                <input
                  value={(item.highlights || []).join(", ")}
                  onChange={(e) =>
                    updateResumeItem(
                      "experience",
                      idx,
                      "highlights",
                      e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 text-sm"
                  placeholder="Highlights (comma separated)"
                />
                <button onClick={() => removeResumeItem("experience", idx)} className="text-red-400 text-xs mt-2">
                  Remove Experience
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Resume Education</h2>
            <div className="mb-3">
              <button
                onClick={() => addResumeItem("education", { institute: "", degree: "", duration: "", notes: "" })}
                className="px-3 py-2 rounded-lg border border-accent/30 hover:bg-accent/10 text-sm"
              >
                Add Education
              </button>
            </div>
            {(data.resume.education || []).map((item, idx) => (
              <div key={idx} className="p-3 mb-3 rounded-lg border border-white/15 bg-[#0f1117]">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    value={item.institute || ""}
                    onChange={(e) => updateResumeItem("education", idx, "institute", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                    placeholder="Institute"
                  />
                  <input
                    value={item.degree || ""}
                    onChange={(e) => updateResumeItem("education", idx, "degree", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                    placeholder="Degree"
                  />
                  <input
                    value={item.duration || ""}
                    onChange={(e) => updateResumeItem("education", idx, "duration", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                    placeholder="Duration"
                  />
                </div>
                <input
                  value={item.notes || ""}
                  onChange={(e) => updateResumeItem("education", idx, "notes", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 text-sm"
                  placeholder="Extra note (e.g. CGPA)"
                />
                <button onClick={() => removeResumeItem("education", idx)} className="text-red-400 text-xs mt-2">
                  Remove Education
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Achievements</h2>
            <div className="mb-3">
              <button
                onClick={() => addResumeItem("achievements", { title: "", org: "", duration: "" })}
                className="px-3 py-2 rounded-lg border border-accent/30 hover:bg-accent/10 text-sm"
              >
                Add Achievement
              </button>
            </div>
            {(data.resume.achievements || []).map((item, idx) => (
              <div key={idx} className="mb-2">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    value={item.title || ""}
                    onChange={(e) => updateResumeItem("achievements", idx, "title", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                    placeholder="Title"
                  />
                  <input
                    value={item.org || ""}
                    onChange={(e) => updateResumeItem("achievements", idx, "org", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                    placeholder="Organization"
                  />
                  <input
                    value={item.duration || ""}
                    onChange={(e) => updateResumeItem("achievements", idx, "duration", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                    placeholder="Year/Duration"
                  />
                </div>
                <button onClick={() => removeResumeItem("achievements", idx)} className="text-red-400 text-xs mt-2">
                  Remove Achievement
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Certifications</h2>
            <div className="mb-3">
              <button
                onClick={() => addResumeItem("certifications", { title: "", org: "", duration: "" })}
                className="px-3 py-2 rounded-lg border border-accent/30 hover:bg-accent/10 text-sm"
              >
                Add Certification
              </button>
            </div>
            {(data.resume.certifications || []).map((item, idx) => (
              <div key={idx} className="mb-2">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    value={item.title || ""}
                    onChange={(e) => updateResumeItem("certifications", idx, "title", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                    placeholder="Title"
                  />
                  <input
                    value={item.org || ""}
                    onChange={(e) => updateResumeItem("certifications", idx, "org", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                    placeholder="Organization"
                  />
                  <input
                    value={item.duration || ""}
                    onChange={(e) => updateResumeItem("certifications", idx, "duration", e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0f1117] border border-white/20"
                    placeholder="Year/Duration"
                  />
                </div>
                <button onClick={() => removeResumeItem("certifications", idx)} className="text-red-400 text-xs mt-2">
                  Remove Certification
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
            <h2 className="text-xl font-semibold mb-3">Blogs</h2>
            {data.blogs.map((blog, idx) => (
              <div key={blog.id} className="p-3 mb-3 rounded-lg border border-white/15 bg-[#0f1117]">
                <input
                  value={blog.title}
                  onChange={(e) => updateBlog(idx, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 mb-2"
                  placeholder="Blog title"
                />
                <input
                  value={blog.date}
                  onChange={(e) => updateBlog(idx, "date", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 mb-2"
                  placeholder="YYYY-MM-DD"
                />
                <input
                  value={blog.url}
                  onChange={(e) => updateBlog(idx, "url", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 mb-2"
                  placeholder="URL"
                />
                <textarea
                  value={blog.excerpt}
                  onChange={(e) => updateBlog(idx, "excerpt", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 min-h-16"
                  placeholder="Excerpt"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-accent/20 bg-[#151924]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button onClick={addProject} className="px-3 py-2 rounded-lg border border-accent/30 hover:bg-accent/10">
              Add Project
            </button>
          </div>

          <div className="space-y-6">
            {data.projects.map((project, idx) => (
              <div key={`${project.id}-${idx}`} className="p-4 rounded-xl border border-white/15 bg-[#0f1117]">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold text-accent">{project.title || `Project ${idx + 1}`}</h3>
                  <button onClick={() => removeProject(idx)} className="text-red-400 text-sm">
                    Remove
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    ["id", "ID"],
                    ["num", "Number"],
                    ["title", "Title"],
                    ["category", "Category"],
                    ["github", "GitHub"],
                    ["live", "Live URL"],
                    ["image", "Main Image Path"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-xs text-white/60 mb-1">{label}</label>
                      <input
                        value={project[key] || ""}
                        onChange={(e) => updateProject(idx, key, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                      />
                    </div>
                  ))}

                  <div className="flex items-end gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const imagePath = await uploadImage(file);
                        updateProject(idx, "image", imagePath);
                      }}
                      className="text-xs"
                    />
                    <label className="text-xs text-white/60">Upload Main Image</label>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-white/60 mb-1">Description</label>
                  <textarea
                    value={project.des || ""}
                    onChange={(e) => updateProject(idx, "des", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20 min-h-20"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-white/60 mb-1">Stack (comma separated)</label>
                  <input
                    value={(project.stack || []).join(", ")}
                    onChange={(e) => updateProjectStack(idx, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-white/60 mb-1">Gallery Images (comma separated paths)</label>
                  <input
                    value={(project.images || []).join(", ")}
                    onChange={(e) => updateProjectImages(idx, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#151924] border border-white/20"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const imagePath = await uploadImage(file);
                        const nextImages = [...(project.images || []), imagePath];
                        updateProject(idx, "images", nextImages);
                      }}
                      className="text-xs"
                    />
                    <label className="text-xs text-white/60">Upload and add to gallery</label>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!project.featured}
                      onChange={(e) => updateProject(idx, "featured", e.target.checked)}
                    />
                    Featured
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardClient;
