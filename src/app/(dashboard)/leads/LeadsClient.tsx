"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  businessType: string | null;
  status: string;
  source: string | null;
  notes: string | null;
  assignedToId: string | null;
  assignedTo: { id: string; name: string | null } | null;
  _count: { calls: number; demos: number };
  createdAt: string;
}

interface User {
  id: string;
  name: string | null;
  email: string;
}

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "DEMO_SCHEDULED", "DEMO_COMPLETED", "NEGOTIATION", "WON", "LOST"];
const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-purple-100 text-purple-800",
  DEMO_SCHEDULED: "bg-indigo-100 text-indigo-800",
  DEMO_COMPLETED: "bg-teal-100 text-teal-800",
  NEGOTIATION: "bg-orange-100 text-orange-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-red-100 text-red-800",
};

export default function LeadsClient({
  leads: initialLeads,
  users,
  isAdmin,
  currentUserId,
}: {
  leads: Lead[];
  users: User[];
  isAdmin: boolean;
  currentUserId: string;
}) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const filteredLeads = initialLeads.filter((lead) => {
    const matchesStatus = filterStatus === "ALL" || lead.status === filterStatus;
    const matchesSearch =
      search === "" ||
      `${lead.firstName} ${lead.lastName} ${lead.company} ${lead.email} ${lead.phone}`
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  async function handleAddLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        email: form.get("email"),
        phone: form.get("phone"),
        company: form.get("company"),
        businessType: form.get("businessType"),
        source: form.get("source"),
        assignedToId: form.get("assignedToId") || currentUserId,
      }),
    });
    setShowAddModal(false);
    router.refresh();
  }

  async function handleImport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const csvText = form.get("csv") as string;
    await fetch("/api/leads/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv: csvText }),
    });
    setShowImportModal(false);
    router.refresh();
  }

  async function handleStatusChange(leadId: string, status: string) {
    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">Leads</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Import CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
          >
            + Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm flex-1 max-w-xs"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
        >
          <option value="ALL">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray">Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Company</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Phone</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Assigned</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Calls</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Demos</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-dark">{lead.firstName} {lead.lastName}</p>
                  <p className="text-gray text-xs">{lead.email}</p>
                </td>
                <td className="px-6 py-4 text-dark">{lead.company || "—"}</td>
                <td className="px-6 py-4 text-dark">{lead.phone || "—"}</td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${statusColors[lead.status]}`}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-dark text-xs">{lead.assignedTo?.name || "Unassigned"}</td>
                <td className="px-6 py-4 text-dark">{lead._count.calls}</td>
                <td className="px-6 py-4 text-dark">{lead._count.demos}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <a
                      href={`/api/calls/dial?leadId=${lead.id}`}
                      className="text-primary hover:underline text-xs font-medium"
                      onClick={async (e) => {
                        e.preventDefault();
                        await fetch(`/api/calls/dial`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ leadId: lead.id }),
                        });
                        router.refresh();
                      }}
                    >
                      Call
                    </a>
                    <button
                      onClick={async () => {
                        const date = prompt("Schedule demo (YYYY-MM-DD HH:MM):");
                        if (!date) return;
                        await fetch("/api/demos", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ leadId: lead.id, scheduledAt: new Date(date).toISOString() }),
                        });
                        router.refresh();
                      }}
                      className="text-purple-600 hover:underline text-xs font-medium"
                    >
                      Demo
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray">
                  No leads found. Add your first lead or import a CSV.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-dark mb-6">Add Lead</h2>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">First Name *</label>
                  <input name="firstName" required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Last Name *</label>
                  <input name="lastName" required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Email</label>
                <input name="email" type="email" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                <input name="phone" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Company / Business Name</label>
                <input name="company" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Business Type</label>
                <select name="businessType" className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="">Select type</option>
                  <option value="barbershop">Barbershop</option>
                  <option value="hair-salon">Hair Salon</option>
                  <option value="nail-salon">Nail Salon</option>
                  <option value="massage">Massage Therapy</option>
                  <option value="med-spa">Med Spa</option>
                  <option value="tattoo">Tattoo Studio</option>
                  <option value="beauty">Beauty Studio</option>
                  <option value="wellness">Wellness Center</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Source</label>
                <input name="source" placeholder="e.g. Google, Referral, Cold Call" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              {isAdmin && users.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Assign To</label>
                  <select name="assignedToId" className="w-full px-3 py-2 border rounded-lg text-sm">
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name || u.email}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium">
                  Add Lead
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold text-dark mb-4">Import Leads from CSV</h2>
            <p className="text-gray text-sm mb-4">
              Paste CSV data with headers: firstName, lastName, email, phone, company, businessType, source
            </p>
            <form onSubmit={handleImport} className="space-y-4">
              <textarea
                name="csv"
                rows={10}
                required
                placeholder={`firstName,lastName,email,phone,company,businessType,source\nJohn,Smith,john@example.com,555-1234,Fresh Cuts,barbershop,Google`}
                className="w-full px-3 py-2 border rounded-lg text-sm font-mono"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium">
                  Import
                </button>
                <button type="button" onClick={() => setShowImportModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
