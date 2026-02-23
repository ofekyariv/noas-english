import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "🌟 Noa's English 🌟",
  description: "Interactive English learning for Noa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased bg-purple-50 min-h-screen`}>
        <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-3 text-center">
            <h1 className="text-2xl font-black text-white tracking-wide drop-shadow-md">
              🌟 Noa&apos;s English 🌟
            </h1>
            <p className="text-purple-100 text-sm font-bold mt-0.5" dir="rtl">
              נועה לומדת אנגלית ✏️
            </p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
