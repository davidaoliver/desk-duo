"use client";

import { useRouter } from "next/navigation";

interface TeamUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  _count: { assignedLeads: number; calls: number; demos: number };
  todayCalls: number;
  createdAt: string;
}

const roleBadge: Record<string, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-800",
  ADMIN: "bg-purple-100 text-purple-800",
  EMPLOYEE: "bg-blue-100 text-blue-800",
};

export default function TeamClient({ users, isSuperAdmin }: { users: TeamUser[]; isSuperAdmin: boolean }) {
  const router = useRouter();

  async function changeRole(userId: string, role: string) {
    await fetch(`/api/team/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">Team Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              {user.image ? (
                <img src={user.image} alt="" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {user.name?.[0] || "U"}
                </div>
              )}
              <div>
                <p className="font-medium text-dark">{user.name}</p>
                <p className="text-xs text-gray">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${roleBadge[user.role]}`}>
                {user.role.replace("_", " ")}
              </span>
              {isSuperAdmin && user.role !== "SUPER_ADMIN" && (
                <select
                  onChange={(e) => {
                    if (e.target.value) changeRole(user.id, e.target.value);
                    e.target.value = "";
                  }}
                  className="text-xs border rounded px-2 py-1 ml-auto"
                  defaultValue=""
                >
                  <option value="" disabled>Change role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-dark">{user._count.assignedLeads}</p>
                <p className="text-xs text-gray">Leads</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-dark">{user._count.calls}</p>
                <p className="text-xs text-gray">Total Calls</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-dark">{user.todayCalls}</p>
                <p className="text-xs text-gray">Calls Today</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-dark">{user._count.demos}</p>
                <p className="text-xs text-gray">Demos</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
