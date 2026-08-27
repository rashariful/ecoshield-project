import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const NAVBAR_HEIGHT = 80; // h-20 = 80px

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: NAVBAR_HEIGHT }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
