export interface DiagnosticInput {
  name: string;
  email: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  country?: string;
  website?: string;
  userLevel?: string;
  userType?: string;
  businessArea?: string[];
  goal?: string[];
  supportType?: string[];
  targetMarket?: string[];
  currentStatus?: string;
  documentsAvailable?: string[];
  mainQuestion?: string;
  urgency?: string;
  selectedLanguage?: string;
  consentStatus?: boolean;
}

export interface RoutingResult {
  routingTags: string[];
  assignedOrganisation: string;
  serviceRoute: string;
  regulatedClassification: "Regulated" | "Non-Regulated";
  interestClassification: "Commercial" | "Public-Interest";
  conflictCheckRequired: boolean;
  kycRequired: boolean;
  referralDisclosureRequired: boolean;
}

export function runRoutingEngine(enquiry: Partial<DiagnosticInput>): RoutingResult {
  const supportTypes = enquiry.supportType || [];
  const businessAreas = enquiry.businessArea || [];
  const goals = enquiry.goal || [];

  const tags: string[] = [];
  let assignedOrg = "K Biz Global Mentor coordination team";
  let serviceRoute = "Overseas Starter Check";
  let isRegulated = false;
  let isCommercial = false;

  // 1. Tag Assignment based on support type, business area, or goals
  if (supportTypes.includes("General information and networking") || goals.includes("Learn the basics")) {
    tags.push("information-networking");
    assignedOrg = "Trade Association / KITA / KBA network";
    isCommercial = false;
  }

  if (
    supportTypes.includes("Overseas business consulting") ||
    supportTypes.includes("Market research") ||
    supportTypes.includes("Buyer / distributor / partner search") ||
    goals.includes("Find a market") ||
    goals.includes("Find a buyer") ||
    goals.includes("Find a supplier") ||
    goals.includes("Find a distributor") ||
    goals.includes("Find a business partner")
  ) {
    tags.push("business-consulting");
    assignedOrg = "Eurolegal Consulting";
    serviceRoute = "Market Entry Diagnostic";
    isCommercial = true;
  }

  if (
    supportTypes.includes("Contract review or legal risk") ||
    supportTypes.includes("Dispute, debt recovery or litigation support") ||
    goals.includes("Review a contract") ||
    goals.includes("Resolve a dispute") ||
    goals.includes("Recover unpaid debt") ||
    enquiry.userLevel === "Protector"
  ) {
    tags.push("legal-support");
    assignedOrg = "Kim Partners Solicitors";
    serviceRoute = enquiry.userLevel === "Protector" ? "Dispute, Debt and Crisis Support" : "Contract and Deal Risk Review";
    isRegulated = true;
    isCommercial = true;
  }

  if (
    supportTypes.includes("Hallyu or Korean culture promotion") ||
    supportTypes.includes("Korean food promotion") ||
    businessAreas.includes("K-Food") ||
    businessAreas.includes("Korean culture / events") ||
    businessAreas.includes("Korean language / education")
  ) {
    tags.push("hallyu-public-cultural");
    assignedOrg = "Korea Town Foundation";
    serviceRoute = "Hallyu Business Starter";
    isCommercial = false;
  }

  if (
    supportTypes.includes("Event, festival or pop-up collaboration") ||
    businessAreas.includes("K-Pop / entertainment") ||
    goals.includes("Run an event or pop-up")
  ) {
    tags.push("hallyu-commercial-event");
    assignedOrg = "London Hallyu Festival";
    serviceRoute = "Hallyu Business Starter";
    isCommercial = true;
  }

  if (supportTypes.includes("Legal professional networking")) {
    tags.push("legal-network");
    assignedOrg = "Korean British Lawyers Association";
    isCommercial = false;
  }

  if (
    supportTypes.includes("UK-Korea strategic networking") ||
    supportTypes.includes("Energy sector networking or forum") ||
    supportTypes.includes("Defence or strategic industry networking")
  ) {
    tags.push("strategic-networking");
    assignedOrg = "British Korean Society";
    isCommercial = false;
  }

  if (
    supportTypes.includes("Energy project practical support") ||
    supportTypes.includes("Defence-related collaboration practical support") ||
    supportTypes.includes("Infrastructure project support") ||
    supportTypes.includes("Nuclear, hydrogen or renewables collaboration") ||
    supportTypes.includes("Export control, sanctions or strategic project risk review") ||
    businessAreas.includes("Energy and infrastructure")
  ) {
    tags.push("energy-defence-practical-support");
    assignedOrg = "Castletown Law / KEPCO Service Ltd";
    serviceRoute = "Investment and Collaboration Readiness";
    isRegulated = true;
    isCommercial = true;
  }

  if (supportTypes.includes("Energy sector networking or forum") && !tags.includes("energy-defence-practical-support")) {
    tags.push("energy-strategic");
    assignedOrg = "KEPCO Service Ltd / Castletown Law";
    isCommercial = true;
  }

  if (supportTypes.includes("Housing, smart home or energy-efficiency collaboration")) {
    tags.push("housing-energy-efficiency");
    assignedOrg = "K Smarthome Ltd";
    serviceRoute = "Local Setup and Soft Landing";
    isCommercial = true;
  }

  if (
    supportTypes.includes("Association or government programme") ||
    enquiry.userType === "Association" ||
    enquiry.userType === "Government / public body" ||
    goals.includes("Work with an association or government body")
  ) {
    tags.push("public-association-programme");
    assignedOrg = "K Biz Global Mentor coordination team";
    serviceRoute = "Association and Government Programme Desk";
    isCommercial = false;
  }

  // Fallbacks
  if (tags.length === 0) {
    tags.push("information-networking");
    assignedOrg = "K Biz Global Mentor coordination team";
    isCommercial = false;
  }

  // Dynamic overrides / pairings: If multiple matches exist, we resolve priority
  // Regulated vs non-regulated, and checks requirements
  const conflictCheckRequired = tags.includes("legal-support") || tags.includes("energy-defence-practical-support");
  const kycRequired = tags.includes("legal-support") || tags.includes("energy-defence-practical-support");
  const referralDisclosureRequired = isCommercial && assignedOrg !== "K Biz Global Mentor coordination team";

  return {
    routingTags: tags,
    assignedOrganisation: assignedOrg,
    serviceRoute: serviceRoute,
    regulatedClassification: isRegulated ? "Regulated" : "Non-Regulated",
    interestClassification: isCommercial ? "Commercial" : "Public-Interest",
    conflictCheckRequired,
    kycRequired,
    referralDisclosureRequired
  };
}
