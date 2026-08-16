import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function PUT(req, { params }) {
    try {
        // Await the params properly in Next.js 15
        const resolvedParams = await params;
        const { id } = resolvedParams;

        const authHeader = req.headers.get("Authorization");
        if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        const updatedProject = await Project.findByIdAndUpdate(id, body, { new: true });
        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        // Await params
        const resolvedParams = await params;
        const { id } = resolvedParams;

        const authHeader = req.headers.get("Authorization");
        if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
