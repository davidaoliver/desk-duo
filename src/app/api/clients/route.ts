import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ADMIN");
  if (error) return error;

  const body = await req.json();

  const client = await prisma.client.create({
    data: {
      businessName: body.businessName,
      contactName: body.contactName,
      email: body.email || null,
      phone: body.phone || null,
      businessType: body.businessType || null,
      plan: body.plan || null,
      monthlyValue: body.monthlyValue || 0,
      notes: body.notes || null,
      leadId: body.leadId || null,
    },
  });

  await prisma.activity.create({
    data: {
      type: "CLIENT_CREATED",
      detail: `New client: ${body.businessName}`,
      userId: session!.user.id,
    },
  });

  return NextResponse.json(client);
}
