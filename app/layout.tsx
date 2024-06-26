import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from './_components/footer';
import AuthProvider from './api/auth/[...nextauth]/providers/auth';
import { Toaster } from "./_components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbear Store",
  description: "Sistema para barbearia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="BR">
      <head>
        <link rel='icon' href='/favicon.svg'/>
      </head>
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster/>
          <Footer/>
        </AuthProvider>        
      </body>
    </html>
  );
}
