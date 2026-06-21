"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Compass, Zap, ShoppingBag, ArrowUpRight, Scale, 
  MapPin, HelpCircle, BookOpen, Settings, PhoneCall,
  Briefcase, ShieldAlert, AlertTriangle
} from "lucide-react";

interface PlaceholderProps {
  pageKey: string;
}

const ICONS: Record<string, any> = {
  "start-here": Compass,
  hallyu: Zap,
  trade: ShoppingBag,
  "market-entry": ArrowUpRight,
  investment: Briefcase,
  contracts: Scale,
  "local-setup": MapPin,
  disputes: ShieldAlert,
  resources: BookOpen,
  "for-associations": Settings,
  contact: PhoneCall
};

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ pageKey }) => {
  const { locale, t } = useLanguage();
  const Icon = ICONS[pageKey] || HelpCircle;

  // Dynamically build titles and contents based on the route key
  const detailsMap: Record<string, { title: string; desc: string; list: string[]; warnings?: string }> = {
    "start-here": {
      title: "Start Here: Global Overseas Business Guide",
      desc: "Welcome to the global business starter dashboard. We outline key methodologies for Korean businesses heading to international markets and international buyers looking to purchase Korean goods.",
      list: [
        "Phase 1: Market research and compliance feasibility reviews",
        "Phase 2: Contract negotiations and deal structuring risk mitigation",
        "Phase 3: Setting up local entities, office spaces, and visas",
        "Phase 4: Scaling up operations through bilateral trade association networks"
      ]
    },
    hallyu: {
      title: "Hallyu & K-Culture Commerce Desk",
      desc: "Korean cultural exports (K-Pop, K-Drama, webtoons, Korean language courses) represent major commercial projects.",
      list: [
        "Festival and commercial concert logistics support",
        "Coordinating with the London Hallyu Festival and Korea Town Foundation",
        "Intellectual property licensing agreements and trademark filings",
        "Pop-up showcase booth arrangements and sponsorships"
      ],
      warnings: "Commercial Hallyu promotions are distinct from non-commercial cultural networking. Tax implications and licensing requirements apply to commercial tickets sales."
    },
    trade: {
      title: "Products & Trade: Exporting Korean Goods",
      desc: "We coordinate with KITA networks to streamline international imports and exports of Korean food (K-Food), cosmetics (K-Beauty), and household products.",
      list: [
        "Product labeling compliance and ingredient checking",
        "Customs clearances and tariff optimization guides",
        "Distributor vetting and supplier matching desks",
        "Logistics, freight forwarding, and warehousing agreements"
      ],
      warnings: "Sanctions checks, dual-use technology reviews, and customs licensing audits must be performed for advanced engineering equipment."
    },
    "market-entry": {
      title: "Market Entry & Feasibility Services",
      desc: "Comprehensive business strategy advisory operated via Eurolegal Consulting to identify your ideal target market.",
      list: [
        "Feasibility studies and customer surveys",
        "Competitor profiling and local pricing analysis",
        "Buyer matching and cold-outreach validation checks",
        "Bilateral trade association networking intros"
      ]
    },
    investment: {
      title: "Investment Vetting & Capital Partnerships",
      desc: "Facilitating corporate collaboration, strategic joint ventures, and capital investments between South Korean and UK/EU enterprises.",
      list: [
        "Joint venture structuring and equity distribution checks",
        "Sourcing bilateral venture capital partnerships",
        "Due diligence coordination",
        "Compliance checks on public investment regulations"
      ],
      warnings: "Foreign direct investments in infrastructure, defence, or energy may trigger security reviews under the UK National Security and Investment Act (NSIA)."
    },
    contracts: {
      title: "Contracts & Commercial Deal Risk Review",
      desc: "Avoid business pitfalls by securing professional, regulated review of all commercial trade agreements.",
      list: [
        "Drafting trade sales contracts and distributor terms",
        "Regulated legal agreement audits via Kim Partners Solicitors",
        "Reviewing intellectual property clauses and liability caps",
        "Translating contract intents between English and Korean"
      ],
      warnings: "Legal contract drafting must be done by SRA-authorized solicitors. Diagnostic recommendations do not act as an execution waiver."
    },
    "local-setup": {
      title: "Local Setup & Soft Landing Assistance",
      desc: "Establishing a physical or corporate footprint in your destination country.",
      list: [
        "Local subsidiary or branch incorporation documents",
        "Visa applications and director sponsorship support",
        "Office lease contract negotiations",
        "Integrating smarthome and modular housing via K Smarthome Ltd"
      ]
    },
    disputes: {
      title: "Dispute Resolution & Unpaid Debt Recovery",
      desc: "Managing commercial crises, contract breaches, and debt defaults in overseas jurisdictions.",
      list: [
        "Assessing breach of contract liabilities",
        "Regulated litigation support via Kim Partners Solicitors",
        "Cross-border debt collection and enforcement procedures",
        "Alternative Dispute Resolution (ADR) and mediation"
      ],
      warnings: "Litigation contains major financial risk. You must secure formal SRA advice prior to initiating any court actions."
    },
    resources: {
      title: "Trade & Compliance Resource Library",
      desc: "Access business checklists, regulatory whitepapers, and step-by-step guides.",
      list: [
        "K-Food labeling guidelines & UK/EU REACH compliance files",
        "SRA legal columns and cross-border litigation updates",
        "Bilateral trade association newsletters",
        "Dual-use export control checks and sanctions lookup guides"
      ]
    },
    "for-associations": {
      title: "For Chambers & Trade Associations",
      desc: "Dedicated solutions for KITA chapters, KBA networks, and public interest promotional bodies.",
      list: [
        "Coordinating dynamic trade delegation meetings",
        "Cooperation desks matching SRA solicitors and consulting networks",
        "Multilingual custom routing configuration",
        "Bilateral public interest cultural campaigns"
      ]
    },
    contact: {
      title: "Contact Coordination Office",
      desc: "Reach out to the K Biz Global Mentor central coordination desk.",
      list: [
        "Submit support requests for specific ecosystem members",
        "Report technical issues on the diagnostic system",
        "General enquiry management",
        "Request association membership application papers"
      ]
    }
  };

  const pageDetail = detailsMap[pageKey] || {
    title: "Information Guide Page",
    desc: "Detailed global business guides for international trade.",
    list: []
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      
      {/* Header card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl w-fit">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {pageDetail.title}
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              K Biz Global Mentor • {pageKey}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {pageDetail.desc}
        </p>

        {/* List points */}
        {pageDetail.list.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Core Services & Focus Areas
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pageDetail.list.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specialist Warning Section */}
        {pageDetail.warnings && (
          <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-500">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-400 block mb-1">Compliance & Specialist Warnings</strong>
              {pageDetail.warnings}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-left">
            <span>To request direct support in this sector, run a diagnostic triage check.</span>
          </div>
          <Link
            href={`/${locale}/diagnostic`}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 text-xs font-bold rounded-lg shadow transition-all text-center"
          >
            Start Diagnostic Check
          </Link>
        </div>

      </div>

    </div>
  );
};
export default PlaceholderPage;
