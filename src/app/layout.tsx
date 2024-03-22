import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { mobile, openSansFont } from "@/lib/ui";
import ThemeRegistry from "@/app/ThemeRegistry";
import { Providers } from "@/app/Providers";
import { MobileProviders } from "@/app/MobileProviders";

const APP_NAME = "UiTPAS Beheer";
const APP_DEFAULT_TITLE = "UiTPAS Beheer";
const APP_TITLE_TEMPLATE = "%s | UiTPAS Beheer";
const APP_DESCRIPTION = "UiTPAS Beheer";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: mobile.palette.primary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isMobile = false;

  if (isMobile)
    return (
      <html lang="en">
        <head />
        <body
          className={[
            mobile.poppinsFont.variable,
            mobile.poppinsFont.className,
          ].join(" ")}
          style={{ overflowX: "hidden" }}
        >
          <MobileProviders>{children}</MobileProviders>
        </body>
      </html>
    );

  return (
    <html lang="en">
      <head />
      <body
        className={[openSansFont.variable, openSansFont.className].join(" ")}
        style={{ overflowX: "hidden" }}
      >
        <ThemeRegistry options={{ key: "joy" }}>
          <Providers>{children}</Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
