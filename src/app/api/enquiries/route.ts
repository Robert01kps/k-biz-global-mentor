import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { runRoutingEngine } from "@/lib/routingEngine";

const ENQUIRIES_FILE = path.join(process.cwd(), "src", "data", "enquiries.json");

function getEnquiries() {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), "utf8");
    }
    const data = fs.readFileSync(ENQUIRIES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveEnquiries(data: any[]) {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write enquiries file", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const inputData = await req.json();

    if (!inputData.name || !inputData.email) {
      return NextResponse.json({ error: "Name and Email are required fields." }, { status: 400 });
    }

    // Run triage engine
    const routeResults = runRoutingEngine(inputData);

    const record = {
      id: "KB-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      submissionDate: new Date().toISOString(),
      selectedLanguage: inputData.selectedLanguage || "en",
      name: inputData.name,
      company: inputData.company || "",
      jobTitle: inputData.jobTitle || "",
      email: inputData.email,
      phone: inputData.phone || "",
      country: inputData.country || "",
      website: inputData.website || "",
      userLevel: inputData.userLevel || "Not sure",
      userType: inputData.userType || "Other",
      businessArea: inputData.businessArea || [],
      goal: inputData.goal || [],
      supportType: inputData.supportType || [],
      targetMarket: inputData.targetMarket || [],
      currentStatus: inputData.currentStatus || "Other",
      documentsAvailable: inputData.documentsAvailable || [],
      mainQuestion: inputData.mainQuestion || "",
      urgency: inputData.urgency || "General enquiry",
      consentStatus: inputData.consentStatus === true,
      status: "New",
      notes: "",
      ...routeResults
    };

    const currentData = getEnquiries();
    currentData.unshift(record); // Add to top
    saveEnquiries(currentData);

    return NextResponse.json({ success: true, enquiryId: record.id, routing: routeResults }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to process request: " + error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "KBizAdmin2026!";

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized credentials" }, { status: 401 });
    }

    const enquiries = getEnquiries();
    return NextResponse.json(enquiries, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
