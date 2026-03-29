import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { ArrowRight, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  highlights: string[];
}

// Static fallback courses matching the design in the image
export const STATIC_COURSES = [
  // IT COURSES
  {
    _id: "1",
    title: "Front-End Web Development",
    slug: "frontend-web-development",
    description: "HTML, CSS, JavaScript, React",
    highlights: ["HTML", "CSS", "React"],
    type: "IT",
    emoji: "💻",
    bg: "#ccfbf1", // teal-100
  },
  {
    _id: "2",
    title: "Python Programming",
    slug: "python-programming",
    description: "Learn Python from basics to advanced",
    highlights: ["Python", "Logic", "Projects"],
    type: "IT",
    emoji: "🐍",
    bg: "#fef3c7", // amber-100
  },
  {
    _id: "3",
    title: "Java Programming",
    slug: "java-programming",
    description: "Core Java + OOP concepts",
    highlights: ["OOP", "Java", "Practice"],
    type: "IT",
    emoji: "☕",
    bg: "#ccfbf1",
  },
  {
    _id: "4",
    title: "C & C++ Programming",
    slug: "c-cpp-programming",
    description: "Programming fundamentals with C & C++",
   
    highlights: ["C", "C++", "Logic"],
    type: "IT",
    emoji: "💡",
    bg: "#fef3c7",
  },
  {
    _id: "5",
    title: "Data Analytics & Big Data",
    slug: "data-analytics-big-data",
    description: "Data analysis using modern tools",
  
    highlights: ["Data", "Analytics", "Tools"],
    type: "IT",
    emoji: "📊",
    bg: "#ccfbf1",
  },
  {
    _id: "6",
    title: "DevOps & Automation Engineering",
    slug: "devops-automation",
    description: "CI/CD, Docker, Automation",
  
    highlights: ["Docker", "CI/CD", "Automation"],
    type: "IT",
    emoji: "⚙️",
    bg: "#fef3c7",
  },
  {
    _id: "7",
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI from fundamentals to advanced",
    
    highlights: ["AI", "ML", "Deep Learning"],
    type: "IT",
    emoji: "🤖",
    bg: "#ccfbf1",
  },
  {
    _id: "8",
    title: "iOS App Development",
    slug: "ios-development",
    description: "Swift & SwiftUI development",
   
    highlights: ["Swift", "iOS", "Apps"],
    type: "IT",
    emoji: "📱",
    bg: "#fef3c7",
  },
  {
    _id: "9",
    title: "Deep Learning",
    slug: "deep-learning",
    description: "TensorFlow & Keras",
   
    highlights: ["TensorFlow", "Keras", "AI"],
    type: "IT",
    emoji: "🧠",
    bg: "#ccfbf1",
  },
  {
    _id: "10",
    title: "AWS Cloud & DevOps",
    slug: "aws-cloud-devops",
    description: "Cloud computing with AWS",
  
    highlights: ["AWS", "Cloud", "DevOps"],
    type: "IT",
    emoji: "☁️",
    bg: "#fef3c7",
  },
  {
    _id: "11",
    title: "Golang & REST API",
    slug: "golang-rest-api",
    description: "Backend development with Go",
   
    highlights: ["Go", "API", "Backend"],
    type: "IT",
    emoji: "🚀",
    bg: "#ccfbf1",
  },
  {
    _id: "12",
    title: "Full Stack .NET Development",
    slug: "dotnet-development",
    description: "C#, ASP.NET Core & SQL",
    
    highlights: ["C#", ".NET", "SQL"],
    type: "IT",
    emoji: "💼",
    bg: "#fef3c7",
  },
  {
    _id: "13",
    title: "Advanced PHP & MySQL",
    slug: "php-mysql",
    description: "Dynamic web development",
   
    highlights: ["PHP", "MySQL", "Web"],
    type: "IT",
    emoji: "🌐",
    bg: "#ccfbf1",
  },
  {
    _id: "14",
    title: "Software Testing",
    slug: "software-testing",
    description: "Manual & Automation testing",
   
    highlights: ["Selenium", "API", "Testing"],
    type: "IT",
    emoji: "🧪",
    bg: "#fef3c7",
  },
  {
    _id: "15",
    title: "Cybersecurity Fundamentals",
    slug: "cybersecurity",
    description: "Security basics & ethical hacking",
   
    highlights: ["Security", "Hacking", "Network"],
    type: "IT",
    emoji: "🔐",
    bg: "#ccfbf1",
  },
  {
    _id: "16",
    title: "AI Prompt Engineering",
    slug: "prompt-engineering",
    description: "Master AI tools like ChatGPT",
  
    highlights: ["AI", "Prompt", "Tools"],
    type: "IT",
    emoji: "✨",
    bg: "#fef3c7",
  },

  // NON-IT COURSES
  {
    _id: "17",
    title: "UI / UX Design",
    slug: "ui-ux",
    description: "Design with Figma & user research",
   
    highlights: ["Figma", "Design", "UX"],
    type: "Non-IT",
    emoji: "🎨",
    bg: "#fef3c7",
  },
  {
    _id: "18",
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "SEO, Ads & Social Media",
    
    highlights: ["SEO", "Ads", "Marketing"],
    type: "Non-IT",
    emoji: "📣",
    bg: "#ccfbf1",
  },
  {
    _id: "19",
    title: "Spoken English Mastery",
    slug: "spoken-english",
    description: "Improve communication skills",
  
    highlights: ["Speaking", "Grammar", "Fluency"],
    type: "Non-IT",
    emoji: "🗣️",
    bg: "#fef3c7",
  },
  {
    _id: "20",
    title: "Tally & GST",
    slug: "tally-gst",
    description: "Accounting with Tally & GST",
   
    highlights: ["Tally", "GST", "Accounts"],
    type: "Non-IT",
    emoji: "🧮",
    bg: "#ccfbf1",
  },
  {
    _id: "21",
    title: "Graphic Design & Branding",
    slug: "graphic-design",
    description: "Creative design and branding",
   
    highlights: ["Design", "Branding", "Creative"],
    type: "Non-IT",
    emoji: "🖌️",
    bg: "#fef3c7",
  },
  {
    _id: "22",
    title: "Advanced SAP",
    slug: "sap-course",
    description: "Enterprise resource planning tools",
   
    highlights: ["SAP", "ERP", "Business"],
    type: "Non-IT",
    emoji: "🏢",
    bg: "#ccfbf1",
  },
];

const Courses = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<any[]>(STATIC_COURSES);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"All" | "IT" | "Non-IT">("All");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/courses/it") setSelectedFilter("IT");
    else if (location.pathname === "/courses/non-it") setSelectedFilter("Non-IT");
    else setSelectedFilter("All");
    setShowAll(false);
  }, [location.pathname]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCourses();
      if (data.success && data.data.length > 0) {
        const enriched = data.data.map((course: Course, i: number) => ({
          ...course,
          type: getCourseType(course),
          emoji: STATIC_COURSES[i % STATIC_COURSES.length]?.emoji ?? "📘",
          bg: STATIC_COURSES[i % STATIC_COURSES.length]?.bg ?? "#ccfbf1",
        }));
        setCourses(enriched);
      }
    } catch (error: any) {
      // silently fall back to static data
    } finally {
      setLoading(false);
    }
  };

  const getCourseType = (course: Course): "IT" | "Non-IT" => {
    const title = course.title.toLowerCase();
    const nonIT = ["marketing", "tally", "accounts", "ui", "ux", "design", "hr", "finance"];
    return nonIT.some((k) => title.includes(k)) ? "Non-IT" : "IT";
  };

  const filteredCourses =
    selectedFilter === "All"
      ? courses
      : courses.filter((c) => c.type === selectedFilter);

  const displayedCourses = showAll
  ? filteredCourses
  : filteredCourses.slice(0, selectedFilter === "Non-IT" ? 6 : 10);

  return (
    <div style={{ background: "#f0fdfa", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* ↑ was: #f3f2fa (purple tint) → now: #f0fdfa (teal-50) */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px 60px" }}>

        {/* Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          {/* Left: Title */}
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, color: "#0d9488", textTransform: "uppercase", marginBottom: 6 }}>
              {/* ↑ was: #6c63ff → now: teal-600 */}
              WHAT WE OFFER
            </p>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#111", margin: 0, lineHeight: 1.1 }}>
              Our Courses
            </h2>
            <p style={{ color: "#888", marginTop: 8, fontSize: 23 }}>
              #1 IT & Non-IT Training Institute in Anna Nagar, Chennai
            </p>
          </div>

          {/* Right: Filter tabs */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {(["All", "IT Courses", "Non-IT Courses"] as const).map((label) => {
              const val = label === "IT Courses" ? "IT" : label === "Non-IT Courses" ? "Non-IT" : "All";
              const isActive = selectedFilter === val;
              return (
                <button
                  key={label}
                  onClick={() => setSelectedFilter(val as any)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 999,
                    border: isActive ? "none" : "1.5px solid #ddd",
                    background: isActive ? "#0d9488" : "#fff",
                    // ↑ was: #6c63ff → now: teal-600
                    color: isActive ? "#fff" : "#555",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <Loader2 style={{ width: 32, height: 32, color: "#0d9488", animation: "spin 1s linear infinite" }} />
            {/* ↑ was: #6c63ff → now: teal-600 */}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
          gridTemplateColumns: selectedFilter === "Non-IT" 
  ? "repeat(3, 1fr)" 
  : "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {displayedCourses.map((course, index) => (
              <Link
                key={course._id}
                to={`/courses/${course.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "24px 20px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    border: "1px solid #99f6e4",
                    // ↑ was: #ede9f8 (purple tint) → now: teal-200
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(13,148,136,0.13)";
                    // ↑ was: rgba(108,99,255,0.13) → now: teal shadow
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Number watermark */}
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 18,
                      fontSize: 38,
                      fontWeight: 900,
                      color: "#99f6e4",
                      // ↑ was: #ede9f8 → now: teal-200
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: course.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      marginBottom: 18,
                    }}
                  >
                    {course.emoji}
                  </div>

                  {/* Title */}
                  <h3
                    style={{ fontSize: 19, fontWeight: 800, color: "#111", margin: "0 0 8px" }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(course.title) }}
                  />

                  {/* Description */}
                <p
  style={{ fontSize: 16, color: "#777", margin: "0 0 20px", lineHeight: 1.5, textAlign: "left" }}
  dangerouslySetInnerHTML={{ __html: sanitizeHtml(course.description) }}
/>

                  {/* Footer: badge + duration + arrow */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        background: course.type === "IT" ? "#ccfbf1" : "#fef3c7",
                        // ↑ was: IT → #ede9f8 (purple), Non-IT → #fff9db
                        color: course.type === "IT" ? "#0d9488" : "#d97706",
                        // ↑ was: IT → #6c63ff (purple), Non-IT → #b7791f
                      }}
                    >
                      {course.type}
                    </span>
                    <span style={{ fontSize: 12, color: "#aaa" }}>{course.duration}</span>
                    <span style={{ marginLeft: "auto", color: "#0d9488", display: "flex", alignItems: "center" }}>
                      {/* ↑ was: #6c63ff → now: teal-600 */}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              background: "#0d9488",
              // ↑ was: #6c63ff → now: teal-600
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {showAll ? "View Less" : "View All Courses"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Courses;
