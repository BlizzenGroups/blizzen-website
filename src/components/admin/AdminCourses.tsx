import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Plus, Edit2, Trash2, Loader2, BookOpen, X, Save, Search } from "lucide-react";
import AdminCourseEditor from "./AdminCourseEditor";

interface Topic {
  value: string;
}

interface ModuleEntry {
  moduleName: string;
  topics: Topic[];
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  instructor: string;
  isActive: boolean;
  curriculum?: Array<{ module: string; topics: string[] }>;
}

const emptyModule = (): ModuleEntry => ({ moduleName: "", topics: [{ value: "" }] });
const emptyColumn = (): ModuleEntry[] => Array.from({ length: 5 }, () => emptyModule());

const AdminCourses = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [savingModules, setSavingModules] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [columns, setColumns] = useState<ModuleEntry[][]>([
    emptyColumn(), emptyColumn(), emptyColumn(),
  ]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    duration: "",
    instructor: "",
    level: "Beginner",
    price: 0,
  });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/courses`);
      if (response.data.success) setCourses(response.data.data);
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to fetch courses", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/courses/${editingId}`, formData);
        toast({ title: "Success", description: "Course updated successfully" });
      } else {
        await axios.post(`${API_BASE_URL}/api/courses`, formData);
        toast({ title: "Success", description: "Course created successfully" });
      }
      fetchCourses();
      resetForm();
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to save course", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/courses/${id}`);
      toast({ title: "Success", description: "Course deleted successfully" });
      fetchCourses();
      if (selectedCourse?._id === id) {
        setSelectedCourse(null);
        setColumns([emptyColumn(), emptyColumn(), emptyColumn()]);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to delete course", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course._id);
    setShowEditor(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", slug: "", description: "", shortDescription: "", duration: "", instructor: "", level: "Beginner", price: 0 });
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
      setSearchQuery(""); 
    if (course.curriculum && course.curriculum.length > 0) {
      const newCols: ModuleEntry[][] = [[], [], []];
      course.curriculum.forEach((mod, i) => {
        const colIdx = i % 3;
        newCols[colIdx].push({
          moduleName: mod.module,
          topics: mod.topics.length > 0 ? mod.topics.map(t => ({ value: t })) : [{ value: "" }],
        });
      });
      newCols.forEach((col, i) => { if (col.length === 0) newCols[i] = emptyColumn(); });
      setColumns(newCols);
    } else {
      setColumns([emptyColumn(), emptyColumn(), emptyColumn()]);
    }
    setTimeout(() => {
      document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const updateModuleName = (colIdx: number, modIdx: number, value: string) => {
    setColumns(prev => prev.map((col, ci) =>
      ci === colIdx ? col.map((mod, mi) => mi === modIdx ? { ...mod, moduleName: value } : mod) : col
    ));
  };

  const updateTopic = (colIdx: number, modIdx: number, topicIdx: number, value: string) => {
    setColumns(prev => prev.map((col, ci) =>
      ci === colIdx ? col.map((mod, mi) =>
        mi === modIdx ? { ...mod, topics: mod.topics.map((t, ti) => ti === topicIdx ? { value } : t) } : mod
      ) : col
    ));
  };

  const addTopic = (colIdx: number, modIdx: number) => {
    setColumns(prev => prev.map((col, ci) =>
      ci === colIdx ? col.map((mod, mi) =>
        mi === modIdx ? { ...mod, topics: [...mod.topics, { value: "" }] } : mod
      ) : col
    ));
  };

  const removeTopic = (colIdx: number, modIdx: number, topicIdx: number) => {
    setColumns(prev => prev.map((col, ci) =>
      ci === colIdx ? col.map((mod, mi) =>
        mi === modIdx ? { ...mod, topics: mod.topics.filter((_, ti) => ti !== topicIdx) } : mod
      ) : col
    ));
  };

  const addModule = (colIdx: number) => {
    if (columns[colIdx].length >= 20) {
      toast({ title: "Limit reached", description: "Max 20 modules per column", variant: "destructive" });
      return;
    }
    setColumns(prev => prev.map((col, ci) => ci === colIdx ? [...col, emptyModule()] : col));
  };

  const removeModule = (colIdx: number, modIdx: number) => {
    setColumns(prev => prev.map((col, ci) =>
      ci === colIdx ? col.filter((_, mi) => mi !== modIdx) : col
    ));
  };

  const handleSaveModules = async () => {
    if (!selectedCourse) {
      toast({ title: "No course selected", description: "Please select a course first", variant: "destructive" });
      return;
    }
    setSavingModules(true);
    try {
      const curriculum = columns.flatMap(col =>
        col
          .filter(mod => mod.moduleName.trim())
          .map(mod => ({
            module: mod.moduleName.trim(),
            topics: mod.topics.map(t => t.value.trim()).filter(Boolean),
          }))
      );
      await axios.put(`${API_BASE_URL}/api/courses/${selectedCourse._id}`, { curriculum });
      toast({ title: "Success", description: "Modules saved successfully" });
      fetchCourses();
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to save modules", variant: "destructive" });
    } finally {
      setSavingModules(false);
    }
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {showEditor && editingId && (
        <AdminCourseEditor
          courseId={editingId}
          onClose={() => { setShowEditor(false); setEditingId(null); }}
          onSave={() => fetchCourses()}
        />
      )}

      {/* ── Add/Edit Course Form ── */}
      <Card>
        <CardHeader><CardTitle>{editingId ? "Edit Course" : "Add New Course"}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Course Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              <Input placeholder="Slug (URL-friendly)" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
            </div>
            <RichTextEditor placeholder="Full Description" value={formData.description} onChange={value => setFormData({ ...formData, description: value })} rows={3} />
            <Input placeholder="Short Description (Brief summary for course cards)" value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} required />
            <div className="grid md:grid-cols-3 gap-4">
              <Input placeholder="Duration (e.g., 3 months)" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} />
              <Input placeholder="Instructor Name" value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} />
              <Input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                {editingId ? "Update Course" : "Add Course"}
              </Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ── Courses List ── */}
      <Card>
        <CardHeader><CardTitle>Courses List</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : courses.length === 0 ? (
            <p className="text-muted-foreground">No courses found</p>
          ) : (
            <div className="space-y-2">
              {courses.map(course => (
                <div key={course._id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${selectedCourse?._id === course._id ? "border-primary bg-primary/5" : "hover:bg-muted/30"}`}
                >
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor} • {course.duration}
                      {course.curriculum && course.curriculum.length > 0 && (
                        <span className="ml-2 text-primary font-medium">• {course.curriculum.length} modules</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(course)}><Edit2 className="w-4 h-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(course._id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Course Modules Section ── */}
      <Card id="modules-section">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Course Modules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Step 1 — Course Selector */}
          <div className="border rounded-xl p-4 bg-muted/20">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Step 1 — Select a course
            </p>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search course..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Course Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredCourses.length === 0 ? (
                <p className="text-sm text-muted-foreground">No courses found</p>
              ) : (
                filteredCourses.map(course => (
                  <button
                    key={course._id}
                    onClick={() => handleSelectCourse(course)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      selectedCourse?._id === course._id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {course.title}
                    {course.curriculum && course.curriculum.length > 0 && (
                      <span className={`ml-1.5 text-xs ${selectedCourse?._id === course._id ? "opacity-80" : "text-muted-foreground"}`}>
                        ({course.curriculum.length})
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Step 2 — 3 Column Module Editor */}
          <div className="border rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Step 2 — Add modules
                </p>
                {selectedCourse ? (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Editing: <span className="font-semibold text-primary">{selectedCourse.title}</span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-0.5">Select a course above first</p>
                )}
              </div>
              <div className="flex gap-2">
                {selectedCourse && (
                  <Button variant="outline" size="sm" onClick={() => { setSelectedCourse(null); setColumns([emptyColumn(), emptyColumn(), emptyColumn()]); }}>
                    <X className="w-4 h-4 mr-1" /> Clear
                  </Button>
                )}
                <Button size="sm" onClick={handleSaveModules} disabled={savingModules || !selectedCourse}>
                  {savingModules ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                  Save Modules
                </Button>
              </div>
            </div>

            {/* 3 Columns */}
            <div className="grid grid-cols-3 gap-6">
              {columns.map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Column {colIdx + 1}
                    </h4>
                    <span className="text-xs text-muted-foreground">{col.length}/20</span>
                  </div>

                  {col.map((mod, modIdx) => (
                    <div key={modIdx} className="border rounded-lg p-3 space-y-2 bg-muted/20">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground min-w-[18px]">{modIdx + 1}.</span>
                        <Input
                          placeholder={`Module ${modIdx + 1} name`}
                          value={mod.moduleName}
                          onChange={e => updateModuleName(colIdx, modIdx, e.target.value)}
                          className="h-8 text-sm font-medium"
                        />
                        <button onClick={() => removeModule(colIdx, modIdx)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1 pl-5">
                        {mod.topics.map((topic, topicIdx) => (
                          <div key={topicIdx} className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground w-3 flex-shrink-0">•</span>
                            <Input
                              placeholder={`Topic ${topicIdx + 1}`}
                              value={topic.value}
                              onChange={e => updateTopic(colIdx, modIdx, topicIdx, e.target.value)}
                              className="h-7 text-xs"
                            />
                            <button onClick={() => removeTopic(colIdx, modIdx, topicIdx)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addTopic(colIdx, modIdx)}
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-1 transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add Topic
                        </button>
                      </div>
                    </div>
                  ))}

                  {col.length < 20 ? (
                    <button
                      onClick={() => addModule(colIdx)}
                      className="w-full text-sm text-muted-foreground border border-dashed rounded-lg py-2 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Module
                    </button>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">Max 20 reached</p>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Save */}
            <div className="flex justify-end mt-6 pt-4 border-t">
              <Button onClick={handleSaveModules} disabled={savingModules || !selectedCourse}>
                {savingModules ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save All Modules
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourses;
