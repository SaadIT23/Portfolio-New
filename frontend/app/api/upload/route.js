import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const sanitizeName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "_");

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const safeName = sanitizeName(file.name || "image");
    const finalName = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, finalName);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({ path: `/uploads/${finalName}` });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed", detail: error.message }, { status: 500 });
  }
}
