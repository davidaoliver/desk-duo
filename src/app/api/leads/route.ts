import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const body = await req.json();
  const lead = await prisma.lead.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email || null,
      phone: body.phone || null,
      company: body.company || null,
      businessType: body.businessType || null,
      source: body.source || null,
      assignedToId: body.assignedToId || session!.user.id,
    },
  });

  await prisma.activity.create({
    data: {
      type: "LEAD_CREATED",
      detail: `Added ${body.firstName} ${body.lastName}`,
      userId: session!.user.id,
      leadId: lead.id,
    },
  });

  return NextResponse.json(lead);
}
