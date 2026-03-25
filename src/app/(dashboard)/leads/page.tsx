import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LeadsClient from "./LeadsClient";

export default async function LeadsPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN";

  const [leads, users] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { assignedTo: true, _count: { select: { calls: true, demos: true } } },
      ...(isAdmin ? {} : { where: { assignedToId: session?.user.id } }),
    }),
    isAdmin ? prisma.user.findMany({ select: { id: true, name: true, email: true } }) : [],
  ]);

  return <LeadsClient leads={JSON.parse(JSON.stringify(leads))} users={users} isAdmin={isAdmin} currentUserId={session!.user.id} />;
}
