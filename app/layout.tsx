import type { Metadata } from "next";
import localFont from "next/font/local";
//@ts-ignore
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/FooterSection";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@radix-ui/react-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Farniture e-store - comfort with sofas, chairs etc",
  description: "comfortis your way to unlock relax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <ToastProvider>{children}</ToastProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
