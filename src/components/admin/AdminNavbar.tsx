import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { Plus, Trash2, GripVertical, Loader2, Save } from "lucide-react";
import ImageUpload from "../ImageUpload";

interface NavLink {
  name: string;
  path: string;
  isActive: boolean;
  order: number;
}

interface NavbarData {
  _id?: string;
  logo: string;
  links: NavLink[];
  showEnquiryButton: boolean;
  enquiryButtonText: string;
}

const AdminNavbar = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [navbarData, setNavbarData] = useState<NavbarData>({
    logo: "",
    links: [],
    showEnquiryButton: true,
    enquiryButtonText: "Get Started",
  });

  useEffect(() => {
    fetchNavbar();
  }, []);

  const fetchNavbar = async () => {
    try {
      setLoading(true);
      const data = await apiService.getNavbar();
      setNavbarData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch navbar data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Send only the necessary fields, exclude MongoDB internal fields
      const updateData = {
        logo: navbarData.logo,
        links: navbarData.links.map(link => ({
          name: link.name,
          path: link.path,
          isActive: link.isActive,
          order: link.order
        })),
        showEnquiryButton: navbarData.showEnquiryButton,
        enquiryButtonText: navbarData.enquiryButtonText
      };
      await apiService.updateNavbar(updateData);
      toast({
        title: "Success",
        description: "Navbar updated successfully",
      });
      // Refresh navbar data
      await fetchNavbar();
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update navbar",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    const newLink: NavLink = {
      name: "New Link",
      path: "/",
      isActive: true,
      order: navbarData.links.length + 1,
    };
    setNavbarData({
      ...navbarData,
      links: [...navbarData.links, newLink],
    });
  };

  const removeLink = (index: number) => {
    const newLinks = navbarData.links.filter((_, i) => i !== index);
    // Reorder remaining links
    newLinks.forEach((link, i) => {
      link.order = i + 1;
    });
    setNavbarData({
      ...navbarData,
      links: newLinks,
    });
  };

  const updateLink = (index: number, field: keyof NavLink, value: any) => {
    const newLinks = [...navbarData.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setNavbarData({
      ...navbarData,
      links: newLinks,
    });
  };

  const moveLink = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === navbarData.links.length - 1)
    ) {
      return;
    }

    const newLinks = [...navbarData.links];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];

    // Update order values
    newLinks.forEach((link, i) => {
      link.order = i + 1;
    });

    setNavbarData({
      ...navbarData,
      links: newLinks,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Navbar / Header</h2>
          <p className="text-muted-foreground">Manage navigation menu and header</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Logo</Label>
            <ImageUpload
              onUpload={(url) => setNavbarData({ ...navbarData, logo: url })}
              preview={navbarData.logo}
              onRemove={() => setNavbarData({ ...navbarData, logo: "" })}
              label="Upload Logo"
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Navigation Links</CardTitle>
          <Button onClick={addLink} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {navbarData.links.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30"
            >
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => moveLink(index, "up")}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => moveLink(index, "down")}
                  disabled={index === navbarData.links.length - 1}
                >
                  ↓
                </Button>
              </div>

              <GripVertical className="w-5 h-5 text-muted-foreground" />

              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Link Name</Label>
                  <Input
                    value={link.name}
                    onChange={(e) => updateLink(index, "name", e.target.value)}
                    placeholder="e.g., Home"
                  />
                </div>
                <div>
                  <Label className="text-xs">Path</Label>
                  <Input
                    value={link.path}
                    onChange={(e) => updateLink(index, "path", e.target.value)}
                    placeholder="e.g., /"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={link.isActive}
                  onCheckedChange={(checked) => updateLink(index, "isActive", checked)}
                />
                <Label className="text-xs">Active</Label>
              </div>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeLink(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {navbarData.links.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No navigation links. Click "Add Link" to create one.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Enquiry Button */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiry Button</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Enquiry Button</Label>
              <p className="text-sm text-muted-foreground">
                Display "Get Started" button in navbar
              </p>
            </div>
            <Switch
              checked={navbarData.showEnquiryButton}
              onCheckedChange={(checked) =>
                setNavbarData({ ...navbarData, showEnquiryButton: checked })
              }
            />
          </div>

          {navbarData.showEnquiryButton && (
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={navbarData.enquiryButtonText}
                onChange={(e) =>
                  setNavbarData({ ...navbarData, enquiryButtonText: e.target.value })
                }
                placeholder="e.g., Get Started, Enroll Now"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNavbar;
