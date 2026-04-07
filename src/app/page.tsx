"use client";

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

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{
        background:
          "linear-gradient(135deg, #c4b84e 0%, #d4a053 15%, #d98a6a 25%, #d66f8f 35%, #c964a8 45%, #b060b8 55%, #8a5ec0 65%, #6a5fbf 75%, #5060c0 85%, #4a5abf 100%)",
      }}
    >
      <div className="w-full max-w-[900px] text-center flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-10 drop-shadow-lg">
          ThreeSi<span className="italic">x</span>ty
          <br />
          Spaces
        </h1>

        {/* Description */}
        <p className="text-white/95 text-base md:text-lg leading-relaxed max-w-[760px] mb-12 drop-shadow-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non velit
          vel augue fermentum luctus. Integer sit amet risus vel neque efficitur
          malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Donec eget erat vel lacus facilisis
          lacinia. Praesent et nunc nec nulla tristique cursus.
        </p>

        {/* Coming Soon */}
        <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-[4px] mb-10 drop-shadow-lg">
          COMING SOON
        </h2>

        {/* Form Card */}
        <div
          className="w-full max-w-[660px] rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <h3 className="text-[#2d2045] text-xl md:text-2xl font-bold mb-4">
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
                className="w-full px-4 py-3.5 rounded-xl text-[#2d2045] text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                required
                className="w-full px-4 py-3.5 rounded-xl text-[#2d2045] text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3.5 rounded-xl text-[#2d2045] text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full px-4 py-3.5 rounded-xl text-[#2d2045] text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-xl text-[#2d2045] font-semibold text-base cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,230,210,0.7), rgba(240,220,230,0.6))",
                backdropFilter: "blur(10px)",
                border: "none",
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
