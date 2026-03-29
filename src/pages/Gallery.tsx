import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";


// ── Import your actual images ──
import img1 from "@/assets/image1.jpeg";
import img2 from "@/assets/image2.jpeg";
import img3 from "@/assets/image3.jpeg";
import img4 from "@/assets/image4.jpeg";
import img5 from "@/assets/IMG1.jpeg";

type Category = "All" | "Classroom" | "Events" | "Achievements";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: Exclude<Category, "All">;
  tall?: boolean; // makes card taller in masonry
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: img1, title: "Hands-on Lab Session",      category: "Classroom",    tall: true  },
  { id: 2, src: img2, title: "Annual Graduation Event",   category: "Events",       tall: false },
  { id: 3, src: img3, title: "Placement Drive 2025",      category: "Achievements", tall: false },
  { id: 4, src: img4, title: "Python Bootcamp Workshop",  category: "Classroom",    tall: false },
  { id: 5, src: img5, title: "Student Achievement Award", category: "Achievements", tall: true  },
  // Duplicate entries to fill the grid — remove once you have more images
  { id: 6, src: img2, title: "Tech Fest 2025",            category: "Events",       tall: false },
  { id: 7, src: img3, title: "Campus Orientation Day",    category: "Events",       tall: true  },
  { id: 8, src: img1, title: "Full Stack Training",       category: "Classroom",    tall: false },
  { id: 9, src: img4, title: "Top Performer Awards",      category: "Achievements", tall: false },
];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  Classroom:    "#d4eae4",
  Events:       "#fef3c7",
  Achievements: "#fce7f3",
};

const CATEGORY_TEXT: Record<Exclude<Category, "All">, string> = {
  Classroom:    "#1e3a35",
  Events:       "#d97706",
  Achievements: "#9d174d",
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null); // index in filtered array

  const filtered = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null);

  // Split into 3 columns for masonry
  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  const getFilteredIndex = (item: GalleryItem) => filtered.findIndex(f => f.id === item.id);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#ffffff", color: "#0f172a" }}>

      {/* ── HERO ── */}
      <section style={{ background: "#1e3a35", padding: "60px 0 64px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
       
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.6, pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${10 + i * 22}%`, top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 50, fontWeight: 700, color: "#93c5fd", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10,textAlign:"center" }}>
            Gallery
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, color: "white", lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 20 }}>
            Moments That{" "}
            <span style={{ color: "#93c5fd" }}>Define Us.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto", fontWeight: 500 }}>
            A glimpse into our classrooms, events, and student achievements — the memories we build together.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div style={{ background: "#f0f7f5", borderBottom: "1px solid #d4eae4", padding: "20px 32px", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        {(["All", "Classroom", "Events", "Achievements"] as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: "8px 22px",
              borderRadius: 999,
              border: activeFilter === cat ? "none" : "1.5px solid #a7c4bc",
              background: activeFilter === cat ? "#1e3a35" : "white",
              color: activeFilter === cat ? "white" : "#1e3a35",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── MASONRY GRID ── */}
      <section style={{ padding: "56px 0", background: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8", fontSize: 18 }}>
              No images in this category yet.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
              {[col1, col2, col3].map((col, colIdx) => (
                <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {col.map(item => (
                    <div
                      key={item.id}
                      onClick={() => openLightbox(getFilteredIndex(item))}
                      style={{
                        position: "relative",
                        borderRadius: 14,
                        overflow: "hidden",
                        cursor: "pointer",
                        border: "1.5px solid #e2e8f0",
                        height: item.tall ? 320 : 220,
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(30,58,53,0.15)";
                        const overlay = e.currentTarget.querySelector(".overlay") as HTMLDivElement;
                        if (overlay) overlay.style.transform = "translateY(0)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        const overlay = e.currentTarget.querySelector(".overlay") as HTMLDivElement;
                        if (overlay) overlay.style.transform = "translateY(100%)";
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.src}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />

                      {/* Hover overlay */}
                      <div
                        className="overlay"
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          background: "linear-gradient(to top, rgba(30,58,53,0.95) 0%, rgba(30,58,53,0.7) 60%, transparent 100%)",
                          padding: "20px 16px 16px",
                          transform: "translateY(100%)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <span style={{
                          display: "inline-block",
                          fontSize: 11, fontWeight: 700,
                          background: CATEGORY_COLORS[item.category],
                          color: CATEGORY_TEXT[item.category],
                          padding: "3px 10px", borderRadius: 20,
                          marginBottom: 6, letterSpacing: "0.5px",
                        }}>
                          {item.category}
                        </span>
                        <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "#1e3a35", padding: "40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { value: "1,000+", label: "Students Trained" },
              { value: "50+",    label: "Events Conducted" },
              { value: "100%",   label: "Placement Rate" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center", padding: "16px 8px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#c9953a", letterSpacing: "-1px" }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: "64px 0", background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.5px", marginBottom: 6 }}>Want to be part of our story?</h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Book a free demo class and start your journey with us.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/contact">
              <button
                style={{ background: "#1e3a35", color: "white", border: "none", padding: "13px 28px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#c9953a")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#1e3a35")}
              >
                Book Free Demo <ArrowRight size={15} />
              </button>
            </Link>
            <Link to="/courses">
              <button style={{ background: "transparent", color: "#1e3a35", border: "1.5px solid #a7c4bc", padding: "13px 28px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Browse Courses
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prevImage(); }}
            style={{ position: "absolute", left: 24, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "85vw", maxHeight: "85vh", textAlign: "center" }}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              style={{ maxWidth: "100%", maxHeight: "75vh", borderRadius: 12, objectFit: "contain" }}
            />
            <div style={{ marginTop: 16 }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: CATEGORY_COLORS[filtered[lightbox].category],
                color: CATEGORY_TEXT[filtered[lightbox].category],
                padding: "3px 12px", borderRadius: 20, marginRight: 10,
              }}>
                {filtered[lightbox].category}
              </span>
              <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{filtered[lightbox].title}</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 8 }}>
              {lightbox + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); nextImage(); }}
            style={{ position: "absolute", right: 24, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .masonry-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .masonry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
