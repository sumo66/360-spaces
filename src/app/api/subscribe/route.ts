import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, phone } = body;

    // Validation
    const errors: string[] = [];
    if (!first_name?.trim()) errors.push("First name is required.");
    if (!last_name?.trim()) errors.push("Last name is required.");
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("A valid email address is required.");
    if (!phone?.trim()) errors.push("Phone number is required.");

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join(" ") },
        { status: 400 }
      );
    }

    // Get IP address
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    // Insert into Supabase
    const { error } = await supabase.from("subscribers").insert({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      ip_address: ip,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, message: "This email is already subscribed." },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! You're on the list.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }
}
