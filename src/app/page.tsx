"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setForm({ first_name: "", last_name: "", email: "", phone: "" });
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const inputStyle = {
    background: "transparent",
    border: "0.65px solid white",
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/bg.png"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />

      <div className="w-full max-w-[900px] text-center flex flex-col items-center relative z-10">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <img
            src="/logo.svg"
            alt="ThreeSixty"
            className="w-[300px] md:w-[374px] h-auto"
          />
          <img
            src="/logo-icon.svg"
            alt="Spaces"
            className="w-[190px] md:w-[233px] h-auto -mt-1"
          />
        </div>

        {/* Description */}
        <p className="text-white text-base md:text-[26px] md:leading-normal tracking-[-0.52px] max-w-[760px] mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non velit
          vel augue fermentum luctus. Integer sit amet risus vel neque efficitur
          malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Donec eget erat vel lacus facilisis
          lacinia. Praesent et nunc nec nulla tristique cursus.
        </p>

        {/* Coming Soon */}
        <h2 className="text-white text-[32px] font-medium tracking-[-1.28px] leading-[45px] mb-10">
          COMING SOON
        </h2>

        {/* Form Card */}
        <div
          className="w-full max-w-[660px] rounded-[24px] p-8 md:p-10"
          style={{
            background: "rgba(255, 255, 255, 0.14)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "0.5px solid white",
          }}
        >
          <h3 className="text-white text-[31px] tracking-[-0.63px] mb-4 text-center">
            Be the First to Know
          </h3>
          <div className="h-px bg-white/50 mb-7" />

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                required
                className="w-full px-5 py-3 rounded-full text-white text-[17px] tracking-[-0.34px] placeholder-white/60 outline-none"
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                required
                className="w-full px-5 py-3 rounded-full text-white text-[17px] tracking-[-0.34px] placeholder-white/60 outline-none"
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-5 py-3 rounded-full text-white text-[17px] tracking-[-0.34px] placeholder-white/60 outline-none"
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full px-5 py-3 rounded-full text-white text-[17px] tracking-[-0.34px] placeholder-white/60 outline-none"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-5 rounded-full text-[#312f77] font-normal text-[24px] tracking-[-0.48px] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                border: "1px solid white",
              }}
            >
              {status === "loading" ? "Submitting..." : "Subscribe"}
            </button>
          </form>

          {status !== "idle" && status !== "loading" && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm font-semibold ${
                status === "success"
                  ? "bg-green-500/20 text-green-900 border border-green-500/40"
                  : "bg-red-500/20 text-red-900 border border-red-500/30"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
