import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true }, // e.g., "AI", "Full-Stack", "Mobile"
        technologies: { type: [String], required: true },
        imageUrl: { type: String }, // optional cover image
        githubLink: { type: String }, // optional repository link
        liveLink: { type: String }, // optional live demo link
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
