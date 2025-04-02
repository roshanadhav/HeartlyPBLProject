import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Heartly",
  description: "Women Safety App",
  icons: {
    icon: "/green-heart-with-leaf-outline_78370-2744-removebg-preview.png",
    shortcut: "/green-heart-with-leaf-outline_78370-2744-removebg-preview.png",
    apple: "/green-heart-with-leaf-outline_78370-2744-removebg-preview.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <AppContextProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
    </AppContextProvider>
  );
}
