// src/app/layout.tsx
import type { Metadata } from 'next';
import { Outfit, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext'; // CORRECT: Import path for AuthProvider
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from "@/components/ui/tooltip";

// Configure your fonts
const outfit = Outfit({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], // Specify weights
  variable: '--font-sans' 
});
const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'], // Specify weights
  variable: '--font-heading' 
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

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
      {/* Apply font variables to body */}
      <body className={`${outfit.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans`}>
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