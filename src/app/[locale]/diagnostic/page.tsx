"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FileText, Shield, User, Landmark, HelpCircle, 
  CheckCircle, AlertCircle, RefreshCw, AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Zod Validation Schema
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().min(2, "Please enter your country"),
  website: z.string().optional(),
  userLevel: z.string(),
  userType: z.string(),
  businessArea: z.array(z.string()).min(1, "Please select at least one business area"),
  goal: z.array(z.string()).min(1, "Please select at least one goal"),
  targetMarket: z.array(z.string()).min(1, "Please select at least one target market"),
  currentStatus: z.string(),
  supportType: z.array(z.string()).min(1, "Please select at least one support type"),
  documentsAvailable: z.array(z.string()).optional(),
  mainQuestion: z.string().min(10, "Please describe your question in at least 10 characters"),
  urgency: z.string(),
  consent1: z.boolean().refine((val) => val === true, "This consent is required"),
  consent2: z.boolean().refine((val) => val === true, "This consent is required"),
  consent3: z.boolean().refine((val) => val === true, "This consent is required"),
  consent4: z.boolean().refine((val) => val === true, "This consent is required"),
  consent5: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DiagnosticPage() {
  const { locale, t, isRtl } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userLevel: "Not sure",
      userType: "Individual",
      businessArea: [],
      goal: [],
      targetMarket: [],
      currentStatus: "Just an idea",
      supportType: [],
      documentsAvailable: [],
      urgency: "General enquiry",
      consent1: false,
      consent2: false,
      consent3: false,
      consent4: false,
      consent5: false,
    },
  });

  const selectedBusinessAreas = watch("businessArea") || [];
  const selectedGoals = watch("goal") || [];
  const selectedTargetMarkets = watch("targetMarket") || [];
  const selectedSupportTypes = watch("supportType") || [];
  const selectedDocuments = watch("documentsAvailable") || [];

  const handleCheckboxChange = (fieldName: keyof FormData, value: string) => {
    const currentValues = watch(fieldName) as string[];
    if (currentValues.includes(value)) {
      setValue(fieldName, currentValues.filter((v) => v !== value) as any);
    } else {
      setValue(fieldName, [...currentValues, value] as any);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          ...data,
          selectedLanguage: locale,
        }),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error || "Failed to submit diagnostic form.");
      }

      setSuccessData(resJson);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    const routing = successData.routing;
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 space-y-8 relative overflow-hidden shadow-2xl">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

          <div className="text-center space-y-3">
            <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-full">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t("success.title")}
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl mx-auto">
              {t("success.body")}
            </p>
          </div>

          {/* Details Table */}
          <div className="border border-slate-800 rounded-xl divide-y divide-slate-800 bg-slate-950/50 text-xs">
            <div className="flex justify-between items-center p-4">
              <span className="text-slate-500 font-medium">{t("success.enquiryId")}</span>
              <span className="text-slate-200 font-bold bg-slate-800 px-3 py-1 rounded">
                {successData.enquiryId}
              </span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="text-slate-500 font-medium">{t("success.assignedTo")}</span>
              <span className="text-amber-400 font-extrabold text-right">
                {routing.assignedOrganisation}
              </span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="text-slate-500 font-medium">{t("success.package")}</span>
              <span className="text-slate-200 font-semibold">{routing.serviceRoute}</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="text-slate-500 font-medium">{t("success.classification")}</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase tracking-wider text-slate-300 border border-slate-700">
                  {routing.regulatedClassification}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase tracking-wider text-slate-300 border border-slate-700">
                  {routing.interestClassification}
                </span>
              </div>
            </div>
          </div>

          {/* Required Actions / Warnings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Compliance & Security Verification Alerts</span>
            </h4>
            <div className="space-y-2.5 text-[11px] leading-relaxed text-slate-400">
              
              {routing.conflictCheckRequired && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Conflict Check Required:</strong> As this request involves regulated legal consulting, Kim Partners Solicitors or Castletown Law must run formal conflict database checks to ensure they do not represent opposing parties in your matters before executing any contract.
                  </p>
                </div>
              )}

              {routing.kycRequired && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Know-Your-Client (KYC) Identity Check:</strong> Compliance regulations mandate identity verification (passport copy, company register certificates) prior to delivery of specialized legal analysis.
                  </p>
                </div>
              )}

              {routing.referralDisclosureRequired && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Referral Disclosure & Boundaries notice:</strong> K Biz Global Mentor operates under reciprocal referral arrangements. Enquiries mapped to commercial consultancies (Eurolegal, Castletown Law, London Hallyu Festival) are managed independently of the trade association core programs.
                  </p>
                </div>
              )}

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex gap-2">
                <AlertTriangle className="w-4 h-4 text-slate-450 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Energy & Defense Notice:</strong> Special controls apply if your business touches nuclear engineering, defence infrastructure, sanctions screening, or public procurement. Keep documents ready for export compliance audits.
                </p>
              </div>

            </div>
          </div>

          {/* Next Steps Description */}
          <div className="space-y-2 border-t border-slate-800 pt-6">
            <h4 className="font-bold text-sm text-slate-200">{t("success.nextSteps")}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("success.nextStepsBody")}
            </p>
          </div>

          <div className="text-center pt-4">
            <Link
              href={`/${locale}`}
              className="inline-flex justify-center items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              {t("success.buttonHome")}
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Options Definitions
  const levelOptions = [
    { value: "Explorer", label: "🌱 Explorer (Feasibility check / learning basics)" },
    { value: "Starter", label: "🚀 Starter (Establishing local setup / launching trade)" },
    { value: "Builder", label: "🏗️ Builder (Operating and expanding existing trade/business)" },
    { value: "Scale-up", label: "📈 Scale-up (Seeking institutional partners / funding)" },
    { value: "Protector", label: "🛡️ Protector (Dealing with commercial disputes or contract risk)" },
    { value: "Not sure", label: "❓ Not sure" }
  ];

  const entityOptions = [
    { value: "Individual", label: "Individual entrepreneur / explorer" },
    { value: "Startup", label: "Startup company" },
    { value: "SME", label: "SME / Private Company" },
    { value: "Large Enterprise", label: "Large Enterprise / Multinational" },
    { value: "Association", label: "Trade Association / Business chamber" },
    { value: "Government / public body", label: "Government / Public body" },
    { value: "Other", label: "Other entity type" }
  ];

  const sectorOptions = [
    "K-Food", "K-Beauty / cosmetics", "Korean culture / events", "K-Pop / entertainment",
    "Korean language / education", "Energy and infrastructure", "Technology / software",
    "General imports / exports", "Services", "Other"
  ];

  const goalOptions = [
    "Learn the basics", "Find a market", "Find a buyer", "Find a supplier", "Find a distributor",
    "Find a business partner", "Review a contract", "Resolve a dispute", "Recover unpaid debt",
    "Run an event or pop-up", "Work with an association or government body", "Other"
  ];

  const marketOptions = [
    "United Kingdom", "South Korea", "European Union", "United States", "South East Asia", "Middle East", "Rest of the World"
  ];

  const statusOptions = [
    { value: "Just an idea", label: "Just an idea / planning" },
    { value: "Research phase", label: "Actively researching / doing market testing" },
    { value: "Ready to launch", label: "Ready to launch within 3 months" },
    { value: "Already operating", label: "Already operating in target market" },
    { value: "Facing difficulties / disputes", label: "Currently facing commercial or legal disputes" },
    { value: "Other", label: "Other status" }
  ];

  const supportOptions = [
    "General information and networking", "Overseas business consulting", "Market research",
    "Buyer / distributor / partner search", "Contract review or legal risk", "Dispute, debt recovery or litigation support",
    "Hallyu or Korean culture promotion", "Korean food promotion", "Event, festival or pop-up collaboration",
    "Legal professional networking", "UK-Korea strategic networking", "Energy sector networking or forum",
    "Defence or strategic industry networking", "Energy project practical support",
    "Defence-related collaboration practical support", "Infrastructure project support",
    "Nuclear, hydrogen or renewables collaboration", "Export control, sanctions or strategic project risk review",
    "Housing, smart home or energy-efficiency collaboration", "Association or government programme", "Other"
  ];

  const documentOptions = [
    "Pitch deck", "Business plan", "Product specifications", "Financial statements", "Draft contracts",
    "Dispute summaries", "Import/Export licenses", "Certificate of incorporation", "None", "Other"
  ];

  const urgencyOptions = [
    { value: "General enquiry", label: "General information / no fixed deadline" },
    { value: "Planning for next 6 months", label: "Planning to execute within next 6 months" },
    { value: "Launching within 3 months", label: "Executing project starting within next 3 months" },
    { value: "Immediate action required", label: "⚠️ Immediate action required (deadlines, disputes or crises)" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t("form.title")}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t("form.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-10 shadow-2xl backdrop-blur-sm">
        
        {/* Section 1: Contact Information */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>1. Contact Details & Background</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.fullName")} *</label>
              <input 
                {...register("name")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Robert Kim"
              />
              {errors.name && <p className="text-[11px] text-red-400">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.email")} *</label>
              <input 
                {...register("email")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-left"
                placeholder="example@k-biz.com"
              />
              {errors.email && <p className="text-[11px] text-red-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.company")}</label>
              <input 
                {...register("company")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.jobTitle")}</label>
              <input 
                {...register("jobTitle")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.phone")}</label>
              <input 
                {...register("phone")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-left"
                placeholder="+44 7700 900077"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.country")} *</label>
              <input 
                {...register("country")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="United Kingdom or South Korea"
              />
              {errors.country && <p className="text-[11px] text-red-400">{errors.country.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-350">{t("form.website")}</label>
              <input 
                {...register("website")}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-left"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Business Profile */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span>2. Business Profiling</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Level */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">{t("form.userLevel")} *</label>
              <div className="space-y-2">
                {levelOptions.map((opt) => (
                  <label key={opt.value} className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                    <input 
                      type="radio" 
                      value={opt.value} 
                      {...register("userLevel")}
                      className="mt-0.5 accent-amber-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Entity Type */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">{t("form.userType")} *</label>
              <div className="space-y-2">
                {entityOptions.map((opt) => (
                  <label key={opt.value} className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                    <input 
                      type="radio" 
                      value={opt.value} 
                      {...register("userType")}
                      className="mt-0.5 accent-amber-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Business Area (Checkboxes) */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">{t("form.businessArea")} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sectorOptions.map((sec) => (
                  <label key={sec} className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-800 bg-slate-950/20 hover:border-slate-700 cursor-pointer text-xs text-slate-400 hover:text-slate-250">
                    <input 
                      type="checkbox"
                      checked={selectedBusinessAreas.includes(sec)}
                      onChange={() => handleCheckboxChange("businessArea", sec)}
                      className="accent-amber-500 rounded"
                    />
                    <span>{sec}</span>
                  </label>
                ))}
              </div>
              {errors.businessArea && <p className="text-[11px] text-red-400">{errors.businessArea.message}</p>}
            </div>

            {/* Goal (Checkboxes) */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">{t("form.goal")} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goalOptions.map((g) => (
                  <label key={g} className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-800 bg-slate-950/20 hover:border-slate-700 cursor-pointer text-xs text-slate-400 hover:text-slate-250">
                    <input 
                      type="checkbox"
                      checked={selectedGoals.includes(g)}
                      onChange={() => handleCheckboxChange("goal", g)}
                      className="accent-amber-500 rounded"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {errors.goal && <p className="text-[11px] text-red-400">{errors.goal.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Readiness & Needs */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>3. Market Readiness & Project Requirements</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Target Market */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">{t("form.targetMarket")} *</label>
              <div className="flex flex-wrap gap-3">
                {marketOptions.map((m) => (
                  <label key={m} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-800 hover:border-slate-700 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                    <input 
                      type="checkbox"
                      checked={selectedTargetMarkets.includes(m)}
                      onChange={() => handleCheckboxChange("targetMarket", m)}
                      className="accent-amber-500 rounded"
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
              {errors.targetMarket && <p className="text-[11px] text-red-400">{errors.targetMarket.message}</p>}
            </div>

            {/* Current Readiness Status */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">{t("form.currentStatus")} *</label>
              <div className="space-y-2">
                {statusOptions.map((opt) => (
                  <label key={opt.value} className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                    <input 
                      type="radio" 
                      value={opt.value} 
                      {...register("currentStatus")}
                      className="mt-0.5 accent-amber-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Urgency */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">{t("form.urgency")} *</label>
              <div className="space-y-2">
                {urgencyOptions.map((opt) => (
                  <label key={opt.value} className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200">
                    <input 
                      type="radio" 
                      value={opt.value} 
                      {...register("urgency")}
                      className="mt-0.5 accent-amber-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Support Type Requested */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">{t("form.supportType")} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {supportOptions.map((s) => (
                  <label key={s} className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-800 bg-slate-950/20 hover:border-slate-700 cursor-pointer text-xs text-slate-400 hover:text-slate-250">
                    <input 
                      type="checkbox"
                      checked={selectedSupportTypes.includes(s)}
                      onChange={() => handleCheckboxChange("supportType", s)}
                      className="accent-amber-500 rounded"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              {errors.supportType && <p className="text-[11px] text-red-400">{errors.supportType.message}</p>}
            </div>

            {/* Documents Available */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">{t("form.documents")}</label>
              <div className="flex flex-wrap gap-3">
                {documentOptions.map((d) => (
                  <label key={d} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-800 text-xs text-slate-450 hover:border-slate-750 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedDocuments.includes(d)}
                      onChange={() => handleCheckboxChange("documentsAvailable", d)}
                      className="accent-amber-500 rounded"
                    />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Textarea Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">{t("form.mainQuestion")} *</label>
              <textarea 
                {...register("mainQuestion")}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="I want to export K-Food items to the UK. We need consulting on product labelling and compliance rules."
              />
              {errors.mainQuestion && <p className="text-[11px] text-red-400">{errors.mainQuestion.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 4: Legal Consent & Specialized Disclaimers */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>4. Regulatory Consents & Warranties</span>
          </h3>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
              Mandatory Legal Disclaimers & Guidelines
            </span>
            <div className="space-y-4 text-slate-400 text-xs leading-relaxed">
              <label className="flex items-start gap-3 cursor-pointer hover:text-slate-200">
                <input 
                  type="checkbox" 
                  {...register("consent1")}
                  className="mt-1 accent-amber-500" 
                />
                <p>{t("form.consent1")} *</p>
              </label>
              {errors.consent1 && <p className="text-[11px] text-red-400 -mt-2">{errors.consent1.message}</p>}

              <label className="flex items-start gap-3 cursor-pointer hover:text-slate-200">
                <input 
                  type="checkbox" 
                  {...register("consent2")}
                  className="mt-1 accent-amber-500" 
                />
                <p>{t("form.consent2")} *</p>
              </label>
              {errors.consent2 && <p className="text-[11px] text-red-400 -mt-2">{errors.consent2.message}</p>}

              <label className="flex items-start gap-3 cursor-pointer hover:text-slate-200">
                <input 
                  type="checkbox" 
                  {...register("consent3")}
                  className="mt-1 accent-amber-500" 
                />
                <p>{t("form.consent3")} *</p>
              </label>
              {errors.consent3 && <p className="text-[11px] text-red-400 -mt-2">{errors.consent3.message}</p>}

              <label className="flex items-start gap-3 cursor-pointer hover:text-slate-200">
                <input 
                  type="checkbox" 
                  {...register("consent4")}
                  className="mt-1 accent-amber-500" 
                />
                <p>{t("form.consent4")} *</p>
              </label>
              {errors.consent4 && <p className="text-[11px] text-red-400 -mt-2">{errors.consent4.message}</p>}

              <label className="flex items-start gap-3 cursor-pointer hover:text-slate-200">
                <input 
                  type="checkbox" 
                  {...register("consent5")}
                  className="mt-1 accent-amber-500" 
                />
                <p>{t("form.consent5")}</p>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {submitError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 disabled:opacity-50 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2 mx-auto"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t("form.processing")}</span>
              </>
            ) : (
              <span>{t("form.submitBtn")}</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
