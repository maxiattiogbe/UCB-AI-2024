import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";
import SnackbarProvider from "src/components/snackbar/snackbar-provider";

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
        <ThemeProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
