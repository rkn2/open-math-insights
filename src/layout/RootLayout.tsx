import { Outlet } from "react-router-dom";
import { NavBar } from "@/layout/NavBar";
import { Footer } from "@/layout/Footer";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
