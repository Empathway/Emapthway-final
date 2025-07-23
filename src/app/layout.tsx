// src/app/layout.tsx
import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google'; // Import your specific fonts
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Empathway',
  description: 'Your Way to Well-Being',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfairDisplay.variable} font-sans`}>
        <TooltipProvider>
          <AuthProvider>
            {children}
            <Toaster />
            <SonnerToaster />
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}