import "../styles/globals.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        style={{ fontFamily: "Inter, sans-serif" }}
        className="bg-[#131313] text-white"
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
