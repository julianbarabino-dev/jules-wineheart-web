import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/language-context';
import type { Locale } from '@/lib/i18n-config';

export const metadata: Metadata = {
  title: 'Sonic Canvas | Jules Wineheart | Cosmic Vicar Records',
  description:
    'Jules Wineheart - Lo-fi Folk, Electronic & Ambient. Cosmic Vicar Records.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang: Locale = 'es'; // Hardcoded to spanish for now
  return (
    <html lang={lang} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn('font-body antialiased overflow-x-hidden relative')}
      >
        <LanguageProvider lang={lang}>
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>
            <div className="absolute inset-0 -z-10">
              <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-purple-900/50 opacity-50 blur-[128px] animate-blob"></div>
              <div className="absolute bottom-auto left-0 top-auto h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-indigo-900/50 opacity-50 blur-[128px] animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 right-auto top-auto h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-fuchsia-900/50 opacity-50 blur-[128px] animate-blob animation-delay-4000"></div>
            </div>
          </div>
          
          <div className="noise-bg" />
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
