import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "src/global.css";

import ThemeProvider from "src/theme";
import { primaryFont } from "src/theme/typography";
import SnackbarProvider from "src/components/snackbar/snackbar-provider";
import { SettingsProvider } from "@/components/settings";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hope Simulation",
  description: "AI-facilitated collaborative learning for computer science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <ClerkProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: "light", // 'light' | 'dark'
              themeDirection: "ltr", //  'rtl' | 'ltr'
              themeContrast: "default", // 'default' | 'bold'
              themeLayout: "horizontal", // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: "blue", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <SnackbarProvider>{children}</SnackbarProvider>
            </ThemeProvider>
          </SettingsProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
