import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 25;
  const offset = (page - 1) * perPage;

  let query = supabase
    .from("subscribers")
    .select("*", { count: "exact" })
    .order("subscribed_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Supabase query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    subscribers: data || [],
    total: count || 0,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil((count || 0) / perPage)),
  });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const { error } = await supabase.from("subscribers").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
