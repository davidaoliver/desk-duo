import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  const demo = await prisma.demo.update({
    where: { id },
    data: body,
  });

  if (body.status === "COMPLETED") {
    await prisma.lead.update({
      where: { id: demo.leadId },
      data: { status: "DEMO_COMPLETED" },
    });
    await prisma.activity.create({
      data: {
        type: "DEMO_COMPLETED",
        userId: session!.user.id,
        leadId: demo.leadId,
        detail: "Demo completed",
      },
    });
  }

  return NextResponse.json(demo);
}
