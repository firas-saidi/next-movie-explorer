import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Explorer',
  description: 'Discover trending movies and more',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FavoritesProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Navbar />
              <main className="container mx-auto px-4 md:px-8 py-8">
                {children}
              </main>
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

