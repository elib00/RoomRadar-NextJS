import { Poppins } from "next/font/google";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-gray-300">
          {children}
        </main>
      </body>
    </html>
  );
}

export default AuthLayout;
