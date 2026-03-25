import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ClientsClient from "./ClientsClient";

export default async function ClientsPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "SUPER_ADMIN" || session?.user.role === "ADMIN";

  if (!isAdmin) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark">Access Restricted</h1>
        <p className="text-gray mt-2">Only admins can view the client list.</p>
      </div>
    );
  }

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { lead: true },
  });

  const mrr = clients
    .filter((c) => c.status === "ACTIVE")
    .reduce((sum, c) => sum + c.monthlyValue, 0);

  return <ClientsClient clients={JSON.parse(JSON.stringify(clients))} mrr={mrr} />;
}
