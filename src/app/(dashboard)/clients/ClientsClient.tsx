"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  businessName: string;
  contactName: string;
  email: string | null;
  phone: string | null;
  businessType: string | null;
  plan: string | null;
  monthlyValue: number;
  status: string;
  notes: string | null;
  startDate: string;
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  PAUSED: "bg-yellow-100 text-yellow-800",
  CHURNED: "bg-red-100 text-red-800",
};

export default function ClientsClient({ clients, mrr }: { clients: Client[]; mrr: number }) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filtered = clients.filter((c) => filterStatus === "ALL" || c.status === filterStatus);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: form.get("businessName"),
        contactName: form.get("contactName"),
        email: form.get("email"),
        phone: form.get("phone"),
        businessType: form.get("businessType"),
        plan: form.get("plan"),
        monthlyValue: parseFloat(form.get("monthlyValue") as string) || 0,
        notes: form.get("notes"),
      }),
    });
    setShowAddModal(false);
    router.refresh();
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Clients</h1>
          <p className="text-gray text-sm mt-1">
            {clients.filter((c) => c.status === "ACTIVE").length} active &middot; MRR: ${mrr.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          + Add Client
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        {["ALL", "ACTIVE", "PAUSED", "CHURNED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filterStatus === s ? "bg-primary text-white" : "bg-white text-gray border"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray">Business</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Contact</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Plan</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Monthly</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Since</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-dark">{client.businessName}</p>
                  <p className="text-gray text-xs">{client.businessType}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-dark">{client.contactName}</p>
                  <p className="text-gray text-xs">{client.email}</p>
                </td>
                <td className="px-6 py-4 text-dark">{client.plan || "—"}</td>
                <td className="px-6 py-4 font-medium text-dark">${client.monthlyValue}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[client.status]}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray text-xs">
                  {new Date(client.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <select
                    onChange={(e) => {
                      if (e.target.value) updateStatus(client.id, e.target.value);
                      e.target.value = "";
                    }}
                    className="text-xs border rounded px-2 py-1"
                    defaultValue=""
                  >
                    <option value="" disabled>Change status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PAUSED">Paused</option>
                    <option value="CHURNED">Churned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-dark mb-6">Add Client</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Business Name *</label>
                <input name="businessName" required className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Contact Name *</label>
                <input name="contactName" required className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Email</label>
                  <input name="email" type="email" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                  <input name="phone" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
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
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Plan</label>
                  <select name="plan" className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Select plan</option>
                    <option value="Custom App">Custom App ($60/mo)</option>
                    <option value="AI Receptionist">AI Receptionist ($30/mo)</option>
                    <option value="Self Check-In">Self Check-In ($20/mo)</option>
                    <option value="AI Agents">AI Agents (Custom)</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Monthly Value ($)</label>
                  <input name="monthlyValue" type="number" step="0.01" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Notes</label>
                <textarea name="notes" rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium">
                  Add Client
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg">
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
