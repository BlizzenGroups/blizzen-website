import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Plus, Trash2, Home } from "lucide-react";
import { apiService } from "@/services/api";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface HomeContent {
  _id?: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  featuredCourses: string[];
  testimonials: Array<{
    name: string;
    role: string;
    message: string;
    image?: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
}

const AdminHome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [homeContent, setHomeContent] = useState<HomeContent>({
    heroTitle: "",
    heroDescription: "",
    heroImage: "",
    featuredCourses: [],
    testimonials: [
      { name: "", role: "", message: "", image: "" }
    ],
    stats: [
      { label: "", value: "" }
    ],
    callToAction: {
      title: "",
      description: "",
      buttonText: ""
    }
  });

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      const response = await apiService.getHomeContent();
      if (response.success && response.data) {
        setHomeContent(response.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch home content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await apiService.updateHomeContent(homeContent);
      if (response.success) {
        toast({
          title: "Success",
          description: "Home content updated successfully"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update home content",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addTestimonial = () => {
    setHomeContent(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: "", role: "", message: "", image: "" }]
    }));
  };

  const removeTestimonial = (index: number) => {
    setHomeContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    setHomeContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const addStat = () => {
    setHomeContent(prev => ({
      ...prev,
      stats: [...prev.stats, { label: "", value: "" }]
    }));
  };

  const removeStat = (index: number) => {
    setHomeContent(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const updateStat = (index: number, field: string, value: string) => {
    setHomeContent(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Home Page Content</h2>
            <p className="text-muted-foreground">Manage hero section, stats, testimonials and CTA</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-gradient-primary hover-glow">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <RichTextEditor
              value={homeContent.heroTitle}
              onChange={(value) => setHomeContent(prev => ({ ...prev, heroTitle: value }))}
              placeholder="Enter hero title"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="heroDescription">Hero Description</Label>
            <RichTextEditor
              value={homeContent.heroDescription}
              onChange={(value) => setHomeContent(prev => ({ ...prev, heroDescription: value }))}
              placeholder="Enter hero description"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="heroImage">Hero Image URL</Label>
            <Input
              id="heroImage"
              value={homeContent.heroImage || ""}
              onChange={(e) => setHomeContent(prev => ({ ...prev, heroImage: e.target.value }))}
              placeholder="Enter hero image URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Statistics</CardTitle>
            <Button onClick={addStat} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {homeContent.stats.map((stat, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Value</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  placeholder="e.g., 500+"
                />
              </div>
              <div className="flex-1">
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  placeholder="e.g., Students Placed"
                />
              </div>
              <Button
                onClick={() => removeStat(index)}
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Testimonials Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Testimonials</CardTitle>
            <Button onClick={addTestimonial} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {homeContent.testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Testimonial {index + 1}</h4>
                <Button
                  onClick={() => removeTestimonial(index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={testimonial.role}
                    onChange={(e) => updateTestimonial(index, "role", e.target.value)}
                    placeholder="e.g., Software Engineer at Google"
                  />
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <RichTextEditor
                  value={testimonial.message}
                  onChange={(value) => updateTestimonial(index, "message", value)}
                  placeholder="Testimonial message"
                  rows={3}
                />
              </div>
              <div>
                <Label>Image URL (Optional)</Label>
                <Input
                  value={testimonial.image || ""}
                  onChange={(e) => updateTestimonial(index, "image", e.target.value)}
                  placeholder="Profile image URL"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Call to Action Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ctaTitle">CTA Title</Label>
            <RichTextEditor
              value={homeContent.callToAction.title}
              onChange={(value) => setHomeContent(prev => ({
                ...prev,
                callToAction: { ...prev.callToAction, title: value }
              }))}
              placeholder="Enter CTA title"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="ctaDescription">CTA Description</Label>
            <RichTextEditor
              value={homeContent.callToAction.description}
              onChange={(value) => setHomeContent(prev => ({
                ...prev,
                callToAction: { ...prev.callToAction, description: value }
              }))}
              placeholder="Enter CTA description"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="ctaButtonText">Button Text</Label>
            <Input
              id="ctaButtonText"
              value={homeContent.callToAction.buttonText}
              onChange={(e) => setHomeContent(prev => ({
                ...prev,
                callToAction: { ...prev.callToAction, buttonText: e.target.value }
              }))}
              placeholder="Enter button text"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;