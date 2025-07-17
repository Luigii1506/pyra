/**
 * Root Layout
 * Main layout with shared navigation and global providers
 * @created 2024-12-19
 */

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../hooks/use-user.js";
import MainLayout from "../components/layout/MainLayout.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Historia Antigua - Biblioteca Personal",
  description:
    "Explora los misterios de la historia antigua con nuestra biblioteca interactiva",
  keywords:
    "historia antigua, personajes históricos, mitología, religiones, mapas históricos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <UserProvider>
          <MainLayout>{children}</MainLayout>
        </UserProvider>
      </body>
    </html>
  );
}
