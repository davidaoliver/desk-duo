import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  const lead = await prisma.lead.update({
    where: { id },
    data: body,
  });

  if (body.status) {
    await prisma.activity.create({
      data: {
        type: "LEAD_STATUS_CHANGED",
        detail: `Status changed to ${body.status}`,
        userId: session!.user.id,
        leadId: id,
      },
    });
  }

  return NextResponse.json(lead);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("ADMIN");
  if (error) return error;

  const { id } = await params;
  await prisma.lead.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
