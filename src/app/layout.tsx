import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "sonner";
import DynamicIcon from "@/components/Common/Toast/DynamicIcon";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
const lufga = localFont({
  src: [
    {
      path: "../../public/fonts/lufga/LufgaThin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaThinItalic.woff",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaExtraLightItalic.woff",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaLightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaMediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaSemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaSemiBoldItalic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaBoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaExtraBoldItalic.woff",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/lufga/LufgaBlack.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/lufga/LufgaBlackItalic.woff",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-lufga",
});

export const metadata: Metadata = {
  title: "Nexop – Shopping Made Easy",
  description:
    "Effortless and modern shopping experience, right at your fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lufga.variable} antialiased`}>
        <ToastProvider>{children}</ToastProvider>
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton={true}
          duration={4000}
          style={{
            fontFamily: "Lufga",
          }}
          toastOptions={{
            style: {
              fontFamily: "Lufga",
              ["--toast-icon-color" as string]: undefined,
            },
          }}
          icons={{
            success: <DynamicIcon iconType="success" defaultColor="#039855" />,
            error: <DynamicIcon iconType="error" defaultColor="#D92D20" />,
            info: <DynamicIcon iconType="info" defaultColor="#1570EF" />,
            loading: <LoadingSpinner />,
          }}
        />
      </body>
    </html>
  );
}
