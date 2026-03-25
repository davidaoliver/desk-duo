import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Role } from "@/generated/prisma";

export async function requireAuth(minRole?: Role) {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }

  if (minRole) {
    const hierarchy: Record<string, number> = { EMPLOYEE: 0, ADMIN: 1, SUPER_ADMIN: 2 };
    if ((hierarchy[session.user.role] ?? 0) < (hierarchy[minRole] ?? 0)) {
      return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), session: null };
    }
  }

  return { error: null, session };
}
