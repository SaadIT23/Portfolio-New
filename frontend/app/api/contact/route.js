import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
    try {
        await dbConnect();

        const { firstName, lastName, email, phone, service, message } = await req.json();

        if (!firstName || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newContact = new Contact({ firstName, lastName, email, phone, service, message });
        await newContact.save();

        return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
