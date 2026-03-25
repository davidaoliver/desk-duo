import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CallsPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN";

  const calls = await prisma.call.findMany({
    orderBy: { calledAt: "desc" },
    include: {
      lead: true,
      user: true,
    },
    ...(isAdmin ? {} : { where: { userId: session?.user.id } }),
    take: 100,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">Call Log</h1>
        <div className="text-sm text-gray">
          {calls.length} calls {isAdmin ? "(all team)" : "(yours)"}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {isAdmin && <th className="text-left px-6 py-3 font-medium text-gray">Rep</th>}
              <th className="text-left px-6 py-3 font-medium text-gray">Lead</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Phone</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Direction</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Duration</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Date</th>
              <th className="text-left px-6 py-3 font-medium text-gray">Recording</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {calls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50">
                {isAdmin && <td className="px-6 py-4 text-dark">{call.user.name}</td>}
                <td className="px-6 py-4">
                  <p className="font-medium text-dark">{call.lead.firstName} {call.lead.lastName}</p>
                  <p className="text-gray text-xs">{call.lead.company}</p>
                </td>
                <td className="px-6 py-4 text-dark">{call.lead.phone || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    call.direction === "outbound" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}>
                    {call.direction}
                  </span>
                </td>
                <td className="px-6 py-4 text-dark">
                  {call.duration > 0
                    ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s`
                    : "—"}
                </td>
                <td className="px-6 py-4 text-dark capitalize">{call.status}</td>
                <td className="px-6 py-4 text-gray text-xs">
                  {new Date(call.calledAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {call.recordingUrl ? (
                    <a href={call.recordingUrl} target="_blank" className="text-primary hover:underline text-xs">
                      Play
                    </a>
                  ) : (
                    <span className="text-gray text-xs">—</span>
                  )}
                  {call.transcript && (
                    <details className="mt-1">
                      <summary className="text-xs text-primary cursor-pointer">Transcript</summary>
                      <p className="text-xs text-gray mt-1 max-w-xs">{call.transcript}</p>
                    </details>
                  )}
                </td>
              </tr>
            ))}
            {calls.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 8 : 7} className="px-6 py-12 text-center text-gray">
                  No calls logged yet. Call a lead to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
