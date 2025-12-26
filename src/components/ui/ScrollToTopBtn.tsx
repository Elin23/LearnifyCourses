import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button onClick={scrollToTop} aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 cursor-pointer h-11 w-11 rounded-full grid place-items-center border border-border bg-bg-main/80 backdrop-blur text-text-primary shadow-lg transition-all duration-300 hover:bg-bg-muted ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
