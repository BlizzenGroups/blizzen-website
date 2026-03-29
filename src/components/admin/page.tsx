"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

/* ================= TYPES ================= */
type Course = {
  id: string;
  title: string;
  duration: string;
  careerOpportunities: string;
  fee: string;
  mode: string;
  isFeatured: boolean;
};

type Feature = { id: string; title: string; description: string };
type Stat = { id: string; label: string; value: string };
type Testimonial = { id: string; name: string; role: string; quote: string };

/* ================= HELPER: API BASE ================= */
const getApiBaseUrl = () => {
  // Use environment variable first (Vercel/Render)
  if (process.env.VITE_API_URL ) return process.env.VITE_API_URL ;
  // Fallback for local dev
  return "http://localhost:5001";
};

export default function AdminPage() {
  /* ================= STATE ================= */
  const [hero, setHero] = useState({ title: "", subtitle: "", cta: "" });
  const [about, setAbout] = useState({ description: "" });

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseForm, setCourseForm] = useState<Course>({
    id: "",
    title: "",
    duration: "",
    careerOpportunities: "",
    fee: "",
    mode: "Offline",
    isFeatured: false,
  });

  const [features, setFeatures] = useState<Feature[]>([]);
  const [featureForm, setFeatureForm] = useState<Feature>({
    id: "",
    title: "",
    description: "",
  });

  const [stats, setStats] = useState<Stat[]>([]);
  const [statForm, setStatForm] = useState<Stat>({
    id: "",
    label: "",
    value: "",
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialForm, setTestimonialForm] = useState<Testimonial>({
    id: "",
    name: "",
    role: "",
    quote: "",
  });

  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const API_BASE = getApiBaseUrl();

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/landing`);
        const data = await res.json();
        if (!data) return;

        setHero(data.hero || {});
        setAbout(data.about || {});
        setCourses(data.courses || []);
        setFeatures(data.features || []);
        setStats(data.stats || []);
        setTestimonials(data.testimonials || []);
        setContact(data.contact || {});
      } catch (err) {
        console.error("Failed to load landing data:", err);
      }
    };

    loadData();
  }, [API_BASE]);

  /* ================= SAVE ALL ================= */
  const saveAll = async () => {
    const payload = {
      hero,
      about,
      courses,
      features,
      stats,
      testimonials,
      contact,
    };

    try {
      const res = await fetch(`${API_BASE}/api/landing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network response was not ok");

      alert("✅ Landing content saved successfully!");
    } catch (err) {
      console.error("Failed to save landing data:", err);
      alert("❌ Failed to save content");
    }
  };

  /* ================= HELPERS ================= */
  const removeItem = (id: string, setter: any) => {
    setter((prev: any[]) => prev.filter((item) => item.id !== id));
  };

  /* ================= UI ================= */
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Landing Page Admin Panel</h1>

      {/* HERO */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="font-semibold text-lg">Hero Section</h2>
          <Input
            placeholder="Hero Title"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
          />
          <Input
            placeholder="Subtitle"
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          />
          <Input
            placeholder="CTA Text"
            value={hero.cta}
            onChange={(e) => setHero({ ...hero, cta: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* ABOUT */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold text-lg">About Section</h2>
          <Textarea
            placeholder="About institute"
            value={about.description}
            onChange={(e) => setAbout({ description: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* COURSES */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-xl">Courses (Frontend Linked)</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Course Title"
              value={courseForm.title}
              onChange={(e) =>
                setCourseForm({ ...courseForm, title: e.target.value })
              }
            />

            <Input
              placeholder="Duration (3 Months)"
              value={courseForm.duration}
              onChange={(e) =>
                setCourseForm({ ...courseForm, duration: e.target.value })
              }
            />

            <Input
              placeholder="Career Opportunities (comma separated)"
              value={courseForm.careerOpportunities}
              onChange={(e) =>
                setCourseForm({
                  ...courseForm,
                  careerOpportunities: e.target.value,
                })
              }
            />

            <Input
              placeholder="Course Fee (₹25,000)"
              value={courseForm.fee}
              onChange={(e) =>
                setCourseForm({ ...courseForm, fee: e.target.value })
              }
            />

            <Input
              placeholder="Mode (Online / Offline)"
              value={courseForm.mode}
              onChange={(e) =>
                setCourseForm({ ...courseForm, mode: e.target.value })
              }
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={courseForm.isFeatured}
              onChange={(e) =>
                setCourseForm({ ...courseForm, isFeatured: e.target.checked })
              }
            />
            Featured Course
          </label>

          <Button
            onClick={() => {
              setCourses([...courses, { ...courseForm, id: crypto.randomUUID() }]);
              setCourseForm({
                id: "",
                title: "",
                duration: "",
                careerOpportunities: "",
                fee: "",
                mode: "Offline",
                isFeatured: false,
              });
            }}
          >
            ➕ Add Course
          </Button>

          <div className="space-y-3 pt-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {course.title}
                    {course.isFeatured && (
                      <span className="ml-2 text-xs text-primary font-bold">
                        ★ Featured
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ⏱ {course.duration} | 💻 {course.mode}
                  </p>
                  <p className="text-sm">💰 {course.fee}</p>
                  <p className="text-xs text-muted-foreground">
                    Careers: {course.careerOpportunities}
                  </p>
                </div>

                <Button variant="destructive" size="sm" onClick={() => removeItem(course.id, setCourses)}>
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FEATURES */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="font-semibold text-lg">Features</h2>
          <Input
            placeholder="Feature title"
            value={featureForm.title}
            onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={featureForm.description}
            onChange={(e) =>
              setFeatureForm({ ...featureForm, description: e.target.value })
            }
          />
          <Button
            onClick={() => {
              setFeatures([...features, { ...featureForm, id: crypto.randomUUID() }]);
              setFeatureForm({ id: "", title: "", description: "" });
            }}
          >
            Add Feature
          </Button>
        </CardContent>
      </Card>

      {/* SAVE */}
      <Button size="lg" onClick={saveAll}>
        💾 Save All Changes
      </Button>
    </div>
  );
}
