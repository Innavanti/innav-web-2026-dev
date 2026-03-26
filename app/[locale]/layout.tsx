import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import Navbar5 from "../components/ui/navbar/Navbar5";
import { getTranslations } from "next-intl/server";

type MetaDataProps = {
  params: Promise<{ locale: string }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL("https://innavanti.com"),

    title: {
      default: title,
      template: "%s | Innavanti",
    },

    description,

    keywords: t.raw("keywords"),

    openGraph: {
      title,
      description,
      url: `https://innavanti.com/${locale}`,
      siteName: "Innavanti",
      locale, // si quieres formato OG correcto por idioma, mejor mapearlo abajo
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Innavanti Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    alternates: {
      canonical: `https://innavanti.com/${locale}`,
      languages: {
        es: "https://innavanti.com/es",
        en: "https://innavanti.com/en",
      },
    },

    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased relative overscroll-contain `}
      >
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
          enableSystem={false}
        >
          <NextIntlClientProvider>
            <Navbar5 />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
