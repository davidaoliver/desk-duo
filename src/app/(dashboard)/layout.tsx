import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-light">
        <Sidebar user={session.user} />
        <div className="ml-64">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
}
