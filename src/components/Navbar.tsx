import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { apiService } from "@/services/api";
import EnquiryPopup from "./EnquiryPopup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const location = useLocation();
  const [navbarData, setNavbarData] = useState<any>(null);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const data = await apiService.getNavbar();
        const galleryExists = data?.links?.some((l: any) => l.name === "Gallery");
        if (!galleryExists) {
          data.links.push({ name: "Gallery", path: "/gallery", isActive: true, order: 6 });
        }
        const galleryLink = data?.links?.find((l: any) => l.name === "Gallery");
        if (galleryLink) galleryLink.order = 6;

        const contactLink = data?.links?.find((l: any) => l.name === "Contact");
        if (contactLink) contactLink.order = 7;

        setNavbarData(data);
      } catch {
        setNavbarData({
          logo,
          links: [
            { name: "Home", path: "/", isActive: true, order: 1 },
            { name: "About", path: "/about", isActive: true, order: 2 },
            { name: "Courses", path: "/courses", isActive: true, order: 3 },
            { name: "Placements", path: "/placements", isActive: true, order: 4 },
            { name: "Blog", path: "/blog", isActive: true, order: 5 },
            { name: "Gallery", path: "/gallery", isActive: true, order: 6 },
            { name: "Contact", path: "/contact", isActive: true, order: 7 },
          ],
          showEnquiryButton: true,
          enquiryButtonText: "Get Started",
        });
      }
    };
    fetchNavbar();
  }, []);

  const navLinks = navbarData?.links
    ?.filter((link: any) => link.isActive)
    .sort((a: any, b: any) => a.order - b.order) || [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md border-b border-border z-50 shadow-soft">
        <div className="container mx-auto px-4 py-0 flex items-center justify-between h-20">

          {/* Left: Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-[#2a5048] hover:text-white transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Right: Logo */}
          <Link to="/" className="flex items-center ml-auto">
            <img
              src={navbarData?.logo || logo}
              alt="Blizzen Creations"
              style={{ height: "108px" }}
              className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Dropdown Panel */}
        <div
          className={`absolute left-4 top-20 w-72 bg-white border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-4 space-y-2">

            {navLinks.map((link: any) => {
              if (link.name === "Courses") {
                return (
                  <div key={link.path} className="flex flex-col">
                    <button
                      onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                      className="flex justify-between items-center px-3 py-2 rounded-md font-medium text-foreground hover:bg-[#2a5048] hover:text-white transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${showCourseDropdown ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>

                    {showCourseDropdown && (
                      <div className="flex flex-col mt-2 space-y-2">
                        <Link
                          to="/courses/it"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 rounded-md bg-primary/5 text-sm font-medium hover:bg-[#2a5048] hover:text-white transition-colors"
                        >
                          IT Courses
                        </Link>
                        <Link
                          to="/courses/non-it"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 rounded-md bg-primary/5 text-sm font-medium hover:bg-[#2a5048] hover:text-white transition-colors"
                        >
                          Non-IT Courses
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-[#1e3a35] text-white"
                      : "text-foreground hover:bg-[#2a5048] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {navbarData?.showEnquiryButton && (
              <Button
                onClick={() => {
                  setIsEnquiryOpen(true);
                  setIsOpen(false);
                }}
                className="mt-2 w-full bg-[#1e3a35] text-white font-semibold hover:bg-[#2a5048] transition-colors"
              >
                {navbarData?.enquiryButtonText || "Get Started"}
              </Button>
            )}
          </div>
        </div>
      </nav>

      <EnquiryPopup isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
};

export default Navbar;