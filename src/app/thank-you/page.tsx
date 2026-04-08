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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {copied ? (
                    <polyline points="20 6 9 17 4 12" />
                  ) : (
                    <>
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </>
                  )}
                </svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-white text-xs font-medium">Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
