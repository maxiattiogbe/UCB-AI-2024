import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";
import SnackbarProvider from "src/components/snackbar/snackbar-provider";
import { SettingsProvider } from "@/components/settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Training Simulator",
  description: "Training scenarios powered by generative AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
