import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeamClient from "./TeamClient";

export default async function TeamPage() {
  const session = await auth();

  if (session?.user.role !== "SUPER_ADMIN" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { assignedLeads: true, calls: true, demos: true },
      },
    },
  });

  // Get today's call counts per user
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayCalls = await prisma.call.groupBy({
    by: ["userId"],
    where: { calledAt: { gte: todayStart } },
    _count: { id: true },
  });
  const todayCallMap = Object.fromEntries(todayCalls.map((c) => [c.userId, c._count.id]));

  const usersWithStats = users.map((u) => ({
    ...u,
    todayCalls: todayCallMap[u.id] || 0,
  }));

  const isSuperAdmin = session?.user.role === "SUPER_ADMIN";

  return <TeamClient users={JSON.parse(JSON.stringify(usersWithStats))} isSuperAdmin={isSuperAdmin} />;
}
