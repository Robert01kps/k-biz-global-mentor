"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FileText, Shield, Briefcase, Zap, Globe, ArrowRight,
  TrendingUp, Users, ShoppingCart, HelpCircle, FileCheck
} from "lucide-react";

export default function HomePage() {
  const { locale, t } = useLanguage();

  const businessSectors = [
    { title: t("nav.hallyu"), desc: "Entertainment, pop-up events, K-Pop coordination, commercial culture festivals.", icon: Zap },
    { title: t("nav.trade"), desc: "Import, export, customs clearance, and global distribution of Korean goods.", icon: ShoppingCart },
    { title: t("nav.entry"), desc: "Market research, partner/distributor search, and target marketing analysis.", icon: TrendingUp },
    { title: t("nav.setup"), desc: "Soft landing, local entity formation, office setups, and operations registration.", icon: Globe },
    { title: t("nav.contracts"), desc: "Deal review, risk mitigation analysis, and commercial agreement validation.", icon: FileCheck },
    { title: t("nav.disputes"), desc: "Cross-border litigation support, crisis intervention, and debt recovery.", icon: Shield },
  ];

  const partners = [
    { name: "Trade Association / KITA / KBA network", role: "Information, networking, and public support desks", type: "Information & Networking", classification: "Public-Interest" },
    { name: "Eurolegal Consulting", role: "Non-regulated business strategy, feasibility, and local consulting", type: "Business Consulting", classification: "Commercial" },
    { name: "Kim Partners Solicitors", role: "SRA-regulated legal services, immigration, and contractual dispute support", type: "Regulated Legal Support", classification: "Commercial" },
    { name: "Korea Town Foundation", role: "Public promotional events, K-Food cultural integration, and charity networking", type: "Public-Interest Promotional", classification: "Public-Interest" },
    { name: "Korean British Lawyers Association", role: "Professional legal networking, bilateral development, and forums", type: "Professional Networking", classification: "Public-Interest" },
    { name: "London Hallyu Festival", role: "Commercial event spaces, Korean food festivals, and product showcase stands", type: "Commercial Events", classification: "Commercial" },
    { name: "British Korean Society", role: "UK-Korea energy, defence, and high-level bilateral networking", type: "Strategic Networking", classification: "Public-Interest" },
    { name: "Castletown Law", role: "Practical infrastructure, energy project, and nuclear supply chain legal advisory", type: "Regulated Infrastructure Legal", classification: "Commercial" },
    { name: "KEPCO Service Ltd", role: "Korean energy tech support, defence collaboration, and infrastructure logistics", type: "Strategic Industry Support", classification: "Commercial" },
    { name: "K Smarthome Ltd", role: "Smart home technology, energy-efficient housing modules, and setup collaboration", type: "Housing & Smart Grid Collaboration", classification: "Commercial" }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 text-xs font-semibold text-amber-400 bg-slate-900/50 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            Global Multilingual Business Portal
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t("hero.title")}
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t("hero.body")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href={`/${locale}/diagnostic`}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/15 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5"
            >
              {t("hero.ctaDiagnostic")}
            </Link>
            <Link
              href={`/${locale}/partners`}
              className="w-full sm:w-auto px-8 py-4 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 text-slate-200 rounded-xl font-semibold text-sm transition-all"
            >
              {t("hero.ctaServices")}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Support Categories & Service Sectors
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            From cultural Hallyu launches to regulated trade operations, infrastructure investments, and international litigation disputes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessSectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <div 
                key={i} 
                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-400/40 hover:bg-slate-900/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                  {sector.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {sector.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners Ecosystem Directory */}
      <section className="bg-slate-900/10 backdrop-blur-sm border-y border-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ecosystem Collaboration Network
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Our network strictly distinguishes commercial actions, professional networking, strategic sector support, and SRA-regulated services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-4 hover:border-slate-800 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    {partner.type}
                  </span>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                    partner.classification === "Public-Interest" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {partner.classification}
                  </span>
                </div>
                
                <h4 className="text-sm font-bold text-slate-200 leading-tight">
                  {partner.name}
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {partner.role}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              href={`/${locale}/partners`}
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold group"
            >
              <span>View detailed partner services and regulatory licenses</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* General Entry Level Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Which Business Level Fits You?
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Our auto-routing engine routes enquiries to specific experts depending on your readiness level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-2">
            <span className="text-2xl">🌱</span>
            <h4 className="font-bold text-sm text-slate-200">1. Explorer</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Evaluating feasibility, learning business basics, and researching market opportunities.</p>
          </div>
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-2">
            <span className="text-2xl">🚀</span>
            <h4 className="font-bold text-sm text-slate-200">2. Starter / Builder</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Actively setting up trade channels, establishing local presence, or launching a Hallyu brand.</p>
          </div>
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-2">
            <span className="text-2xl">📈</span>
            <h4 className="font-bold text-sm text-slate-200">3. Scale-Up</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Securing strategic partnerships, sourcing venture investment, and expanding operations.</p>
          </div>
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-2">
            <span className="text-2xl">🛡️</span>
            <h4 className="font-bold text-sm text-slate-200">4. Protector</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Resolving cross-border disputes, recovering unpaid debts, or mitigating agreement risks.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
