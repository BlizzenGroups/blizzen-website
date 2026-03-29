import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Plus, Edit2, Trash2, Loader2, BarChart3, Building2, Briefcase, ArrowRight, Star } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface PlacementStats {
  _id?: string;
  placementRate: string;      // "100%"
  studentsPlaced: string;     // "1,000+"
  hiringPartners: string;     // "100+"
  avgPackage: string;         // "₹5 LPA"
}

interface Company {
  _id?: string;
  name: string;
  tier: "top" | "mid";
}

interface PlacementStep {
  _id?: string;
  num: string;          // "01"
  title: string;
  desc: string;
  icon: string;
  highlight: string;
  order: number;
}

interface CareerOpportunity {
  _id?: string;
  role: string;
  icon: string;
  desc: string;
  order: number;
}

// ── Default fallbacks (matches Placement.tsx hardcoded data) ───────────────────

const DEFAULT_STATS: PlacementStats = {
  placementRate: "100%",
  studentsPlaced: "1,000+",
  hiringPartners: "100+",
  avgPackage: "₹5 LPA",
};

const DEFAULT_COMPANIES: Company[] = [
  { name: "TCS", tier: "top" }, { name: "Infosys", tier: "top" },
  { name: "Wipro", tier: "top" }, { name: "Cognizant", tier: "top" },
  { name: "HCL", tier: "top" }, { name: "Accenture", tier: "top" },
  { name: "Amazon", tier: "top" },
  { name: "Capgemini", tier: "mid" }, { name: "Tech Mahindra", tier: "mid" },
  { name: "IBM", tier: "mid" }, { name: "Zoho", tier: "mid" },
  { name: "Freshworks", tier: "mid" }, { name: "PayPal", tier: "mid" },
  { name: "Hexaware", tier: "mid" },
];

const DEFAULT_STEPS: PlacementStep[] = [
  { num: "01", title: "Profile Assessment", desc: "We evaluate your skills, goals, and target role — then create a personalised placement roadmap.", icon: "👤", highlight: "Personalised for every student", order: 1 },
  { num: "02", title: "Resume & LinkedIn Optimisation", desc: "Our placement experts craft a job-winning resume and LinkedIn profile.", icon: "📄", highlight: "ATS-friendly resume templates", order: 2 },
  { num: "03", title: "Mock Interview Training", desc: "Face structured mock interviews — technical, aptitude, and HR rounds.", icon: "🎤", highlight: "10+ mock rounds before placement", order: 3 },
  { num: "04", title: "Exclusive Job Portal Access", desc: "Get access to our dedicated placement portal with 100+ live job openings.", icon: "🔗", highlight: "100+ active job listings", order: 4 },
  { num: "05", title: "Placement Drive Coordination", desc: "We organise on-campus and off-campus drives with hiring partners.", icon: "🏢", highlight: "Direct HR connects", order: 5 },
  { num: "06", title: "Offer & Onboarding Support", desc: "From salary negotiation to day-one onboarding — we support you fully.", icon: "🎉", highlight: "Support until day one", order: 6 },
];

const DEFAULT_CAREERS: CareerOpportunity[] = [
  { role: "Software Developer", icon: "💻", desc: "Build products at top IT companies and startups", order: 1 },
  { role: "Web Developer", icon: "🌐", desc: "Frontend, backend or full-stack development roles", order: 2 },
  { role: "Digital Marketer", icon: "📣", desc: "SEO, ads, social media & growth marketing", order: 3 },
  { role: "Freelancer", icon: "🧑‍💼", desc: "Work independently with global clients", order: 4 },
  { role: "Startup Founder", icon: "🚀", desc: "Launch your own venture with real-world skills", order: 5 },
];

// ── Component ──────────────────────────────────────────────────────────────────

const AdminPlacements = () => {
  const { toast } = useToast();

  // Stats
  const [stats, setStats] = useState<PlacementStats>(DEFAULT_STATS);
  const [statsLoading, setStatsLoading] = useState(false);

  // Companies
  const [companies, setCompanies] = useState<Company[]>(DEFAULT_COMPANIES);
  const [companyForm, setCompanyForm] = useState<Company>({ name: "", tier: "top" });
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [companyLoading, setCompanyLoading] = useState(false);

  // Steps
  const [steps, setSteps] = useState<PlacementStep[]>(DEFAULT_STEPS);
  const [stepForm, setStepForm] = useState<PlacementStep>({ num: "", title: "", desc: "", icon: "", highlight: "", order: 1 });
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [stepLoading, setStepLoading] = useState(false);

  // Careers
  const [careers, setCareers] = useState<CareerOpportunity[]>(DEFAULT_CAREERS);
  const [careerForm, setCareerForm] = useState<CareerOpportunity>({ role: "", icon: "", desc: "", order: 1 });
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [careerLoading, setCareerLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    fetchStats();
    fetchCompanies();
    fetchSteps();
    fetchCareers();
  };

  // ── Stats ──
  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/placement-stats`);
      if (res.data.success && res.data.data) setStats(res.data.data);
    } catch { /* use defaults */ }
    finally { setStatsLoading(false); }
  };

  const saveStats = async () => {
    try {
      setStatsLoading(true);
      await axios.post(`${API_BASE_URL}/api/placement-stats`, stats);
      toast({ title: "Success", description: "Placement statistics saved!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.response?.data?.message || "Failed to save stats", variant: "destructive" });
    } finally { setStatsLoading(false); }
  };

  // ── Companies ──
  const fetchCompanies = async () => {
    try {
      setCompanyLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/placement-companies`);
      if (res.data.success && res.data.data?.length) setCompanies(res.data.data);
    } catch { /* use defaults */ }
    finally { setCompanyLoading(false); }
  };

  const saveCompany = async () => {
    if (!companyForm.name.trim()) return;
    try {
      setCompanyLoading(true);
      if (editingCompanyId) {
        await axios.put(`${API_BASE_URL}/api/placement-companies/${editingCompanyId}`, companyForm);
        toast({ title: "Success", description: "Company updated!" });
      } else {
        await axios.post(`${API_BASE_URL}/api/placement-companies`, companyForm);
        toast({ title: "Success", description: "Company added!" });
      }
      setCompanyForm({ name: "", tier: "top" });
      setEditingCompanyId(null);
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Error", description: e.response?.data?.message || "Failed to save company", variant: "destructive" });
    } finally { setCompanyLoading(false); }
  };

  const deleteCompany = async (id: string) => {
    if (!confirm("Delete this company?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/placement-companies/${id}`);
      toast({ title: "Deleted", description: "Company removed" });
      fetchCompanies();
    } catch (e: any) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  // ── Steps ──
  const fetchSteps = async () => {
    try {
      setStepLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/placement-steps`);
      if (res.data.success && res.data.data?.length) setSteps(res.data.data);
    } catch { /* use defaults */ }
    finally { setStepLoading(false); }
  };

  const saveStep = async () => {
    if (!stepForm.title.trim()) return;
    try {
      setStepLoading(true);
      if (editingStepId) {
        await axios.put(`${API_BASE_URL}/api/placement-steps/${editingStepId}`, stepForm);
        toast({ title: "Success", description: "Step updated!" });
      } else {
        await axios.post(`${API_BASE_URL}/api/placement-steps`, stepForm);
        toast({ title: "Success", description: "Step added!" });
      }
      setStepForm({ num: "", title: "", desc: "", icon: "", highlight: "", order: steps.length + 1 });
      setEditingStepId(null);
      fetchSteps();
    } catch (e: any) {
      toast({ title: "Error", description: "Failed to save step", variant: "destructive" });
    } finally { setStepLoading(false); }
  };

  const deleteStep = async (id: string) => {
    if (!confirm("Delete this step?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/placement-steps/${id}`);
      toast({ title: "Deleted", description: "Step removed" });
      fetchSteps();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  // ── Careers ──
  const fetchCareers = async () => {
    try {
      setCareerLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/placement-careers`);
      if (res.data.success && res.data.data?.length) setCareers(res.data.data);
    } catch { /* use defaults */ }
    finally { setCareerLoading(false); }
  };

  const saveCareer = async () => {
    if (!careerForm.role.trim()) return;
    try {
      setCareerLoading(true);
      if (editingCareerId) {
        await axios.put(`${API_BASE_URL}/api/placement-careers/${editingCareerId}`, careerForm);
        toast({ title: "Success", description: "Career updated!" });
      } else {
        await axios.post(`${API_BASE_URL}/api/placement-careers`, careerForm);
        toast({ title: "Success", description: "Career added!" });
      }
      setCareerForm({ role: "", icon: "", desc: "", order: careers.length + 1 });
      setEditingCareerId(null);
      fetchCareers();
    } catch {
      toast({ title: "Error", description: "Failed to save career", variant: "destructive" });
    } finally { setCareerLoading(false); }
  };

  const deleteCareer = async (id: string) => {
    if (!confirm("Delete this career opportunity?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/placement-careers/${id}`);
      toast({ title: "Deleted", description: "Career removed" });
      fetchCareers();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Stats
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Companies
          </TabsTrigger>
          <TabsTrigger value="steps" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Process Steps
          </TabsTrigger>
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <Star className="w-4 h-4" /> Career Paths
          </TabsTrigger>
        </TabsList>

        {/* ── STATS TAB ── */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Placement Statistics</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">These 4 numbers appear in the stats section of the Placements page</p>
                </div>
                <Button onClick={saveStats} disabled={statsLoading} className="bg-gradient-primary">
                  {statsLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Save Statistics
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Placement Rate</Label>
                  <Input value={stats.placementRate} onChange={e => setStats(p => ({ ...p, placementRate: e.target.value }))} placeholder="e.g., 100%" />
                </div>
                <div>
                  <Label>Students Placed</Label>
                  <Input value={stats.studentsPlaced} onChange={e => setStats(p => ({ ...p, studentsPlaced: e.target.value }))} placeholder="e.g., 1,000+" />
                </div>
                <div>
                  <Label>Hiring Partners</Label>
                  <Input value={stats.hiringPartners} onChange={e => setStats(p => ({ ...p, hiringPartners: e.target.value }))} placeholder="e.g., 100+" />
                </div>
                <div>
                  <Label>Avg. Starting Package</Label>
                  <Input value={stats.avgPackage} onChange={e => setStats(p => ({ ...p, avgPackage: e.target.value }))} placeholder="e.g., ₹5 LPA" />
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-muted/50 rounded-lg mt-4">
                <h4 className="font-medium mb-3">Preview</h4>
                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                  {[
                    { val: stats.placementRate, label: "Placement Rate" },
                    { val: stats.studentsPlaced, label: "Students Placed" },
                    { val: stats.hiringPartners, label: "Hiring Partners" },
                    { val: stats.avgPackage, label: "Avg. Package" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="font-bold text-xl text-primary">{s.val || "—"}</div>
                      <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── COMPANIES TAB ── */}
        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingCompanyId ? "Edit Company" : "Add Company"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="Company Name (e.g., TCS)"
                  value={companyForm.name}
                  onChange={e => setCompanyForm(p => ({ ...p, name: e.target.value }))}
                />
                <select
                  value={companyForm.tier}
                  onChange={e => setCompanyForm(p => ({ ...p, tier: e.target.value as "top" | "mid" }))}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="top">Top Recruiter</option>
                  <option value="mid">Also Hiring</option>
                </select>
                <div className="flex gap-2">
                  <Button onClick={saveCompany} disabled={companyLoading}>
                    {companyLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    {editingCompanyId ? "Update" : "Add"}
                  </Button>
                  {editingCompanyId && (
                    <Button variant="outline" onClick={() => { setEditingCompanyId(null); setCompanyForm({ name: "", tier: "top" }); }}>Cancel</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Companies List</CardTitle></CardHeader>
            <CardContent>
              {companyLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {/* Top tier */}
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Top Recruiters</p>
                    <div className="flex flex-wrap gap-2">
                      {companies.filter(c => c.tier === "top").map((c, i) => (
                        <div key={c._id || i} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                          <Briefcase className="w-3 h-3 text-primary" />
                          <span className="text-sm font-semibold text-primary">{c.name}</span>
                          <button onClick={() => { setEditingCompanyId(c._id!); setCompanyForm({ name: c.name, tier: c.tier }); }} className="text-muted-foreground hover:text-primary">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => deleteCompany(c._id!)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Mid tier */}
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Also Hiring</p>
                    <div className="flex flex-wrap gap-2">
                      {companies.filter(c => c.tier === "mid").map((c, i) => (
                        <div key={c._id || i} className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2">
                          <Building2 className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{c.name}</span>
                          <button onClick={() => { setEditingCompanyId(c._id!); setCompanyForm({ name: c.name, tier: c.tier }); }} className="text-muted-foreground hover:text-primary">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => deleteCompany(c._id!)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── STEPS TAB ── */}
        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingStepId ? "Edit Step" : "Add Placement Process Step"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Input placeholder="Step No. (e.g., 01)" value={stepForm.num} onChange={e => setStepForm(p => ({ ...p, num: e.target.value }))} />
                <Input placeholder="Icon emoji (e.g., 👤)" value={stepForm.icon} onChange={e => setStepForm(p => ({ ...p, icon: e.target.value }))} />
                <Input placeholder="Order (1, 2, 3...)" type="number" value={stepForm.order} onChange={e => setStepForm(p => ({ ...p, order: +e.target.value }))} />
              </div>
              <Input placeholder="Step Title" value={stepForm.title} onChange={e => setStepForm(p => ({ ...p, title: e.target.value }))} />
              <Input placeholder="Highlight text (e.g., Personalised for every student)" value={stepForm.highlight} onChange={e => setStepForm(p => ({ ...p, highlight: e.target.value }))} />
              <textarea
                placeholder="Step description..."
                value={stepForm.desc}
                onChange={e => setStepForm(p => ({ ...p, desc: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={saveStep} disabled={stepLoading}>
                  {stepLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  {editingStepId ? "Update Step" : "Add Step"}
                </Button>
                {editingStepId && (
                  <Button variant="outline" onClick={() => { setEditingStepId(null); setStepForm({ num: "", title: "", desc: "", icon: "", highlight: "", order: steps.length + 1 }); }}>Cancel</Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Placement Process Steps</CardTitle></CardHeader>
            <CardContent>
              {stepLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : (
                <div className="space-y-3">
                  {[...steps].sort((a, b) => a.order - b.order).map((step, i) => (
                    <div key={step._id || i} className="flex items-start justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary">Step {step.num}</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{step.highlight}</span>
                          </div>
                          <h3 className="font-semibold mt-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" onClick={() => { setEditingStepId(step._id!); setStepForm(step); }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteStep(step._id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── CAREERS TAB ── */}
        <TabsContent value="careers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingCareerId ? "Edit Career Path" : "Add Career Opportunity"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Input placeholder="Role (e.g., Software Developer)" value={careerForm.role} onChange={e => setCareerForm(p => ({ ...p, role: e.target.value }))} />
                <Input placeholder="Icon emoji (e.g., 💻)" value={careerForm.icon} onChange={e => setCareerForm(p => ({ ...p, icon: e.target.value }))} />
                <Input placeholder="Order" type="number" value={careerForm.order} onChange={e => setCareerForm(p => ({ ...p, order: +e.target.value }))} />
              </div>
              <Input placeholder="Short description" value={careerForm.desc} onChange={e => setCareerForm(p => ({ ...p, desc: e.target.value }))} />
              <div className="flex gap-2">
                <Button onClick={saveCareer} disabled={careerLoading}>
                  {careerLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  {editingCareerId ? "Update" : "Add Career"}
                </Button>
                {editingCareerId && (
                  <Button variant="outline" onClick={() => { setEditingCareerId(null); setCareerForm({ role: "", icon: "", desc: "", order: careers.length + 1 }); }}>Cancel</Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Career Opportunities</CardTitle></CardHeader>
            <CardContent>
              {careerLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : (
                <div className="grid md:grid-cols-2 gap-3">
                  {[...careers].sort((a, b) => a.order - b.order).map((career, i) => (
                    <div key={career._id || i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{career.icon}</span>
                        <div>
                          <h3 className="font-semibold text-sm">{career.role}</h3>
                          <p className="text-xs text-muted-foreground">{career.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" onClick={() => { setEditingCareerId(career._id!); setCareerForm(career); }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteCareer(career._id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPlacements;
