import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import Dialog from "../ui/Dialog";
import { clearAuth } from "../../utils/auth";

export type NavItem = {
  to: string;
  label: string;
  protected?: boolean;
};

type NavbarProps = {
  navItems: NavItem[];
};

function getInitialTheme(): "light" | "dark" {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function isAuthedFromStorage() {
  const token = localStorage.getItem("authToken");
  return !!token && token !== "null" && token !== "undefined";
}


export default function Navbar({ navItems }: NavbarProps) {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [isAuthed, setIsAuthed] = useState<boolean>(isAuthedFromStorage);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const filtered = navItems.filter((i) => (i.protected ? isAuthed : true));

  const iconBtn = "h-10 w-10 rounded-full grid place-items-center border border-border bg-bg-main/80 hover:bg-bg-muted transition cursor-pointer";
  const textBtn = "h-10 rounded-full px-4 grid place-items-center text-sm border border-border bg-bg-main/80 hover:bg-bg-muted transition cursor-pointer";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sync = () => setIsAuthed(isAuthedFromStorage());

    window.addEventListener("auth-change", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 10);
    setMobileOpen(false);
  }, [location.pathname]);

  const [dialogOpen, setDialogOpen] = useState(false);


  const openLogoutConfirm = () => setDialogOpen(true);
  const confirmLogout = () => {
    logout();
    setDialogOpen(false);
  };




  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const logout = () => {
    clearAuth();
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
    setIsAuthed(false);
    setMobileOpen(false);
  };


  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200  ${scrolled || mobileOpen ? "bg-bg-secondary/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent border-b border-transparent"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative flex h-16 items-center">
          <Link to="/" className="z-10 text-lg font-semibold tracking-tight text-text-primary font-secondary cursor-pointer">
            Learnify
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex items-center gap-8">
            {filtered.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `group relative py-2 text-sm transition ${isActive ? "text-text-primary font-semibold" : "text-text-secondary hover:text-text-primary"}`}>
                <span>{item.label}</span>
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-1.5 w-1.5 rounded-full bg-primary opacity-0 transition-all group-hover:opacity-60 group-[.active]:opacity-100" />
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="ml-auto flex items-center gap-2">
            <Link to="/cart" className={iconBtn}>
              <ShoppingCart size={18} className="text-text-primary" />
            </Link>

            <button onClick={toggleTheme} className={iconBtn}>
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span key="moon">
                    <Moon size={18} className="text-text-primary" />
                  </motion.span>
                ) : (
                  <motion.span key="sun">
                    <Sun size={18} className="text-text-primary" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {isAuthed ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/profile" className={iconBtn}>
                  <User size={18} className="text-text-primary" />
                </Link>

                <button onClick={openLogoutConfirm} className={`hidden lg:flex items-center gap-2 text-text-primary ${textBtn}`}>
                  <LogOut size={16} className="text-text-primary" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2 text-text-primary">
                <Link to="/auth/login" className={textBtn}>
                  Login
                </Link>
                <Link to="/auth/register" className="h-10 rounded-full px-4 grid place-items-center text-sm bg-primary text-white hover:bg-primary-hover transition">
                  Sign up
                </Link>
              </div>
            )}

            {/* --Mobile Menu-- */}
            <button onClick={() => setMobileOpen((v) => !v)} className={`${iconBtn} md:hidden`}>
              {mobileOpen ? (
                <X size={18} className="text-text-primary" />
              ) : (
                <Menu size={18} className="text-text-primary" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden pb-4 pt-2">
              <div className="grid gap-2">
                {filtered.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `h-11 flex items-center rounded-2xl border border-border px-4 text-sm transition " +
                      ${isActive ? "bg-bg-main/80 ring-1 ring-primary text-text-primary" : "bg-bg-main/80 text-text-primary hover:bg-bg-muted"}`}>
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="my-3 h-px bg-border" />

              {isAuthed ? (
                <div className="flex justify-center gap-2">
                <button onClick={openLogoutConfirm} className="h-11 w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-bg-main/80 text-sm hover:bg-bg-muted transition text-text-primary">
                  <LogOut size={18} className="text-text-primary" />
                  Logout
                </button>
                <Link to="/profile" className={iconBtn}>
                  <User size={18} className="text-text-primary" />
                </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/auth/login" className="h-11 rounded-2xl border border-border bg-bg-main/80 text-text-primary grid place-items-center text-sm hover:bg-bg-muted transition">
                    Login
                  </Link>
                  <Link to="/auth/register" className="h-11 rounded-2xl bg-primary grid place-items-center text-sm text-white hover:bg-primary-hover transition">
                    Sign up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          variant="confirm"
          title="Confirm logout"
          message="Are you sure you want to log out?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={confirmLogout}
        />


      </div>
    </header>
  );
}
