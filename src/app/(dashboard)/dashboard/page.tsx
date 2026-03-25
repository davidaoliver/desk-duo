import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN";

  const [leadCount, clientCount, demoCount, callCount, recentActivity, activeClients] = await Promise.all([
    isAdmin
      ? prisma.lead.count()
      : prisma.lead.count({ where: { assignedToId: session?.user.id } }),
    prisma.client.count({ where: { status: "ACTIVE" } }),
    isAdmin
      ? prisma.demo.count({ where: { status: "SCHEDULED" } })
      : prisma.demo.count({ where: { status: "SCHEDULED", userId: session?.user.id } }),
    isAdmin
      ? prisma.call.count({ where: { calledAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } })
      : prisma.call.count({ where: { calledAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }, userId: session?.user.id } }),
    isAdmin
      ? prisma.activity.findMany({ take: 10, orderBy: { createdAt: "desc" }, include: { user: true, lead: true } })
      : prisma.activity.findMany({ take: 10, orderBy: { createdAt: "desc" }, include: { user: true, lead: true }, where: { userId: session?.user.id } }),
    prisma.client.aggregate({
      where: { status: "ACTIVE" },
      _sum: { monthlyValue: true },
    }),
  ]);

  const mrr = activeClients._sum.monthlyValue || 0;

  const stats = [
    { label: "Total Leads", value: leadCount, href: "/leads", color: "bg-blue-500" },
    { label: "Active Clients", value: clientCount, href: "/clients", color: "bg-green-500" },
    { label: "Upcoming Demos", value: demoCount, href: "/demos", color: "bg-purple-500" },
    { label: "Calls Today", value: callCount, href: "/calls", color: "bg-orange-500" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray">Welcome back, {session?.user.name?.split(" ")[0]}</p>
        </div>
        {isAdmin && (
          <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
            <p className="text-xs text-gray">Monthly Recurring Revenue</p>
            <p className="text-2xl font-bold text-accent">${mrr.toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray">{stat.label}</p>
            <p className="text-3xl font-bold text-dark mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-dark mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-gray text-sm">No activity yet. Start by adding some leads!</p>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-dark">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    {activity.type.replace(/_/g, " ").toLowerCase()}
                    {activity.lead && (
                      <>
                        {" — "}
                        <Link href={`/leads`} className="text-primary hover:underline">
                          {activity.lead.firstName} {activity.lead.lastName}
                        </Link>
                      </>
                    )}
                  </p>
                  {activity.detail && <p className="text-gray">{activity.detail}</p>}
                  <p className="text-gray text-xs mt-1">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
