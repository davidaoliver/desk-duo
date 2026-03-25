import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const { leadId, scheduledAt } = await req.json();

  const demo = await prisma.demo.create({
    data: {
      leadId,
      userId: session!.user.id,
      scheduledAt: new Date(scheduledAt),
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: "DEMO_SCHEDULED" },
  });

  await prisma.activity.create({
    data: {
      type: "DEMO_SCHEDULED",
      detail: `Demo scheduled for ${new Date(scheduledAt).toLocaleString()}`,
      userId: session!.user.id,
      leadId,
    },
  });

  return NextResponse.json(demo);
}
