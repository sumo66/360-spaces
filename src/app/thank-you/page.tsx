"use client";

import Image from "next/image";
import { useState } from "react";

export default function ThankYou() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://threesixty.club";
  const shareText =
    "Check out ThreeSixty — a Miami-based collective for entrepreneurs and creatives. Sign up for early access!";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

  const handleShareSMS = () => {
    window.open(
      `sms:?&body=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

  const handleShareEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent("Check out ThreeSixty")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
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
            className="w-[200px] md:w-[300px] h-auto"
          />
        </div>

        {/* Thank You Card */}
        <div
          className="w-full max-w-[660px] rounded-[24px] p-8 md:p-12"
          style={{
            background: "rgba(255, 255, 255, 0.14)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "0.5px solid white",
          }}
        >
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            You&apos;re In!
          </h1>
          <div className="h-px bg-white/50 mb-6" />
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-2">
            Thanks for signing up. We&apos;re building something special in
            Miami and you&apos;ll be the first to know when we go live.
          </p>
          <p className="text-white/70 text-sm md:text-base mb-8">
            Keep an eye on your inbox — exciting things are coming.
          </p>

          {/* Share Section */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white font-semibold text-lg mb-5">
              Know someone who&apos;d be interested? Share the word.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <span className="text-2xl">{copied ? "✓" : "🔗"}</span>
                <span className="text-white text-xs font-medium">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <span className="text-2xl">💬</span>
                <span className="text-white text-xs font-medium">WhatsApp</span>
              </button>

              <button
                onClick={handleShareSMS}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <span className="text-2xl">📱</span>
                <span className="text-white text-xs font-medium">Text</span>
              </button>

              <button
                onClick={handleShareEmail}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <span className="text-2xl">✉️</span>
                <span className="text-white text-xs font-medium">Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
