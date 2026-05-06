import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120]">
      
      {/* flex-grow pushes the footer to the bottom */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}