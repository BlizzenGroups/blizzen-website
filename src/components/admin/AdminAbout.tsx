import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import ImageUpload from "../ImageUpload";
import { apiService } from "@/services/api";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const AdminAbout = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    heroImage: "",
    heroDescription: "",
    excellenceTitle: "",
    excellenceParagraph1: "",
    excellenceParagraph2: "",
    missionTitle: "",
    missionDescription: "",
    visionTitle: "",
    visionDescription: "",
    valuesTitle: "",
    values: [
      { title: "Quality", description: "We provide quality education" },
      { title: "Innovation", description: "We innovate constantly" },
      { title: "Excellence", description: "We strive for excellence" }
    ],
    achievements: [
      { label: "Students Trained", value: "1000+" },
      { label: "Placement Rate", value: "100%" },
      { label: "Years of Experience", value: "5+" }
    ],
    whyChooseUs: {
      sectionTitle: "Why Choose Blizzen Creations?",
      sectionSubtitle: "What sets us apart from the rest",
      features: [
        { title: "Industry-Aligned Curriculum", description: "Our courses are constantly updated to reflect the latest industry trends and requirements, ensuring you learn what employers are looking for." },
        { title: "Experienced Faculty", description: "Learn from industry experts with years of hands-on experience who bring real-world projects and case studies into the classroom." },
        { title: "Dedicated Placement Support", description: "Our placement team works tirelessly to connect you with top companies, providing interview preparation, resume building, and career guidance." }
      ]
    }
  });

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      setLoading(true);
      // Clear all cache to ensure fresh data in admin
      apiService.clearCache();
      const response = await apiService.getAboutInfo();
      if (response.success && response.data) {
        // Ensure whyChooseUs has proper structure
        const data = response.data;
        setFormData({
          ...data,
          whyChooseUs: data.whyChooseUs || {
            sectionTitle: "Why Choose Blizzen Creations?",
            sectionSubtitle: "What sets us apart from the rest",
            features: []
          }
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch about info",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('Saving about data...');
      console.log('whyChooseUs:', formData.whyChooseUs);
      
      const response = await apiService.updateAboutInfo(formData);
      if (response.success) {
        console.log('✓ About info saved successfully');
        // Update local state with saved data from server
        if (response.data) {
          setFormData(response.data);
        }
        toast({ title: "Success", description: "About info updated successfully" });
      }
    } catch (error: any) {
      console.error('✗ Save error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update about info",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold">Page Title</label>
            <RichTextEditor
              placeholder="Page Title"
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
              rows={2}
            />
          </div>

          <ImageUpload
            onUpload={(url) => setFormData({ ...formData, heroImage: url })}
            label="Upload Hero Image"
            preview={formData.heroImage}
            onRemove={() => setFormData({ ...formData, heroImage: "" })}
          />

          <RichTextEditor
            value={formData.heroDescription}
            onChange={(value) => setFormData({ ...formData, heroDescription: value })}
            placeholder="Hero Description"
            rows={3}
          />

          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold text-lg">Excellence Section</h3>
            <div>
              <label className="text-sm font-medium">Excellence Title</label>
              <RichTextEditor
                placeholder="Excellence Title"
                value={formData.excellenceTitle || ""}
                onChange={(value) => setFormData({ ...formData, excellenceTitle: value })}
                rows={2}
              />
            </div>
            <RichTextEditor
              value={formData.excellenceParagraph1 || ""}
              onChange={(value) => setFormData({ ...formData, excellenceParagraph1: value })}
              placeholder="Excellence Paragraph 1"
              rows={4}
            />
            <RichTextEditor
              value={formData.excellenceParagraph2 || ""}
              onChange={(value) => setFormData({ ...formData, excellenceParagraph2: value })}
              placeholder="Excellence Paragraph 2"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Mission</label>
            <RichTextEditor
              placeholder="Mission Title"
              value={formData.missionTitle}
              onChange={(value) => setFormData({ ...formData, missionTitle: value })}
              rows={2}
            />
            <RichTextEditor
              value={formData.missionDescription}
              onChange={(value) => setFormData({ ...formData, missionDescription: value })}
              placeholder="Mission Description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Vision</label>
            <RichTextEditor
              placeholder="Vision Title"
              value={formData.visionTitle}
              onChange={(value) => setFormData({ ...formData, visionTitle: value })}
              rows={2}
            />
            <RichTextEditor
              value={formData.visionDescription}
              onChange={(value) => setFormData({ ...formData, visionDescription: value })}
              placeholder="Vision Description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Core Values</label>
            {formData.values.map((value, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 p-4 border rounded">
                <Input
                  placeholder="Value Title"
                  value={value.title}
                  onChange={(e) => {
                    const newValues = [...formData.values];
                    newValues[idx].title = e.target.value;
                    setFormData({ ...formData, values: newValues });
                  }}
                />
                <Input
                  placeholder="Value Description"
                  value={value.description}
                  onChange={(e) => {
                    const newValues = [...formData.values];
                    newValues[idx].description = e.target.value;
                    setFormData({ ...formData, values: newValues });
                  }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Achievements</label>
            {formData.achievements.map((achievement, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 p-4 border rounded">
                <Input
                  placeholder="Achievement Label"
                  value={achievement.label}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[idx].label = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                />
                <Input
                  placeholder="Achievement Value"
                  value={achievement.value}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[idx].value = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                />
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Why Choose Us Section</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentFeatures = formData.whyChooseUs?.features || [];
                  setFormData({
                    ...formData,
                    whyChooseUs: {
                      ...formData.whyChooseUs,
                      sectionTitle: formData.whyChooseUs?.sectionTitle || "Why Choose Blizzen Creations?",
                      sectionSubtitle: formData.whyChooseUs?.sectionSubtitle || "What sets us apart from the rest",
                      features: [...currentFeatures, { title: "", description: "" }]
                    }
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
            
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <RichTextEditor
                placeholder="Section Title (e.g., Why Choose Blizzen Creations?)"
                value={formData.whyChooseUs?.sectionTitle || ""}
                onChange={(value) => setFormData({
                  ...formData,
                  whyChooseUs: {
                    ...formData.whyChooseUs,
                    sectionTitle: value,
                    sectionSubtitle: formData.whyChooseUs?.sectionSubtitle || "",
                    features: formData.whyChooseUs?.features || []
                  }
                })}
                rows={2}
              />
            </div>
            
            <Input
              placeholder="Section Subtitle (e.g., What sets us apart from the rest)"
              value={formData.whyChooseUs?.sectionSubtitle || ""}
              onChange={(e) => setFormData({
                ...formData,
                whyChooseUs: {
                  ...formData.whyChooseUs,
                  sectionTitle: formData.whyChooseUs?.sectionTitle || "",
                  sectionSubtitle: e.target.value,
                  features: formData.whyChooseUs?.features || []
                }
              })}
            />

            <div className="space-y-4">
              <label className="text-sm font-medium">Features</label>
              {(formData.whyChooseUs?.features || []).map((feature, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Feature {idx + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        const newFeatures = formData.whyChooseUs?.features?.filter((_, i) => i !== idx) || [];
                        setFormData({
                          ...formData,
                          whyChooseUs: {
                            ...formData.whyChooseUs,
                            sectionTitle: formData.whyChooseUs?.sectionTitle || "",
                            sectionSubtitle: formData.whyChooseUs?.sectionSubtitle || "",
                            features: newFeatures
                          }
                        });
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Feature Title (e.g., Industry-Aligned Curriculum)"
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...(formData.whyChooseUs?.features || [])];
                      newFeatures[idx] = { ...newFeatures[idx], title: e.target.value };
                      setFormData({
                        ...formData,
                        whyChooseUs: {
                          ...formData.whyChooseUs,
                          sectionTitle: formData.whyChooseUs?.sectionTitle || "",
                          sectionSubtitle: formData.whyChooseUs?.sectionSubtitle || "",
                          features: newFeatures
                        }
                      });
                    }}
                  />
                  <RichTextEditor
                    value={feature.description}
                    placeholder="Feature Description"
                    rows={3}
                    onChange={(value) => {
                      const newFeatures = [...(formData.whyChooseUs?.features || [])];
                      newFeatures[idx] = { ...newFeatures[idx], description: value };
                      setFormData({
                        ...formData,
                        whyChooseUs: {
                          ...formData.whyChooseUs,
                          sectionTitle: formData.whyChooseUs?.sectionTitle || "",
                          sectionSubtitle: formData.whyChooseUs?.sectionSubtitle || "",
                          features: newFeatures
                        }
                      });
                    }}
                  />
                </div>
              ))}
              {(!formData.whyChooseUs?.features || formData.whyChooseUs.features.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No features added yet. Click "Add Feature" to add one.
                </p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save About Info
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAbout;
