"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage, LOCALE_NAMES, SUPPORTED_LOCALES } from "@/context/LanguageContext";
import { Globe, Menu, X, ChevronDown, Award } from "lucide-react";

export const Header: React.FC = () => {
  const { locale, t, changeLanguage, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/start-here`, label: t("nav.startHere") },
  ];

  const sectorLinks = [
    { href: `/${locale}/hallyu`, label: t("nav.hallyu") },
    { href: `/${locale}/trade`, label: t("nav.trade") },
    { href: `/${locale}/market-entry`, label: t("nav.entry") },
    { href: `/${locale}/resources`, label: t("nav.resources") },
  ];

  const legalSetupLinks = [
    { href: `/${locale}/contracts`, label: t("nav.contracts") },
    { href: `/${locale}/local-setup`, label: t("nav.setup") },
    { href: `/${locale}/disputes`, label: t("nav.disputes") },
  ];

  const partnerNetworkLinks = [
    { href: `/${locale}/partners`, label: t("nav.partners") },
    { href: `/${locale}/investment`, label: t("nav.investment") },
    { href: `/${locale}/for-associations`, label: t("nav.associations") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="p-2 rounded bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold shadow-md shadow-amber-500/20">
                🌐
              </span>
              <div className="flex flex-col text-left">
                <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  K BIZ
                </span>
                <span className="text-xs text-slate-400 font-semibold tracking-widest -mt-1 uppercase">
                  Global Mentor
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown 1: Sectors & Trade */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-amber-400 transition-colors py-2 cursor-pointer focus:outline-none">
                <span>{t("nav.trade")} & {t("nav.hallyu")}</span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-56 mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {sectorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown 2: Setup & Risks */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-amber-400 transition-colors py-2 cursor-pointer focus:outline-none">
                <span>{t("nav.setup")} & {t("nav.contracts")}</span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-56 mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {legalSetupLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown 3: Networks */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-amber-400 transition-colors py-2 cursor-pointer focus:outline-none">
                <span>{t("nav.partners")}</span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-60 mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {partnerNetworkLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Admin Console Direct Link */}
            <Link
              href={`/${locale}/admin`}
              className="hover:text-amber-400 transition-colors py-2 text-xs text-slate-450 border border-slate-800 rounded px-2 hover:border-amber-400/50"
            >
              {t("nav.admin")}
            </Link>
          </nav>

          {/* Language Picker & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Locale Picker Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-800 text-xs hover:border-amber-400 transition-colors focus:outline-none bg-slate-900/50 cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{LOCALE_NAMES[locale]}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              <div className={`absolute top-full ${isRtl ? "left-0" : "right-0"} mt-1 bg-slate-950 border border-slate-800 rounded-lg shadow-2xl py-1 w-48 max-h-80 overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 grid grid-cols-1 divide-y divide-slate-900`}>
                {SUPPORTED_LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => changeLanguage(loc)}
                    className={`block w-full text-left px-4 py-2.5 text-xs hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer ${
                      locale === loc ? "text-amber-400 font-bold bg-slate-900" : "text-slate-300"
                    }`}
                  >
                    {LOCALE_NAMES[loc]}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${locale}/diagnostic`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg font-bold text-xs bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/10 hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5"
            >
              {t("nav.diagnostic")}
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Compact Language selector icon button for mobile */}
            <div className="relative group">
              <button className="p-2 rounded border border-slate-800 hover:border-amber-400 text-slate-300 bg-slate-900/50 focus:outline-none">
                <Globe className="w-4 h-4 text-amber-400" />
              </button>
              <div className="absolute right-0 top-full mt-1 bg-slate-950 border border-slate-800 rounded-lg shadow-xl py-1 w-40 max-h-60 overflow-y-auto hidden group-hover:block z-50">
                {SUPPORTED_LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => changeLanguage(loc)}
                    className="block w-full text-left px-3 py-2 text-xs hover:bg-amber-400 hover:text-slate-950 transition-colors"
                  >
                    {LOCALE_NAMES[loc]}
                  </button>
                ))}
              </div>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-900 px-4 py-6 space-y-4 shadow-inner max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded text-base hover:bg-slate-900 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-2">
            <span className="block px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
              Sectors & Trade
            </span>
            {sectorLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-slate-900 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-2">
            <span className="block px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
              Setup & Risks
            </span>
            {legalSetupLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-slate-900 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-2">
            <span className="block px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
              Networks & Gov
            </span>
            {partnerNetworkLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-slate-900 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
            <Link
              href={`/${locale}/diagnostic`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2.5 rounded font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950"
            >
              {t("nav.diagnostic")}
            </Link>
            
            <Link
              href={`/${locale}/admin`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2 rounded text-xs border border-slate-800 text-slate-400 hover:border-amber-400"
            >
              {t("nav.admin")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
