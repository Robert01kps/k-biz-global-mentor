"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, AlertTriangle, Scale, Lock } from "lucide-react";

export const Footer: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-auto text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-500 text-slate-950 font-bold">🌐</span>
              <span className="text-md font-bold text-white uppercase tracking-wider">
                K Biz Global Mentor
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              An English-first, multilingual global business portal connecting overseas entrepreneurs and trade networks with specialized consultants, solicitors, public promotional foundations, and industrial coordinators.
            </p>
          </div>

          {/* Links 1 */}
          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[10px] text-slate-500">
              Ecosystem Routes
            </h4>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/partners`} className="hover:text-amber-400 transition-colors">
                Ecosystem Directory
              </Link>
              <Link href={`/${locale}/association-landing`} className="hover:text-amber-400 transition-colors">
                KITA & KBA Network
              </Link>
              <Link href={`/${locale}/diagnostic`} className="hover:text-amber-400 transition-colors">
                Diagnostic Tool
              </Link>
            </div>
          </div>

          {/* Links 2 */}
          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[10px] text-slate-500">
              Specialist Columns
            </h4>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/resources`} className="hover:text-amber-400 transition-colors">
                Business & Trade Manuals
              </Link>
              <Link href={`/${locale}/contracts`} className="hover:text-amber-400 transition-colors">
                Contracts & Deals Review
              </Link>
              <Link href={`/${locale}/disputes`} className="hover:text-amber-400 transition-colors">
                Dispute Resolution Desk
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimers & Legal Panel */}
        <div className="border-t border-slate-900 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-[11px] leading-relaxed text-slate-500">
          
          {/* Regulatory & No Advice */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-xs">
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              <span>Regulatory Classifications & Legal Advice Disclaimer</span>
            </div>
            <p>
              <strong>K Biz Global Mentor</strong> acts solely as a coordination, general information, and triage portal. Initial diagnostic outcomes and service recommendations do not constitute legal advice, tax advice, financial advice, or investment recommendation. No client-solicitor or fiduciary relationship is formed by submitting enquiries or reviewing automated diagnostic responses.
            </p>
            <p>
              Regulated legal services in the United Kingdom are provided exclusively by <strong>Kim Partners Solicitors</strong> (authorized and regulated by the Solicitors Regulation Authority - SRA) and infrastructure/regulatory legal support by <strong>Castletown Law</strong>. Non-regulated consulting is provided by <strong>Eurolegal Consulting</strong>. Public-interest promotional projects are operated under the <strong>Korea Town Foundation</strong>.
            </p>
          </div>

          {/* Specialist Warnings */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Specialist Sector Warnings & Sanctions Notices</span>
            </div>
            <p>
              Projects involving <strong>energy, infrastructure, defence, nuclear systems, dual-use technology, hydrogen power, and renewables</strong> are subject to intense regulatory controls. These include export control licensing, international sanctions compliance, public procurement screening, and investment vetting under national legislation (such as the UK National Security and Investment Act - NSIA, EU foreign direct investment screening rules, or US CFIUS).
            </p>
            <p>
              Users must not rely on the initial check to execute transactions in these sectors. Formal, written, specialized assessments must be commissioned through Castletown Law, KEPCO Service Ltd, or Kim Partners Solicitors prior to any binding contractual commitments.
            </p>
          </div>

        </div>

        {/* Controlling Language Statement */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-4 text-[11px] leading-relaxed text-slate-400 flex gap-3 items-start">
          <Shield className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p>
            <strong>English-First Controlling Language Clause:</strong> {t("disclaimer.controlling")}
          </p>
        </div>

        {/* Bottom Block */}
        <div className="border-t border-slate-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600">
          <p>
            {t("disclaimer.footerText")}
          </p>
          <div className="flex gap-4">
            <span>Powered by Trade Association & KITA Network</span>
            <span>•</span>
            <Link href={`/${locale}/admin`} className="hover:text-amber-500 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
