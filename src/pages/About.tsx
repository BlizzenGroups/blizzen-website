import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Award } from "lucide-react";
import img1 from "@/assets/img1.jpg";

const stats = [
  { value: "1000+", label: "Students Trained" },
  { value: "100%",  label: "Placement Rate" },
  { value: "100+",  label: "Hiring Partners" },
  { value: "5 Yrs", label: "Of Excellence" },
];

const About = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#ffffff", color: "#0f172a" }}>

      {/* ── HERO — Centered ── */}
      <section style={{ background: "#1e3a35",padding: "30px 0 32px", position: "relative", overflow: "hidden" }}>

        {/* SVG Background Pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${img1})`,
          opacity: 0.6,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 0,
           filter: "blur(8px)",
        }} />

        {/* Decorative lines */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${10 + i * 22}%`, top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 40, fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          </div>

          {/* ABOUT US label */}
          <p style={{ fontSize: 32, fontWeight: 900, color:"black" , letterSpacing: "3px", textTransform: "uppercase", marginBottom: 6,textAlign:"center" }}>
            About Us
          </p>

          {/* Location badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 30, padding: "5px 16px", marginBottom: 12 }}>
            <MapPin size={23} color="#c9953a" />
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "black" }}>Anna Nagar, Chennai</span>
          </div>

          {/* BIG heading */}
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "black", lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 12 }}>
            We Build Careers,{" "}
            <span style={{ color: "#93c5fd" }}>Not Just Résumés.</span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 20, color: "#1a1a1a", lineHeight: 1.8, marginBottom: 28, maxWidth: 900, margin: "0 auto 52px auto", fontWeight: 500 }}>
            BlizzenCreations is not just an institute — it's a career transformation hub.
            We are dedicated to building skilled professionals who are ready to face real-world challenges. Our training is designed with one goal:
            Every student should become employable and successful.
          </p>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, borderTop: "2px solid rgba(0,0,0,0.8)", paddingTop: 20 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 16px", borderRight: i < 3 ? "2px solid rgba(0,0,0,0.8)" : "none" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color:  "#000000" , letterSpacing: "-1px", marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 18, color: "white", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 800 }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px",   }}>
          <p style={{ fontSize: 30, fontWeight: 700, color: "#1e3a35", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 ,  }}>Who We Are</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div >
              <h2 style={{ fontSize: 46, fontWeight: 900, color: "#0f172a", letterSpacing: "-1.5px", marginBottom: 20, lineHeight: 1.1 ,  marginTop: 90, }}>
                Chennai's Premier IT & Non-IT Training Institute
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 20,  color: "#64748b", lineHeight: 1.85, marginBottom: 16 }}>
                We are a dedicated team of IT professionals, developers, digital marketers, and industry trainers who bring strong real-time experience from the field. Our goal is to bridge the gap between academic learning and industry expectations by focusing on practical, job-ready skills. We ensure that students learn exactly what companies actually need, helping them build confidence and become career-ready.
              </p>
              <p style={{ fontSize: 20,  color: "#64748b", lineHeight: 1.95 }}>
                We've trained 1000+ students across IT and Non-IT tracks, partnered with 100+ companies, and maintained a near-perfect placement record — because we design every course around what employers actually need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ padding: "80px 0", background: "#f0f7f5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 30, fontWeight: 700, color: "#1e3a35", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>What Drives Us</p>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", letterSpacing: "-1.5px", margin: 0 }}>Mission & Vision</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            {/* Mission */}
            <div style={{ background: "#1e3a35", borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <Users size={22} color="white" />
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#93c5fd", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Our Mission</p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1.3, marginBottom: 16, letterSpacing: "-0.5px" }}>
                Empowering students with practical and affordable education.
              </h3>
              <p style={{ fontSize: 19, color: "rgba(255,255,255,0.6)", lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
                We provide high-quality, hands-on learning that focuses on real-world skills and industry requirements. Our goal is to help students build confidence, gain practical knowledge, and achieve their dream careers.
              </p>
            </div>

            {/* Vision */}
            <div style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 20, padding: "48px 40px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f0f7f5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <Award size={22} color="#1e3a35" />
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1e3a35", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Our Vision</p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", lineHeight: 1.3, marginBottom: 16, letterSpacing: "-0.5px" }}>
                Becoming a leading institute for skill-based education and placements.
              </h3>
              <p style={{ fontSize: 19, color: "#64748b", lineHeight: 1.85, margin: 0 }}>
                We aim to create a strong learning ecosystem that bridges the gap between education and industry needs, helping students grow into successful professionals across India.
              </p>
            </div>
          </div>

          {/* Values strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { icon: "🎯", title: "Job-Oriented Teaching", desc: "Every module mapped to real JDs" },
              { icon: "🏭", title: "Industrial Relevant Projects", desc: "Build a real-world portfolio" },
              { icon: "👨‍💼", title: "Expert Mentors", desc: "5+ years MNC experience" },
              { icon: "🚀", title: "100% Placement", desc: "100+ hiring partners" },
            ].map((v, i) => (
              <div key={i} style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "22px 20px", transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1e3a35"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(30,58,53,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <div style={{ fontSize: 20, marginBottom: 10 }}>{v.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{v.title}</div>
                <div style={{ fontSize: 15, color: "#64748b", lineHeight: 1.5 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: "64px 0", background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.5px", marginBottom: 6 }}>Ready to start your journey?</h3>
            <p style={{ fontSize: 19, color: "#64748b", margin: 0 }}>Book a free demo class — no commitment, no pressure.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/contact">
              <button style={{ background: "#1e3a35", color: "white", border: "none", padding: "13px 28px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#f59e0b")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#1e3a35")}>
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

    </div>
  );
};

export default About;
