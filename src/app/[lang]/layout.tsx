import "@/styles/globals.css";

import { dir } from "i18next";

import { ThemeProviders } from "@/src/app/providers";
import GoogleAnalytics from "@/src/components/Analytics/GoogleAnalytics";
import { serverSideTranslation } from "@/src/i18n/index";
import { LanguageType } from "@/src/types/language";

export const generateMetadata = async ({
  params,
}: {
  params: { lang: LanguageType };
}) => {
  const { t } = await serverSideTranslation(params.lang, "main");
  const description = t("description");

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ja-JP": "/ja",
      },
    },
    title: "Meshmell | Free 3D model sharing service",
    description: description,
    generator: "Meshmell",
    applicationName: "Meshmell",
    referrer: "origin-when-cross-origin",
    keywords: `${["Meshmell"]}`,
    authors: [
      { name: "Yurimell", url: `https://yurimell.com/${params.lang}/who` },
    ],
    creator: "Yurimell",
    publisher: "Yurimell",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: "Meshmell",
      description: description,
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: "Meshmell",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/general/home-img.webp`,
          width: 800,
          height: 600,
          alt: "Meshmell",
        },
      ],
      locale: t("locale"),
      type: "website",
    },

    twitter: {
      card: "summary",
      title: "Meshmell",
      description: description,
      siteId: "",
      creator: "@Yurimell6174",
      images: {
        url: `${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/general/home-img.webp`,
        alt: "Meshmell",
      },
    },
  };
};

const RootLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: LanguageType };
}) => {
  let htmlLang;

  switch (params.lang) {
    case "en":
      htmlLang = "en-US";
      break;
    case "ja":
      htmlLang = "ja-JP";
      break;
    default:
      htmlLang = "en-US";
      break;
  }

  return (
    // suppressHydrationWarning is used to suppress the warning that appears when using the hydrate function in the client side
    <html lang={htmlLang} dir={dir(params.lang)} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className='bg-sky-100 text-black dark:bg-sky-950 dark:text-white'>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
};

export default RootLayout;
