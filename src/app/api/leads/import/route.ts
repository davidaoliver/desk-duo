import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const { csv } = await req.json();
  const lines = (csv as string).trim().split("\n");
  if (lines.length < 2) {
    return NextResponse.json({ error: "CSV must have a header row and at least one data row" }, { status: 400 });
  }

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const leads = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = values[j] || "";
    });

    if (!row.firstname && !row.lastname) continue;

    leads.push({
      firstName: row.firstname || row.first_name || row.name?.split(" ")[0] || "Unknown",
      lastName: row.lastname || row.last_name || row.name?.split(" ").slice(1).join(" ") || "",
      email: row.email || null,
      phone: row.phone || row.phonenumber || row.phone_number || null,
      company: row.company || row.businessname || row.business_name || null,
      businessType: row.businesstype || row.business_type || row.type || null,
      source: row.source || "CSV Import",
      assignedToId: session!.user.id,
    });
  }

  const result = await prisma.lead.createMany({ data: leads });

  await prisma.activity.create({
    data: {
      type: "LEAD_IMPORTED",
      detail: `Imported ${result.count} leads from CSV`,
      userId: session!.user.id,
    },
  });

  return NextResponse.json({ imported: result.count });
}
