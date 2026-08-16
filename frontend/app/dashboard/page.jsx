"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, logOut, RefreshCcw } from "lucide-react";

export default function Dashboard() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        technologies: "",
        imageUrl: "",
        githubLink: "",
        liveLink: "",
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (isAdmin) fetchProjects();
    }, [isAdmin]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "saad_admin_secret_123") {
            setIsAdmin(true);
            setError("");
        } else {
            setError("Invalid credentials");
        }
    };

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            technologies: formData.technologies.split(",").map(t => t.trim()),
        };

        const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${password}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            setFormData({
                title: "", description: "", category: "", technologies: "", imageUrl: "", githubLink: "", liveLink: ""
            });
            setEditingId(null);
            fetchProjects();
        } else {
            const { error } = await res.json();
            alert("Error: " + error);
        }
        setLoading(false);
    };

    const handeEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            category: project.category,
            technologies: project.technologies.join(", "),
            imageUrl: project.imageUrl || "",
            githubLink: project.githubLink || "",
            liveLink: project.liveLink || ""
        });
        setEditingId(project._id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this?")) return;
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${password}` }
        });
        if (res.ok) {
            fetchProjects();
        }
        setLoading(false);
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Dashboard Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Enter Admin Password"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                <header className="flex justify-between items-center bg-gray-900 p-6 rounded-2xl border border-gray-800 relative z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <h1 className="text-3xl font-bold text-white relative z-10">Admin Dashboard</h1>
                    <button
                        onClick={() => setIsAdmin(false)}
                        className="px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-lg flex items-center gap-2 transition-colors relative z-10"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form Section */}
                    <div className="lg:col-span-1 border border-gray-800 bg-gray-900/50 rounded-2xl p-6 backdrop-blur-xl">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                            <Plus className="text-blue-500" /> {editingId ? "Edit Project" : "Add New Project"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Project Title *" className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" required />
                            <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category (e.g. AI, Full-Stack) *" className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" required />
                            <input name="technologies" value={formData.technologies} onChange={handleInputChange} placeholder="Tech Stack (comma separated) *" className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" required />
                            <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" />
                            <input name="githubLink" value={formData.githubLink} onChange={handleInputChange} placeholder="GitHub URL" className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" />
                            <input name="liveLink" value={formData.liveLink} onChange={handleInputChange} placeholder="Live Demo URL" className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" />
                            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Project Description *" rows={4} className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white" required />

                            <div className="flex gap-4">
                                <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                                    {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={() => setEditingId(null)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2 border border-gray-800 bg-gray-900/50 rounded-2xl p-6 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">Manage Projects</h2>
                            <button onClick={fetchProjects} className="p-2 hover:bg-gray-800 rounded-lg transition-colors"><RefreshCcw size={20} /></button>
                        </div>

                        {loading && projects.length === 0 ? (
                            <p className="text-center text-gray-400 py-10">Loading projects...</p>
                        ) : projects.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">No projects found. Add one!</p>
                        ) : (
                            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                                {projects.map((proj) => (
                                    <div key={proj._id} className="group bg-gray-800/30 hover:bg-gray-800/70 border border-gray-700/50 rounded-xl p-5 transition-all flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">{proj.category}</span>
                                                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                                            </div>
                                            <p className="text-sm text-gray-400 line-clamp-2 max-w-xl">{proj.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {proj.technologies.map((t, i) => (
                                                    <span key={i} className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-300">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-gray-700/50 justify-end">
                                            <button onClick={() => handeEdit(proj)} className="p-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(proj._id)} className="p-2 bg-gray-800 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
