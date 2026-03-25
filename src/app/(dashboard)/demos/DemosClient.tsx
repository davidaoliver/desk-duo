"use client";

import { useRouter } from "next/navigation";

interface Demo {
  id: string;
  scheduledAt: string;
  status: string;
  notes: string | null;
  lead: { firstName: string; lastName: string; company: string | null; phone: string | null };
  user: { name: string | null };
}

const statusColors: Record<string, string> = {
  SCHEDULED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  NO_SHOW: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-800",
};

export default function DemosClient({ demos, isAdmin }: { demos: Demo[]; isAdmin: boolean }) {
  const router = useRouter();

  async function updateStatus(demoId: string, status: string) {
    await fetch(`/api/demos/${demoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  const upcoming = demos.filter((d) => d.status === "SCHEDULED");
  const past = demos.filter((d) => d.status !== "SCHEDULED");

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">Demos</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-dark mb-4">Upcoming ({upcoming.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map((demo) => (
            <div key={demo.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
              <p className="font-bold text-dark">
                {demo.lead.firstName} {demo.lead.lastName}
              </p>
              <p className="text-sm text-gray">{demo.lead.company}</p>
              <p className="text-sm text-gray">{demo.lead.phone}</p>
              <p className="text-sm font-medium text-primary mt-2">
                {new Date(demo.scheduledAt).toLocaleString()}
              </p>
              {isAdmin && <p className="text-xs text-gray mt-1">Rep: {demo.user.name}</p>}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(demo.id, "COMPLETED")}
                  className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium hover:bg-green-200"
                >
                  Completed
                </button>
                <button
                  onClick={() => updateStatus(demo.id, "NO_SHOW")}
                  className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium hover:bg-red-200"
                >
                  No Show
                </button>
                <button
                  onClick={() => updateStatus(demo.id, "CANCELLED")}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-gray text-sm col-span-full">No upcoming demos. Schedule one from the Leads page.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-dark mb-4">Past Demos ({past.length})</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray">Lead</th>
                {isAdmin && <th className="text-left px-6 py-3 font-medium text-gray">Rep</th>}
                <th className="text-left px-6 py-3 font-medium text-gray">Date</th>
                <th className="text-left px-6 py-3 font-medium text-gray">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {past.map((demo) => (
                <tr key={demo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-dark">
                    {demo.lead.firstName} {demo.lead.lastName}
                  </td>
                  {isAdmin && <td className="px-6 py-4 text-dark">{demo.user.name}</td>}
                  <td className="px-6 py-4 text-gray">
                    {new Date(demo.scheduledAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[demo.status]}`}>
                      {demo.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
