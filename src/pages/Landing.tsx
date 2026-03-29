"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  Award,
  Lightbulb,
} from "lucide-react";

/* ================= DATA ================= */
const highlights = [
  { icon: Target, title: "Industry-Focused", description: "Curriculum designed with current market demands" },
  { icon: Users, title: "Expert Mentorship", description: "Learn from working IT professionals" },
  { icon: Award, title: "Job-Ready Skills", description: "Practical training with real projects" },
  { icon: Lightbulb, title: "Innovation First", description: "Stay ahead with latest technologies" },
];

/* ================= TYPES ================= */
type Course = { id: string; title: string; duration: string; careerOpportunities: string };
type Feature = { id: string; title: string; description: string };

type LandingData = {
  hero: { title: string; subtitle: string; cta: string };
  about: { description: string };
  courses: Course[];
  features: Feature[];
  contact: { phone: string; email: string; address: string };
};

export default function LandingPage() {
  const [data, setData] = useState<LandingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* ================= BASE URL ================= */
  const BASE_URL =
    process.env.VITE_API_URL ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : "https://your-backend-url.com");

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/landing`);
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        setTimeout(() => setData(json), 800); // 👈 smooth delay
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 900);
      }
    };
    fetchData();
  }, [BASE_URL]);

  /* ================= CAROUSEL ================= */
  useEffect(() => {
    if (isPaused || !data?.courses.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % data.courses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, data]);

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-lg text-muted-foreground animate-pulse">
          Preparing your learning journey…
        </p>

        <div className="grid md:grid-cols-3 gap-4 w-full max-w-5xl mt-10 px-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data)
    return <div className="p-10 text-center text-red-500">Failed to load page</div>;

  const prev = () =>
    setCurrentIndex((p) => (p - 1 + data.courses.length) % data.courses.length);
  const next = () =>
    setCurrentIndex((p) => (p + 1) % data.courses.length);

  const handleApplyNow = (course: string) => {
    const msg = encodeURIComponent(
      `Hi! I'm interested in the ${course} course at Blizzen Creations.`
    );
    window.open(`https://wa.me/919884264816?text=${msg}`, "_blank");
  };

  return (
    <main className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center justify-center pt-24 text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {data.hero.title}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            {data.hero.subtitle}
          </p>

          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#contact">
                Enroll Now <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://wa.me/919884264816" target="_blank">
                <Play className="mr-2" /> Free Demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="scroll-mt-24 p-10 bg-secondary/30">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why Choose <span className="text-primary">Blizzen Creations</span>?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-justify">
              {data.about.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-background p-6 rounded-xl border hover:shadow-lg transition-all"
              >
                <h.icon className="text-primary mb-3" />
                <h3 className="font-semibold">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section id="courses" className="scroll-mt-24 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Launch Your <span className="text-primary">IT Career</span>
          </h2>
        </div>

        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button onClick={prev} className="absolute -left-6 top-1/2">←</button>
          <button onClick={next} className="absolute -right-6 top-1/2">→</button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {data.courses.map((course) => (
                <div key={course.id} className="min-w-full px-2">
                  <Card>
                    <CardHeader className="bg-primary text-white text-center">
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6">
                      <div className="flex gap-6 justify-center">
                        <div className="flex gap-2 items-center">
                          <Clock className="text-primary" />
                          {course.duration}
                        </div>
                        <div className="flex gap-2 items-center">
                          <TrendingUp className="text-primary" />
                          ₹4–12 LPA
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Career Opportunities</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {course.careerOpportunities.split(",").map((r, i) => (
                            <Badge key={i} variant="outline">
                              {r.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Real-time projects",
                          "Placement support",
                          "Interview preparation",
                          "Expert mentorship",
                        ].map((item, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <CheckCircle2 className="text-primary w-5 h-5" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* ❌ PRICE REMOVED HERE */}
                    <CardFooter className="justify-center">
                      <Button size="lg" onClick={() => handleApplyNow(course.title)}>
                        Apply Now <ArrowRight className="ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
            <section id="contact" className="section-padding p-10 bg-gradient-to-b from-background to-muted/30">
      <div className="text-center max-w-4xl mx-auto mb-16">
      <span className="inline-block text-primary font-semibold mb-4 uppercase tracking-wider text-sm">
        Get In Touch
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        Start Your IT Career Journey Today
      </h2>
      <p className="text-lg text-muted-foreground">
        Have questions? We'd love to hear from you. Send us a message and we'll
        respond within 24 hours.
      </p>
    </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {/* Phone */}
      {data.contact.phone && (
        <div className="group bg-background rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition">
            📞
          </div>
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p className="text-muted-foreground">{data.contact.phone}</p>
        </div>
      )}

      {/* Email */}
      {data.contact.email && (
        <div className="group bg-background rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition">
            ✉️
          </div>
          <h3 className="text-lg font-semibold mb-1">Email Us</h3>
          <p className="text-muted-foreground break-all">
            {data.contact.email}
          </p>
        </div>
      )}

      {/* Address */}
      {data.contact.address && (
        <div className="group bg-background rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition">
            📍
          </div>
          <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
          <p className="text-muted-foreground">{data.contact.address}</p>
        </div>
      )}
    </div>
      </section>

    </main>
  );
}
