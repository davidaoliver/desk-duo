import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("SUPER_ADMIN");
  if (error) return error;

  const { id } = await params;
  const { role } = await req.json();

  if (!["ADMIN", "EMPLOYEE"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json(user);
}
