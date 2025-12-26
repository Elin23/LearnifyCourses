import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import ScrollToTopBtn from "../components/ui/ScrollToTopBtn";
import { ToastProvider } from "../components/shared/Toast";
import { useEffect, useState } from "react";
import LearnifyLoader from "../components/ui/LearnifyLoader";



export default function MainLayout() {

    const navItems = [{ to: "/", label: "Home" },
      { to: "/courses", label: "Courses" },
      { to: "/my-courses", label: "MyCourses", protected: true },
      { to: "/instructions", label: "Instruction" },]
  ;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    
    <div className="min-h-screen ">
      {loading && <LearnifyLoader />}
      <ToastProvider>
      <ScrollToTop/>  {/* to scroll to the top of new opened page */}
      <ScrollToTopBtn/> {/* to scroll to the top of the current page when the user click on it */}
      <Navbar navItems={navItems}/>
      <main>
        <Outlet />
      </main>
      <Footer/>
      </ToastProvider>
    </div>
  );
}
