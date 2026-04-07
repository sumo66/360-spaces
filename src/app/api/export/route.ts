import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to export" },
      { status: 500 }
    );
  }

  const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Subscribed At", "IP Address"];
  const rows = (data || []).map((s) => [
    s.id,
    `"${s.first_name}"`,
    `"${s.last_name}"`,
    `"${s.email}"`,
    `"${s.phone}"`,
    `"${s.subscribed_at}"`,
    `"${s.ip_address || ""}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const today = new Date().toISOString().split("T")[0];

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers_${today}.csv"`,
    },
  });
}
