import "../../styles/globals.css";
import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ fontFamily: "Inter, sans-serif" }}>
        <Header />
        <Dashboard/>
        {children}
      </body>
    </html>
  );
}
