import React from "react";
import Nav from "../components/Nav";

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}