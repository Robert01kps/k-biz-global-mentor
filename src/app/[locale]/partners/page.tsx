"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Building, UserCheck, ShieldAlert, Award, FileText, 
  HelpCircle, Scale, Globe, Network, HardHat
} from "lucide-react";

export default function PartnersPage() {
  const { locale, t } = useLanguage();

  const partnerDirectory = [
    {
      name: "Trade Association / KITA / KBA network",
      role: "Global trade coordination desk, membership services, and Korea-UK business forums.",
      sector: "Bilateral Trade & Information networks",
      classification: "Information & Networking Desk",
      interest: "Public-Interest / Non-Profit",
      icon: Network,
      details: "Acts as a primary point of contact for K-Biz members. Delivers basic market information, guides for beginners, and schedules networking meetings without administrative fees."
    },
    {
      name: "Eurolegal Consulting",
      role: "Non-regulated consulting, business plan writing, feasibility reviews, local partner searches, and market access research.",
      sector: "Strategic Management Consultancy",
      classification: "Non-Regulated Consulting",
      interest: "Commercial Entity",
      icon: Building,
      details: "Assists Korean firms with market analysis, business setups, feasibility planning, and distributor checks. Does not offer regulated legal representation."
    },
    {
      name: "Kim Partners Solicitors",
      role: "Immigration, visa sponsorships, corporate transaction structuring, commercial leases, and regulatory litigation.",
      sector: "Regulated Legal services (SRA authorized)",
      classification: "Regulated Solicitors Firm",
      interest: "Commercial Entity",
      icon: Scale,
      details: "Authorized and regulated by the Solicitors Regulation Authority (SRA). Direct contractual engagement and SRA conflict checks are strictly required prior to casework execution."
    },
    {
      name: "Korea Town Foundation",
      role: "Organizes cultural public interest projects, K-Food promotion, and educational community support.",
      sector: "Hallyu Promotion & Cultural charity",
      classification: "Public-Interest Foundation",
      interest: "Public-Interest / Charity",
      icon: Award,
      details: "Operates cultural pop-ups and Korean food showcase programs to strengthen UK-Korean cultural ties. Relies on grants and volunteer networks."
    },
    {
      name: "Korean British Lawyers Association (KBLA)",
      role: "Professional legal networking, seminars, exchange initiatives, and mentoring for junior practitioners.",
      sector: "Professional Legal networking",
      classification: "Professional Association",
      interest: "Public-Interest / Networking",
      icon: UserCheck,
      details: "A membership body for legal professionals in the UK and Korea. Focuses on networking, knowledge-sharing, and does not accept client casework directly."
    },
    {
      name: "London Hallyu Festival",
      role: "Commercial cultural event organizer, ticketing, space rentals, sponsorships, and product display booths.",
      sector: "Commercial Events & Cultural fairs",
      classification: "Commercial Event promoter",
      interest: "Commercial Entity",
      icon: Globe,
      details: "Hosts annual K-culture showcases and matches Korean food/cosmetics exhibitors with retail buyers. Charging structures depend on booth scale."
    },
    {
      name: "British Korean Society (BKS)",
      role: "High-level bilateral forums on energy, defence, diplomacy, and industrial investments.",
      sector: "Strategic Bilateral networking",
      classification: "Bilateral Networking Society",
      interest: "Public-Interest / Non-Profit",
      icon: ShieldAlert,
      details: "Facilitates high-profile connections in strategic sectors (aerospace, defense, nuclear). Participation is open to corporate and government members."
    },
    {
      name: "Castletown Law",
      role: "Legal advisories on nuclear engineering supply chains, hydrogen grids, infrastructure procurement, and energy contracts.",
      sector: "Regulated Energy & Infrastructure Legal Advisory",
      classification: "Regulated Solicitors Firm",
      interest: "Commercial Entity",
      icon: HardHat,
      details: "Specialist legal practice advising on energy regulation, nuclear safety codes, and large-scale infrastructure joint ventures. Subject to conflict checks."
    },
    {
      name: "KEPCO Service Ltd",
      role: "Facilitates Korean energy technology transfers, grid construction feasibility, and aerospace logistics.",
      sector: "Energy Tech & Strategic Logistics support",
      classification: "Strategic Sector Support",
      interest: "Commercial Entity",
      icon: FileText,
      details: "Acts as a practical coordination liaison for Korean industrial contractors entering UK infrastructure supply chains."
    },
    {
      name: "K Smarthome Ltd",
      role: "Korean pre-fabricated housing modules, smart lighting grids, solar roofs, and energy-efficiency compliance checks.",
      sector: "Housing & Smart Home Technology",
      classification: "Housing & Technical Integration",
      interest: "Commercial Entity",
      icon: HelpCircle,
      details: "Provides engineering and distribution support for modular homes, smart grid controllers, and building regulations conformity."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Network Collaboration Ecosystem
        </h1>
        <p className="text-sm text-slate-450 max-w-2xl mx-auto leading-relaxed">
          K Biz Global Mentor unites regulated solicitors, commercial event planners, strategic energy technical groups, and non-profit associations under a unified diagnostic check.
        </p>
      </div>

      {/* Disclaimers banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-400 space-y-3">
        <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block">
          Ecosystem Boundaries & Triage Disclaimers
        </span>
        <p>
          Clients are hereby notified that each member organization operates under separate regulatory mandates. Referral routes from K Biz Global Mentor do not create joint liabilities or SRA class actions. Regulated legal work executed by Kim Partners Solicitors or Castletown Law is protected under individual professional indemnity insurance pools. Public promotional foundations (Korea Town Foundation) do not deliver commercial consultancies.
        </p>
        <p>
          Specialist warnings: Nuclear infrastructure projects, defence tech coordination, dual-use exports, sanctions, and national security investment screenings (UK NSIA) require formal contractual engagements prior to sharing any confidential diagrams or technical data.
        </p>
      </div>

      {/* Partners Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partnerDirectory.map((partner, idx) => {
          const Icon = partner.icon;
          return (
            <div 
              key={idx} 
              className="bg-slate-900/40 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 sm:p-8 space-y-4 transition-all hover:bg-slate-900/60"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-100 text-base">
                      {partner.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-semibold uppercase">
                      {partner.sector}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-wider text-slate-500 bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
                <div>
                  <span className="block text-[8px] text-slate-600 font-bold">Regulatory Class</span>
                  <span className="text-slate-300 font-extrabold">{partner.classification}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-600 font-bold">Interest Type</span>
                  <span className="text-slate-300 font-extrabold">{partner.interest}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {partner.role}
              </p>

              <div className="text-[11px] bg-slate-950/20 p-4 border border-slate-900 rounded-xl leading-relaxed text-slate-500">
                <span className="font-semibold text-slate-400 block mb-1">Operational Scope:</span>
                {partner.details}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
