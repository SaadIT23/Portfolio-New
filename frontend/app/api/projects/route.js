import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        // Basic static authentication using a custom header
        const authHeader = req.headers.get("Authorization");
        if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description, category, technologies, imageUrl, githubLink, liveLink } = body;

        if (!title || !description || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();
        const newProject = new Project({ title, description, category, technologies, imageUrl, githubLink, liveLink });
        await newProject.save();

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
