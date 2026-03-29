import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Star, Loader2, CheckCircle } from "lucide-react";
import heroImage from "@/assets/bg2.jpeg";
import { apiService } from "@/services/api";
import CountUp from "@/components/CountUp";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { STATIC_COURSES } from "./Courses";
import EnquiryPopup from "@/components/EnquiryPopup";

interface HomeContent {
  _id: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  featuredCourses: string[];
  testimonials: Array<{ name: string; role: string; message: string; image?: string }>;
  stats: Array<{ label: string; value: string }>;
  callToAction: { title: string; description: string; buttonText: string };
}

interface Course {
  _id: string; title: string; slug: string; description: string;
  shortDescription: string; duration: string; level: string;
  instructor: string; image?: string; highlights: string[];
}

interface TrustStats {
  studentCount: string; studentLabel: string;
  ratingPlatforms: Array<{ name: string; rating: number; icon: string; color: string; isActive: boolean }>;
}

const Home = () => {
  const { toast } = useToast();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [trustStats, setTrustStats] = useState<TrustStats>({
    studentCount: '1,000+', studentLabel: 'Students Alumni',
    ratingPlatforms: [
      { name: 'Trustpilot', rating: 4.8, icon: 'trustpilot', color: '#00b67a', isActive: true },
      { name: 'Google', rating: 4.9, icon: 'google', color: '#4285F4', isActive: true },
      { name: 'Microsoft', rating: 4.7, icon: 'microsoft', color: '#00a4ef', isActive: true }
    ],
  });
  const [loading, setLoading] = useState(true);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => { fetchHomeContent(); }, []);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      const [homeData, coursesData, trustData] = await Promise.all([
        apiService.getHomeContent(), apiService.getCourses(), apiService.getTrustStats()
      ]);
      if (homeData.success) {
        setHomeContent({
          ...homeData.data,
          stats: [
            { label: 'Students Trained', value: '1000+' },
            { label: 'Placement Rate', value: '100%' },
            { label: 'Average Salary', value: '₹5 LPA' },
          ]
        });
      }
      if (coursesData.success && coursesData.data.length > 0) {
        // Always ensure 6 courses — fill from STATIC_COURSES if API returns fewer
        const apiCourses = coursesData.data.slice(0, 6);
        const merged = [...apiCourses];
        if (merged.length < 6) {
          const extras = STATIC_COURSES.slice(merged.length, 6) as any[];
          merged.push(...extras);
        }
        setFeaturedCourses(merged);
      } else {
        setFeaturedCourses(STATIC_COURSES.slice(0, 6) as any[]);
      }
      if (trustData) {
        setTrustStats({
          ...trustData,
          ratingPlatforms: [
            ...(trustData.ratingPlatforms || []),
            { name: 'Microsoft', rating: 4.7, icon: 'microsoft', color: '#00a4ef', isActive: true }
          ]
        });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to fetch content", variant: "destructive" });
    } finally { setLoading(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#1e3a35' }} />
    </div>
  );

  if (!homeContent) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
        <p className="text-gray-500">Home page content is not available</p>
      </div>
    </div>
  );

  const courseIcons = ['💻','📊','🔒','☁️','📢','🎨'];
  const courseColors = ['#d4eae4','#fef9c3','#fce7f3','#d4eae4','#fef3c7','#f3e8ff'];
  const companies = ['Zoho','HTC','FreshWorks','Kissflow','Infoview','Indium','Aspire','Ramco','intellect','Saksoft','Waycool','Payoda','Prodapt','Bahwan Cybertek','Gofrugal','TVS NEXT','ContusTech','Ideas IT','cavinkare','Gofrugal','Data Patterns','Chargebee','Visteon','KaarTech'];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#ffffff', color: '#0f172a' }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div style={{ background: '#363b39', padding: '8px 16px', textAlign: 'center' }}>
        <span style={{ color: 'white', fontSize: '12px', fontWeight: 600, letterSpacing: '0.3px' }}>
          🎓 New Batch Starting &nbsp;
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '20px', fontWeight: 700 }}>April 10, 2026</span>
          &nbsp; — Limited Seats! &nbsp;
          <Link to="/contact" style={{ color: 'white', textDecoration: 'underlin  e', fontWeight: 700 }}>Enroll Now →</Link>
        </span>
      </div>

      {/* ── HERO ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh' }}>

        {/* LEFT */}
        <div style={{
          background: '#1e3a35',
          padding: '60px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#a7c4bc', fontSize: 17, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 30, width: 'fit-content', marginBottom: 28, marginTop:-110 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9953a', display: 'inline-block', animation: 'pulse 1s infinite' }} />
            Chennai's Premier IT Institute
          </div>

          <h1 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(28px,3.5vw,48px)', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 20 }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(homeContent.heroTitle) }} />

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, marginBottom: 32, maxWidth: 420, fontWeight: 300 }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(homeContent.heroDescription) }} />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/courses">
              <button style={{ background: 'white', color: '#1e3a35', border: 'none', padding: '12px 28px', borderRadius: 8, fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                Explore Courses <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.3)', padding: '12px 28px', borderRadius: 8, fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>
                Book Free Demo
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28 }}>
            {homeContent.stats.slice(0, 3).map((stat, i) => {
              const match = stat.value.match(/^([\d,]+)(.*)$/);
              const number = match ? parseInt(match[1].replace(/,/g, '')) : 0;
              const suffix = match ? match[2] : stat.value;
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: '#c9953a', letterSpacing: '-1px' }}>
                    {number > 0 ? <CountUp end={number} duration={2500} suffix={suffix} /> : stat.value}
                  </div>
                  <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 4 }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ background: '#f0f7f5', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, borderLeft: '4px solid #1e3a35' }}>

          {/* Free Demo Booking Card */}
          <p style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 4 }}>Book Free Demo</p>
          <div style={{ background: 'white', borderRadius: 14, padding: '20px 22px', border: '1px solid #a7c4bc', boxShadow: '0 2px 12px rgba(30,58,53,0.06)' }}>
            <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 14 }}>Pick a Time Slot</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {['🌅 Morning\n9AM - 12PM', '☀️ Afternoon\n12PM - 3PM', '🌆 Evening\n5PM - 8PM', '📅 Weekend\nSpecial Batch'].map((slot, i) => {
                const [emoji, time] = slot.split('\n');
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: 10,
                      border: selectedSlot === slot ? '2px solid #1e3a35' : '1.5px solid #d4eae4',
                      background: selectedSlot === slot ? '#1e3a35' : '#f0f7f5',
                      color: selectedSlot === slot ? 'white' : '#1e3a35',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>{emoji}</div>
                    <div style={{ fontSize: 11, marginTop: 2, opacity: 0.85 }}>{time}</div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              style={{ width: '100%', background: '#1e3a35', color: 'white', border: 'none', padding: '11px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            >
              Book My Free Demo →
            </button>
          </div>

          <p style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 4 }}>Quick Enquiry</p>
          <div style={{ background: 'white', borderRadius: 14, padding: '20px 22px', border: '1px solid #a7c4bc', boxShadow: '0 2px 12px rgba(30,58,53,0.06)' }}>
            <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 17, marginBottom: 16 }}>Get a Free Callback Today</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input value={enquiryName} onChange={e => setEnquiryName(e.target.value)}
                placeholder="Your Full Name"
                style={{ border: '1.5px solid #d4eae4', background: '#f0f7f5', borderRadius: 8, padding: '10px 14px', fontSize: 17, width: '100%', outline: 'none', color: '#0f172a', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={enquiryPhone} onChange={e => setEnquiryPhone(e.target.value)}
                  placeholder="Phone Number"
                  style={{ flex: 1, border: '1.5px solid #d4eae4', background: '#f0f7f5', borderRadius: 8, padding: '10px 14px', fontSize: 17, outline: 'none', color: '#0f172a', minWidth: 0 }} />
                <Link to={`/contact?name=${encodeURIComponent(enquiryName)}&phone=${encodeURIComponent(enquiryPhone)}`}>
  <button style={{ background: '#1e3a35', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: 17, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    Call Me →
  </button>
</Link>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
            <span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Alumni at</span>
            {['TCS','Infosys','Wipro','HCL','Cognizant'].map(c => (
              <span key={c} style={{ fontSize: 17, fontWeight: 700, color: '#1e3a35', background: '#d4eae4', padding: '3px 12px', borderRadius: 4 }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANIES TICKER ── */}
 {/* ── COMPANIES TICKER ── */}
<div style={{ background: '#f1f5f9', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
  <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#94a3b8', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10 }}>Our Alumni Work At</p>
  <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
    <div style={{ display: 'flex', width: 'max-content', animation: 'companiesTicker 60s linear infinite' }}>
      {/* ✅ Render 4 copies so there's no gap when looping */}
      {[...companies, ...companies, ...companies, ...companies].map((co, i) => (
        <span key={i} style={{ fontSize: 18, fontWeight: 600, color: '#475569', background: 'white', border: '1px solid #e2e8f0', padding: '5px 16px', borderRadius: 6, flexShrink: 0, marginRight: 12, whiteSpace: 'nowrap' }}>{co}</span>
      ))}
    </div>
  </div>
</div>

      {/* ── STATS BAND ── */}
      <section style={{ background: '#1e3a35', padding: '40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {homeContent.stats.map((stat, i) => {
              const match = stat.value.match(/^([\d,]+)(.*)$/);
              const number = match ? parseInt(match[1].replace(/,/g, '')) : 0;
              const suffix = match ? match[2] : stat.value;
              return (
                <div key={i} style={{ textAlign: 'center', padding: '16px 8px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>
                    {number > 0 ? <CountUp end={number} duration={2500} suffix={suffix} /> : stat.value}
                  </div>
                  <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 4 }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section style={{ padding: '64px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#1e3a35', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 6 }}>What We Offer</p>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>Our Courses</h2>
              <p style={{ fontSize: 25, color: '#64748b', marginTop: 6 }}>#1 IT & Non-IT Training Institute in Anna Nagar, Chennai</p>
            </div>
          </div>

          {featuredCourses.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {/* ✅ FIXED: was slice(0, 5) — now shows all 6 */}
              {featuredCourses.slice(0, 6).map((course, i) => (
                <div key={course._id} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '22px 20px', position: 'relative', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e3a35'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(30,58,53,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                  <span style={{ position: 'absolute', top: 14, right: 18, fontSize: 40, fontWeight: 900, color: '#f0f7f5', lineHeight: 1, userSelect: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: courseColors[i] || '#d4eae4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14 }}>
                    {courseIcons[i] || '📚'}
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(course.title) }} />
                  <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.6, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(course.shortDescription || course.description) }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, background: '#d4eae4', color: '#1e3a35', padding: '3px 10px', borderRadius: 20 }}>{course.level}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, background: '#f1f5f9', color: '#64748b', padding: '3px 10px', borderRadius: 20 }}>{course.duration}</span>
                    </div>
                    <Link to={`/courses/${course.slug}`}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#1e3a35' }}>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>Loading courses...</div>
          )}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/courses">
              <button style={{ background: '#1e3a35', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 8, fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View All Courses <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY BLIZZEN ── */}
      <section style={{ padding: '64px 0', background: '#f0f7f5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#1e3a35', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10 }}>Why Choose us</p>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', marginBottom: 16 }}>
                Not Just Training.<br /><span style={{ color: '#1e3a35' }}>Transformation.</span>
              </h2>
              <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.8, marginBottom: 24 }}>
                We don't just teach — we build careers. Every course at Blizzen is designed with one goal: get you placed in your dream company with a great salary.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['🎯 Job-Oriented Teaching','🚀 100% Placement','🏭 Industry Relevant Projects','🤝 Placement Support','📜 Industrial Top Certification','💳 No Cost EMI'].map(tag => (
                  <span key={tag} style={{ fontSize: 18, fontWeight: 600, color: '#1e3a35', border: '1px solid #a7c4bc', padding: '5px 14px', borderRadius: 30, background: 'white' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: '🎯', title: '100% Job-Oriented Teaching', desc: 'Every module mapped to real job descriptions and interview patterns from top companies.' },
                { icon: '🏭', title: 'Industry Relevant Projects', desc: 'Work on real industry projects and build an impressive portfolio for interviews.' },
                { icon: '👨‍💼', title: 'Expert Trainers', desc: 'Learn from professionals with 10+ years of hands-on MNC experience.' },
                { icon: '🚀', title: 'Placement Support', desc: 'Mock interviews, resume building, and 100+ hiring partners to land your dream job.' },
              ].map((feat, i) => (
                <div key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px 18px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e3a35'; (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)'; }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{feat.icon}</div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{feat.title}</h4>
                  <p style={{ fontSize: 17, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section style={{ padding: '64px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 2, fontWeight: 700, color: '#1e3a35', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 8 }}>Trusted By</p>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', marginBottom: 40 }}>
            Trusted by <span style={{ color: '#1e3a35' }}>{trustStats.studentCount}</span> {trustStats.studentLabel}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            {trustStats.ratingPlatforms.filter(p => p.isActive).map((platform, i) => (
              <div key={i} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '32px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: '#1e3a35', marginBottom: 4 }}>{platform.rating.toFixed(1)}</div>
                <div style={{ fontSize: 18, color: '#94a3b8', marginBottom: 10 }}>Ratings on</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Star size={18} style={{ color: platform.color }} />
                  <span style={{ fontWeight: 700, fontSize: 18, color: '#0f172a' }}>{platform.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, si) => <Star key={si} size={12} style={{ color: '#facc15', fill: '#facc15' }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '64px 0', background: '#f0f7f5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 25, fontWeight: 700, color: '#1e3a35', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 8 }}>Student Success</p>
            <h2 style={{ fontSize: 45, fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>Student Testimonials</h2>
            <p style={{ fontSize: 23, color: '#64748b', marginTop: 8 }}>Hear from our successful students</p>
          </div>
        </div>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div style={{ display: 'flex', width: 'max-content', gap: 16, paddingLeft: 24, animation: 'testimonialsTicker 30s linear infinite' }}>
            {[...homeContent.testimonials, ...homeContent.testimonials].map((t, i) => (
              <div key={i} style={{ flexShrink: 0, width: 300, background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '22px 20px' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {[...Array(5)].map((_, si) => <Star key={si} size={13} style={{ color: '#facc15', fill: '#facc15' }} />)}
                </div>
                <p style={{ fontSize: 17, color: '#64748b', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20, minHeight: 80 }}
                  dangerouslySetInnerHTML={{ __html: `"${sanitizeHtml(t.message)}"` }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1e3a35', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 17, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 17, color: '#94a3b8', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '40px 0', background: '#31849b' }}>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 25, fontWeight: 700, color: 'rgba(19, 6, 19, 0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Get Started Today</p>
          <h2 style={{ fontSize: 40, fontWeight: 900, color: 'white', letterSpacing: '-1.5px', marginBottom: 16 }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(homeContent.callToAction.title) }} />
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 15 }}>
            Join thousands of successful students and launch your IT, digital marketing, and software development careers with our industry-recognised training programs in Chennai.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Link to="/courses">
              <button style={{ background: 'white', color: '#1e3a35', border: 'none', padding: '13px 32px', borderRadius: 15, fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                {homeContent.callToAction.buttonText} <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', padding: '13px 32px', borderRadius: 15, fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>
                Contact Us
              </button>
            </Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px' }}>
            {['Free Demo Class','Weekdays & Weekend Batches','100% Placement Assistance','No Cost EMI','Expert', 'Industry Certification'].map(pt => (
              <span key={pt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 18, color: 'rgb(255, 255, 255)', fontWeight: 500 }}>
                <CheckCircle size={19} style={{ color: 'white' }} /> {pt}
              </span>
            ))}
          </div>
        </div>
      </section>

      <EnquiryPopup isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />

            <style>{`
        @keyframes companiesTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes testimonialsTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default Home;
