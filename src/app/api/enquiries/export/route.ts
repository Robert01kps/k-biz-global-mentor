import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ENQUIRIES_FILE = path.join(process.cwd(), "src", "data", "enquiries.json");

function convertToCSV(enquiries: any[]) {
  const headers = [
    "Enquiry ID",
    "Submission Date",
    "Language",
    "Name",
    "Company",
    "Job Title",
    "Email",
    "Phone/WhatsApp",
    "Country",
    "Website/LinkedIn",
    "User Level",
    "User Type",
    "Business Area",
    "Goal",
    "Support Type",
    "Target Market",
    "Current Status",
    "Urgency",
    "Main Question",
    "Assigned Organisation",
    "Service Route",
    "Regulated/Non-Regulated",
    "Public-Interest/Commercial",
    "Conflict Check Required",
    "KYC Required",
    "Referral Disclosure Required",
    "Status",
    "Notes",
    "Consent Status"
  ];

  const escapeField = (val: any) => {
    if (val === undefined || val === null) return '""';
    let str = String(val);
    if (Array.isArray(val)) str = val.join(", ");
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = enquiries.map((e) => [
    e.id,
    e.submissionDate,
    e.selectedLanguage,
    e.name,
    e.company,
    e.jobTitle,
    e.email,
    e.phone,
    e.country,
    e.website,
    e.userLevel,
    e.userType,
    e.businessArea,
    e.goal,
    e.supportType,
    e.targetMarket,
    e.currentStatus,
    e.urgency,
    e.mainQuestion,
    e.assignedOrganisation,
    e.serviceRoute,
    e.regulatedClassification,
    e.interestClassification,
    e.conflictCheckRequired ? "YES" : "NO",
    e.kycRequired ? "YES" : "NO",
    e.referralDisclosureRequired ? "YES" : "NO",
    e.status,
    e.notes || "",
    e.consentStatus ? "Consented" : "No"
  ]);

  return [headers.join(","), ...rows.map((r) => r.map(escapeField).join(","))].join("\r\n");
}

export async function GET(req: NextRequest) {
  try {
    const password = req.nextUrl.searchParams.get("password");
    const adminPassword = process.env.ADMIN_PASSWORD || "KBizAdmin2026!";

    if (!password || password !== adminPassword) {
      return new NextResponse("Unauthorized credentials", { status: 401 });
    }

    let enquiries = [];
    if (fs.existsSync(ENQUIRIES_FILE)) {
      enquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, "utf8"));
    }

    const csvData = convertToCSV(enquiries);

    // Prepend UTF-8 BOM (\uFEFF) for Excel compatibility
    const bomCsv = "\uFEFF" + csvData;

    return new NextResponse(bomCsv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="kbiz_mentor_enquiries.csv"'
      }
    });
  } catch (error: any) {
    return new NextResponse("Failed to export CSV: " + error.message, { status: 500 });
  }
}
