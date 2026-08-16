import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const contentFilePath = path.join(process.cwd(), "data", "portfolio.json");
const contentKey = "main";

const isDbMode = () => process.env.PORTFOLIO_STORAGE === "db";

const readFromFile = async () => {
  const fileContent = await fs.readFile(contentFilePath, "utf-8");
  return JSON.parse(fileContent);
};

const writeToFile = async (data) => {
  await fs.writeFile(contentFilePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
};

const readFromDb = async () => {
  const { default: dbConnect } = await import("@/lib/mongodb");
  const { default: PortfolioContent } = await import("@/models/PortfolioContent");
  await dbConnect();
  const doc = await PortfolioContent.findOne({ key: contentKey }).lean();
  return doc?.data || null;
};

const writeToDb = async (data) => {
  const { default: dbConnect } = await import("@/lib/mongodb");
  const { default: PortfolioContent } = await import("@/models/PortfolioContent");
  await dbConnect();
  await PortfolioContent.findOneAndUpdate(
    { key: contentKey },
    { key: contentKey, data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
};

const canWrite = (req) => {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return true;
  return req.headers.get("x-admin-token") === adminToken;
};

export async function GET() {
  try {
    if (isDbMode()) {
      try {
        const dbData = await readFromDb();
        if (dbData) return NextResponse.json({ source: "db", data: dbData });
      } catch {
      }
    }

    const fileData = await readFromFile();
    return NextResponse.json({ source: "file", data: fileData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load portfolio content", detail: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!canWrite(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload = body?.data;

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Invalid payload. Expected { data: {...} }" }, { status: 400 });
    }

    if (isDbMode()) {
      await writeToDb(payload);
      return NextResponse.json({ message: "Portfolio content saved to MongoDB.", source: "db" });
    }

    await writeToFile(payload);
    return NextResponse.json({ message: "Portfolio content saved to local file.", source: "file" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save portfolio content", detail: error.message }, { status: 500 });
  }
}
