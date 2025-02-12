import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 7000) // 7s timeout
    );

    try {
        await dbConnect();

        const body = await req.json();
        const { firstName, lastName, email, phone, service, message } = body;

        if (!firstName || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newContact = new Contact({ firstName, lastName, email, phone, service, message });

        await Promise.race([
            newContact.save(),
            timeout, // Ensures response does not exceed timeout
        ]);

        return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
