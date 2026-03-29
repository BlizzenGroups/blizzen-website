import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { apiService } from "@/services/api";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import logo from "@/assets/logo.png";
import devLogo from "@/assets/dev_logo.png";

interface ContactInfo {
  companyName: string;
  address: string;
  city: string;
  state: string;
  phone: Array<{ label: string; number: string }>;
  email: Array<{ label: string; address: string }>;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

interface QuickLink {
  label: string;
  path: string;
  isActive: boolean;
}

interface PopularCourse {
  courseId: string;
  title: string;
  slug: string;
}

interface FooterContent {
  description: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  popularCourses: PopularCourse[];
  showSocialLinks: boolean;
  showQuickLinks: boolean;
  showPopularCourses: boolean;
  copyright: string;
}

const TelegramIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const Footer = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const [contactData, coursesData, footerData] = await Promise.all([
        apiService.getContactInfo(),
        apiService.getCourses(),
        apiService.getFooterContent(),
      ]);

      if (contactData.success) setContactInfo(contactData.data);
      if (coursesData.success) setCourses(coursesData.data.slice(0, 5));
      setFooterContent(footerData);
    } catch (error) {
      console.error("Failed to fetch footer data:", error);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Facebook": return Facebook;
      case "Instagram": return Instagram;
      case "Linkedin": return Linkedin;
      case "Youtube": return Youtube;
      default: return Facebook;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSocialLinks = footerContent?.socialLinks?.filter((l) => l.isActive) ?? [];
  const activeQuickLinks = footerContent?.quickLinks?.filter((l) => l.isActive) ?? [];

  const popularCourseList =
    footerContent?.popularCourses && footerContent.popularCourses.length > 0
      ? footerContent.popularCourses
      : courses.length > 0
      ? courses.map((c) => ({ courseId: c._id, title: c.title, slug: c.slug }))
      : [
          { courseId: "1", title: "Python Full Stack Development", slug: "python-full-stack" },
          { courseId: "2", title: "Data Science & Analytics", slug: "data-science" },
          { courseId: "3", title: "AI & Machine Learning", slug: "ai-ml" },
          { courseId: "4", title: "Web Development", slug: "web-development" },
        ];

  const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2140436086565!2d80.21014897484349!3d13.085616887240327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526500531a313b%3A0xd55b6f4b2ed37998!2sBlizzen%20Creation%27s!5e0!3m2!1sen!2sin!4v1774497866285!5m2!1sen!2sin";

  const socialLinkStyle = {
    color: "rgba(255,255,255,0.65)",
    transition: "color 0.2s",
    display: "flex",
    alignItems: "center",
  };

  return (
    <footer style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* ── Main footer body ── */}
      <div style={{ background: "#1e3a35", position: "relative", overflow: "hidden" }}>

        {/* Geometric line pattern */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}
          preserveAspectRatio="none"
          viewBox="0 0 900 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="400" y1="0" x2="900" y2="400" stroke="white" strokeWidth="1" />
          <line x1="500" y1="0" x2="900" y2="320" stroke="white" strokeWidth="1" />
          <line x1="600" y1="0" x2="900" y2="240" stroke="white" strokeWidth="1" />
          <line x1="700" y1="0" x2="900" y2="160" stroke="white" strokeWidth="1" />
          <line x1="800" y1="0" x2="900" y2="80"  stroke="white" strokeWidth="1" />
          <line x1="900" y1="0" x2="900" y2="0"   stroke="white" strokeWidth="1" />
          <line x1="300" y1="0" x2="900" y2="480" stroke="white" strokeWidth="1" />
          <line x1="900" y1="100" x2="500" y2="400" stroke="white" strokeWidth="1" />
          <line x1="900" y1="200" x2="600" y2="400" stroke="white" strokeWidth="1" />
          <line x1="900" y1="300" x2="700" y2="400" stroke="white" strokeWidth="1" />
          <line x1="900" y1="350" x2="800" y2="400" stroke="white" strokeWidth="1" />
        </svg>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "56px 32px 48px",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 1fr",
            gap: "48px",
            position: "relative",
            zIndex: 1,
          }}
          className="footer-grid"
        >
          {/* ── COL 1: Brand block ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ marginBottom: "4px" }}>
              <img
                src={logo}
                alt="Blizzen Creations"
                style={{ height: "90px", width: "auto", objectFit: "contain" }}
              />
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "15px",
                lineHeight: "1.7",
                maxWidth: "380px",
                margin: 0,
                marginTop: "-8px",
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  footerContent?.description ||
                    "Transforming careers through comprehensive IT training, hands-on projects, and guaranteed placement support in Chennai, Tamil Nadu."
                ),
              }}
            />

            {/* Social icons including Telegram */}
            {footerContent?.showSocialLinks !== false && (
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>

                {/* Dynamic social links from admin */}
                {activeSocialLinks.map((link, i) => {
                  const Icon = getSocialIcon(link.icon);
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      style={socialLinkStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")}
                    >
                      <Icon size={26} />
                    </a>
                  );
                })}

                {/* Hardcoded Telegram link */}
                <a
                  href="https://t.me/blizzencareeracademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  style={socialLinkStyle}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")}
                >
                  <TelegramIcon />
                </a>

              </div>
            )}

            {/* Back to top button */}
            <div>
              <button
                onClick={scrollToTop}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  border: "1.5px solid rgba(255,255,255,0.45)",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "rgba(255,255,255,0.1)";
                  btn.style.borderColor = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "transparent";
                  btn.style.borderColor = "rgba(255,255,255,0.45)";
                }}
              >
                <ArrowUp size={14} />
                Back to top
              </button>
            </div>
          </div>

          {/* ── COL 2: Quick Links ── */}
          {footerContent?.showQuickLinks !== false && (
            <div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "20px",
                  marginTop: 0,
                  letterSpacing: "0.03em",
                }}
              >
                Quick Links
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {(activeQuickLinks.length > 0
                  ? activeQuickLinks
                  : [
                      { label: "Home", path: "/" },
                      { label: "About Us", path: "/about" },
                      { label: "Courses", path: "/courses" },
                      { label: "Placements", path: "/placements" },
                      { label: "Contact Us", path: "/contact" },
                    ]
                ).map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── COL 3: Live Location Map + Developed by ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h4
              style={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "4px",
                marginTop: 0,
                letterSpacing: "0.03em",
              }}
            >
              Our Location
            </h4>

            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}
            >
              <iframe
                title="Blizzen Creations Location"
                src={MAP_EMBED_URL}
                width="100%"
                height="160"
                style={{ display: "block", border: "none" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Developed by</span>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={devLogo} alt="Developer" style={{ height: "30px", width: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div
        style={{
          background: "#c9953a",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p
          style={{ margin: 0, color: "#fff", fontSize: "13px", textAlign: "center" }}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(
              footerContent?.copyright ||
                `© ${new Date().getFullYear()} ${contactInfo?.companyName || "Blizzen Creations"}. All rights reserved.`
            ),
          }}
        />
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
