import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "LISBOA — Creative Studio AI",
  description: "Crie, edite e transforme imagens com IA premium.",
  openGraph: {
    title: "LISBOA — Creative Studio AI",
    description: "Crie, edite e transforme imagens com IA premium.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
