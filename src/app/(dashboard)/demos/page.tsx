import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DemosClient from "./DemosClient";

export default async function DemosPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN";

  const demos = await prisma.demo.findMany({
    orderBy: { scheduledAt: "asc" },
    include: { lead: true, user: true },
    ...(isAdmin ? {} : { where: { userId: session?.user.id } }),
  });

  return <DemosClient demos={JSON.parse(JSON.stringify(demos))} isAdmin={isAdmin} />;
}
