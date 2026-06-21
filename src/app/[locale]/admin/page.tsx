"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Lock, Eye, FileSpreadsheet, RefreshCw, Filter, 
  Users, CheckSquare, Tag, ShieldCheck, AlertCircle
} from "lucide-react";

export default function AdminPage() {
  const { locale } = useLanguage();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modal edit fields
  const [statusVal, setStatusVal] = useState("New");
  const [notesVal, setNotesVal] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setAuthError("Please enter the admin password.");
      return;
    }
    fetchEnquiries(password);
  };

  const fetchEnquiries = async (passKey: string) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await fetch("/api/enquiries", {
        headers: {
          "Authorization": `Bearer ${passKey}`,
        },
      });

      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson.error || "Failed to load enquiries");
      }

      const data = await response.json();
      setEnquiries(data);
      setIsAuthenticated(true);
      // Save password in session storage for refreshing
      sessionStorage.setItem("kbiz_admin_pass", passKey);
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPass = sessionStorage.getItem("kbiz_admin_pass");
    if (savedPass) {
      setPassword(savedPass);
      fetchEnquiries(savedPass);
    }
  }, []);

  const handleUpdateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setUpdatingId(selectedEnquiry.id);
    try {
      const response = await fetch("/api/enquiries/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`
        },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: statusVal,
          notes: notesVal
        })
      });

      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson.error || "Failed to update record");
      }

      const updatedRes = await response.json();
      
      // Update local state
      setEnquiries(prev => prev.map(item => item.id === selectedEnquiry.id ? updatedRes.updatedRecord : item));
      setSelectedEnquiry(updatedRes.updatedRecord);
      alert("Enquiry updated successfully.");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kbiz_admin_pass");
    setIsAuthenticated(false);
    setPassword("");
    setEnquiries([]);
  };

  const handleOpenDetail = (record: any) => {
    setSelectedEnquiry(record);
    setStatusVal(record.status || "New");
    setNotesVal(record.notes || "");
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === "New").length,
    reviewed: enquiries.filter(e => e.status === "Reviewed").length,
    resolved: enquiries.filter(e => e.status === "Resolved").length,
    regulated: enquiries.filter(e => e.regulatedClassification === "Regulated").length,
    commercial: enquiries.filter(e => e.interestClassification === "Commercial").length
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-amber-500/10 text-amber-400 rounded-full">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
              Admin Console Gate
            </h2>
            <p className="text-xs text-slate-500">
              Access the administrative database panel. Enter authorization credentials to view diagnostic records.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[11px] uppercase font-bold tracking-widest text-slate-400">
                Admin Password
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 text-center text-slate-100"
                placeholder="••••••••••••"
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-400 text-center font-semibold">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              {loading ? "Authenticating..." : "Authorize access"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Administrative Console
          </h1>
          <p className="text-xs text-slate-500">
            Secure client diagnostic log and routing assignments directory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/api/enquiries/export?password=${encodeURIComponent(password)}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-850 bg-slate-900 text-xs font-bold text-slate-200 rounded-lg hover:border-amber-400 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 text-xs font-bold rounded-lg text-slate-350 hover:bg-slate-700 transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total</span>
          <span className="text-2xl font-black text-white">{stats.total}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">New</span>
          <span className="text-2xl font-black text-amber-400">{stats.new}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Reviewed</span>
          <span className="text-2xl font-black text-blue-400">{stats.reviewed}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Resolved</span>
          <span className="text-2xl font-black text-emerald-400">{stats.resolved}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Regulated</span>
          <span className="text-2xl font-black text-indigo-400">{stats.regulated}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Commercial</span>
          <span className="text-2xl font-black text-rose-400">{stats.commercial}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Panel */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 lg:col-span-2 overflow-x-auto">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Enquiries Database</span>
          </h3>

          <table className="w-full text-[11px] text-left border-collapse text-slate-400 min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-850 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Assigned Partner</th>
                <th className="py-3 px-2">Class</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-600 font-medium">
                    No diagnostic submission records found.
                  </td>
                </tr>
              ) : (
                enquiries.map((record) => (
                  <tr 
                    key={record.id} 
                    className={`hover:bg-slate-900/30 transition-colors ${
                      selectedEnquiry?.id === record.id ? "bg-slate-900/40" : ""
                    }`}
                  >
                    <td className="py-3.5 px-2">
                      {new Date(record.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-2 font-bold text-slate-200">
                      {record.name}
                      {record.company && (
                        <span className="block font-normal text-[10px] text-slate-500">
                          {record.company}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-2 font-medium text-amber-400">
                      {record.assignedOrganisation}
                    </td>
                    <td className="py-3.5 px-2">
                      <span className="block text-[9px] text-slate-500 font-semibold">
                        {record.regulatedClassification}
                      </span>
                      <span className="block text-[9px] text-slate-500">
                        {record.interestClassification}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        record.status === "New" ? "bg-amber-500/10 text-amber-450 border border-amber-500/20" :
                        record.status === "Reviewed" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => handleOpenDetail(record)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-350 hover:text-amber-400 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Details Side Panel / Edit Panel */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 h-fit space-y-6">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest border-b border-slate-900 pb-2">
            Details Panel
          </h3>

          {!selectedEnquiry ? (
            <p className="text-xs text-slate-550 italic py-6 text-center">
              Select an enquiry from the table to view details.
            </p>
          ) : (
            <div className="space-y-6 text-xs leading-relaxed">
              
              {/* Profile Block */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Enquirer Profile
                </span>
                <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-900">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ID</span>
                    <span className="font-bold text-slate-300">{selectedEnquiry.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name</span>
                    <span className="font-bold text-slate-300">{selectedEnquiry.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email</span>
                    <span className="text-slate-350 hover:underline">{selectedEnquiry.email}</span>
                  </div>
                  {selectedEnquiry.phone && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone</span>
                      <span className="text-slate-300">{selectedEnquiry.phone}</span>
                    </div>
                  )}
                  {selectedEnquiry.company && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Company</span>
                      <span className="text-slate-300">{selectedEnquiry.company}</span>
                    </div>
                  )}
                  {selectedEnquiry.website && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Website</span>
                      <a href={selectedEnquiry.website} target="_blank" rel="noreferrer" className="text-amber-400 truncate max-w-[150px] hover:underline">
                        {selectedEnquiry.website}
                      </a>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Country</span>
                    <span className="text-slate-300">{selectedEnquiry.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Submit Lang</span>
                    <span className="text-slate-300 uppercase font-bold">{selectedEnquiry.selectedLanguage}</span>
                  </div>
                </div>
              </div>

              {/* Selections details */}
              <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-900/60">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">User Level</span>
                  <p className="text-slate-300 font-medium">{selectedEnquiry.userLevel}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Business Areas</span>
                  <p className="text-slate-300 font-medium">{selectedEnquiry.businessArea?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Goals</span>
                  <p className="text-slate-300 font-medium">{selectedEnquiry.goal?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Markets</span>
                  <p className="text-slate-300 font-medium">{selectedEnquiry.targetMarket?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Requested Support</span>
                  <p className="text-slate-300 font-medium">{selectedEnquiry.supportType?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">Main question & Help requested</span>
                  <p className="text-slate-350 p-2.5 bg-slate-950 border border-slate-900 rounded-lg whitespace-pre-wrap mt-1 leading-relaxed">
                    {selectedEnquiry.mainQuestion}
                  </p>
                </div>
              </div>

              {/* Triage Routing Results */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Triage Assignment Results
                </span>
                <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-900 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Team</span>
                    <span className="font-extrabold text-amber-400">{selectedEnquiry.assignedOrganisation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Route Package</span>
                    <span className="text-slate-300">{selectedEnquiry.serviceRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Classification</span>
                    <span className="text-slate-300">{selectedEnquiry.regulatedClassification} • {selectedEnquiry.interestClassification}</span>
                  </div>
                </div>
              </div>

              {/* Admin Note Form */}
              <form onSubmit={handleUpdateRecord} className="space-y-4 pt-2 border-t border-slate-900">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Update Enquiry Log
                </span>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block">Status</label>
                  <select
                    value={statusVal}
                    onChange={(e) => setStatusVal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-2 text-slate-300 focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold block">Internal Comments / Notes</label>
                  <textarea
                    value={notesVal}
                    onChange={(e) => setNotesVal(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-900 rounded p-2 text-slate-300 focus:outline-none text-[11px] leading-relaxed"
                    placeholder="Log client communications, conflict results, or partner followups..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={updatingId !== null}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  {updatingId ? "Saving changes..." : "Save details"}
                </button>
              </form>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
