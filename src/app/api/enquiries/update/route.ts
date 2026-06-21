import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ENQUIRIES_FILE = path.join(process.cwd(), "src", "data", "enquiries.json");

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "KBizAdmin2026!";

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized credentials" }, { status: 401 });
    }

    const updateInfo = await req.json();
    if (!updateInfo.id) {
      return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });
    }

    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return NextResponse.json({ error: "No records found" }, { status: 404 });
    }

    const data = fs.readFileSync(ENQUIRIES_FILE, "utf8");
    const currentData = JSON.parse(data);

    const index = currentData.findIndex((e: any) => e.id === updateInfo.id);
    if (index === -1) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    if (updateInfo.status) currentData[index].status = updateInfo.status;
    if (updateInfo.notes !== undefined) currentData[index].notes = updateInfo.notes;

    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(currentData, null, 2), "utf8");

    return NextResponse.json({ success: true, updatedRecord: currentData[index] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update record: " + error.message }, { status: 500 });
  }
}
