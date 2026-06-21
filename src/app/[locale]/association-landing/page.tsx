"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Building2, Users, FileText, ArrowRight, ShieldCheck, 
  MapPin, HelpCircle, GraduationCap, Network
} from "lucide-react";

export default function AssociationLandingPage() {
  const { locale, t } = useLanguage();

  const services = [
    { title: "Bilateral Trade Forums", desc: "Connecting buyers and sellers across South Korea, the UK, and Europe through structured roundtables.", icon: Users },
    { title: "Export Guide Library", desc: "Access to trade data manuals, product labeling regulations, customs codes, and export compliance documents.", icon: FileText },
    { title: "Public Support Desks", desc: "Coordinating with government bodies and associations to provide information updates and networking desks.", icon: Building2 },
    { title: "Regulatory Soft Landing", desc: "Guidance on local entity setups, corporate structuring advice, and SRA-regulated lawyer assignments.", icon: ShieldCheck }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 bg-slate-950 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent)] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-amber-400 font-bold uppercase tracking-widest">
            Connected with Trade Association & KITA Networks
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Korea-UK Trade & Business Association Portal
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Welcome to the dedicated landing page for KITA and KBA network members. We support Korean firms entering international markets and help overseas enterprises import Hallyu culture, cosmetics, electronics, and smart home solutions.
          </p>
          <div className="pt-4">
            <Link
              href={`/${locale}/diagnostic`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 rounded-xl font-bold text-xs transition-all shadow-lg"
            >
              <span>Launch Association Diagnostic Check</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Association Cooperation Programs
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            We offer public support structures to minimize export boundaries and connect businesses with regulated solicitors and strategic consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 flex gap-4 hover:border-slate-800 transition-colors"
              >
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit h-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-md font-bold text-slate-200">{svc.title}</h3>
                  <p className="text-xs text-slate-450 leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Alliance disclaimers */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-8 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Network className="w-4 h-4 text-amber-500" />
            <span>Referral Boundaries & Regulatory Disclaimers</span>
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Please note that K Biz Global Mentor operates as a triage gateway. Association staff are not authorized to give SRA-regulated legal opinions, commercial guarantees, or investment advice. Enquiries requiring formal legal opinions will be routed to Kim Partners Solicitors or Castletown Law in accordance with the user selections. We do not receive referral kickbacks, and all fees are billed independently by the engaged professional firm.
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            For critical matters regarding export controls, nuclear regulations, defence compliance, dual-use certifications, and investment screenings (NSIA), members are warned to immediately request a formal legal audit rather than relying on informational guides.
          </p>
        </div>
      </section>

    </div>
  );
}
