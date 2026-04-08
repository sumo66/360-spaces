import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ThreeSixty — Coming Soon",
  description:
    "A collective built for entrepreneurs and creatives who want more than a workspace.",
  metadataBase: new URL("https://threesixty.club"),
  openGraph: {
    title: "ThreeSixty — Coming Soon",
    description:
      "A collective built for entrepreneurs and creatives who want more than a workspace.",
    url: "https://threesixty.club",
    siteName: "ThreeSixty",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ThreeSixty — Coming Soon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreeSixty — Coming Soon",
    description:
      "A collective built for entrepreneurs and creatives who want more than a workspace.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
