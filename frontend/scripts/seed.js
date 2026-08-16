import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        technologies: { type: [String], required: true },
        imageUrl: { type: String },
        githubLink: { type: String },
        liveLink: { type: String },
    },
    { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const seedProjects = [
    {
        title: "Aurora AI Interviewer",
        description: "Full-stack AI interviewer platform for hiring workflows. Features voice conversational interviews, instant feedback, and scoring.",
        category: "AI",
        technologies: ["React", "FastAPI", "MongoDB", "Groq LLM", "faster-whisper"],
        imageUrl: "/uploads/1772969257005-s1.JPG",
        githubLink: "",
        liveLink: "",
    },
    {
        title: "Enterprise RAG Document Assistant",
        description: "An advanced Retrieval-Augmented Generation system allowing enterprise users to semantically search through thousands of internal PDFs using vector embeddings.",
        category: "AI / RAG",
        technologies: ["Next.js", "Python", "LangChain", "Pinecone", "OpenAI"],
        imageUrl: "/ip1.JPG", // placeholder using existing image
        githubLink: "",
        liveLink: "",
    },
    {
        title: "LLM Fine-Tuned Code Generator",
        description: "A customized Large Language Model fine-tuned on specialized corporate codebases to assist developers with boilerplate generation and bug fixing.",
        category: "AI / LLM",
        technologies: ["PyTorch", "HuggingFace", "FastAPI", "React", "PostgreSQL"],
        imageUrl: "/t1.JPG",
        githubLink: "",
        liveLink: "",
    },
    {
        title: "E Commerce Store",
        description: "A full-stack e-commerce project with product management, order flow, and secure backend integration.",
        category: "Full-Stack",
        technologies: ["HTML", "PHP", "MySQL", "JavaScript"],
        imageUrl: "/E1.JPG",
        githubLink: "https://github.com/SaadIT23/E-commerce-Project",
        liveLink: "",
    }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");
        await Project.deleteMany({});
        console.log("Cleared existing projects.");
        await Project.insertMany(seedProjects);
        console.log("Successfully seeded projects!");
    } catch (error) {
        console.error("Seeding failed: ", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
