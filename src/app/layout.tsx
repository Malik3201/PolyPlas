import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Lasani Disposables",
    default: "Lasani Disposables — Premium Disposable Products",
  },
  description:
    "Quality disposable cups, plates, glasses, cutlery, and food packaging. Contact us via WhatsApp for bulk orders and custom products.",
  keywords: [
    "disposable products",
    "disposable cups",
    "disposable plates",
    "disposable glasses",
    "food packaging",
    "disposable cutlery",
    "bulk disposables",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lasani Disposables",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#9A3412",
              color: "#FDFBF7",
              borderRadius: "16px",
              fontSize: "14px",
              fontFamily: "var(--font-jakarta)",
            },
            success: {
              iconTheme: { primary: "#25D366", secondary: "#9A3412" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FDFBF7" },
            },
          }}
        />
      </body>
    </html>
  );
}
