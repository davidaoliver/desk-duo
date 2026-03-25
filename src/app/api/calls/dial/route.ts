import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const { leadId } = await req.json();
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead || !lead.phone) {
    return NextResponse.json({ error: "Lead not found or no phone number" }, { status: 400 });
  }

  let twilioSid: string | null = null;
  let recordingUrl: string | null = null;

  // Attempt Twilio call if configured
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const twilio = await import("twilio");
      const client = twilio.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const call = await client.calls.create({
        to: lead.phone,
        from: process.env.TWILIO_PHONE_NUMBER,
        record: true,
        url: "http://demo.twilio.com/docs/voice.xml", // Replace with your TwiML endpoint
      });
      twilioSid = call.sid;
    } catch (e) {
      console.error("Twilio call failed:", e);
    }
  }

  // Log the call regardless
  const call = await prisma.call.create({
    data: {
      leadId,
      userId: session!.user.id,
      twilioSid,
      direction: "outbound",
      status: twilioSid ? "initiated" : "manual",
      recordingUrl,
    },
  });

  // Update lead status if still NEW
  if (lead.status === "NEW") {
    await prisma.lead.update({ where: { id: leadId }, data: { status: "CONTACTED" } });
  }

  await prisma.activity.create({
    data: {
      type: "CALL_MADE",
      detail: `Called ${lead.firstName} ${lead.lastName} at ${lead.phone}`,
      userId: session!.user.id,
      leadId,
    },
  });

  return NextResponse.json({ call, twilioSid });
}
