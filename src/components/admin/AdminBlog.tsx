import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Image, Building2, Link2, ExternalLink, Globe, Instagram, Twitter, Youtube, Facebook, Linkedin } from "lucide-react";
import ImageUpload from "../ImageUpload";

// ─── Types ───────────────────────────────────────────────
interface MediaImage {
  id: string;
  url: string;
  title: string;
  uploadedAt: string;
}

interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
}

interface LinkItem {
  id: string;
  label: string;
  url: string;
  type: "social" | "resource";
  platform?: string;
}

// ─── Tab type ─────────────────────────────────────────────
type Tab = "images" | "companies" | "links";

const SOCIAL_PLATFORMS = ["Instagram", "Twitter", "YouTube", "Facebook", "LinkedIn", "Other"];

const platformIcon = (platform?: string) => {
  switch (platform) {
    case "Instagram": return <Instagram size={14} />;
    case "Twitter":   return <Twitter size={14} />;
    case "YouTube":   return <Youtube size={14} />;
    case "Facebook":  return <Facebook size={14} />;
    case "LinkedIn":  return <Linkedin size={14} />;
    default:          return <Globe size={14} />;
  }
};

// ─────────────────────────────────────────────────────────
const AdminMedia = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("images");

  // ── Images state ──
  const [images, setImages] = useState<MediaImage[]>([]);
  const [imgDialog, setImgDialog] = useState(false);
  const [imgTitle, setImgTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // ── Companies state ──
  const [companies, setCompanies] = useState<Company[]>([]);
  const [compDialog, setCompDialog] = useState(false);
  const [editingComp, setEditingComp] = useState<Company | null>(null);
  const [compForm, setCompForm] = useState({ name: "", logo: "", website: "" });

  // ── Links state ──
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [linkDialog, setLinkDialog] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [linkForm, setLinkForm] = useState({ label: "", url: "", type: "social" as "social" | "resource", platform: "Instagram" });

  // ══════════════════════════════════════════════════════
  // IMAGE HANDLERS
  // ══════════════════════════════════════════════════════
  const handleAddImage = () => {
    if (!imgUrl) return toast({ title: "Error", description: "Please upload an image", variant: "destructive" });
    const newImg: MediaImage = {
      id: Date.now().toString(),
      url: imgUrl,
      title: imgTitle || "Untitled",
      uploadedAt: new Date().toLocaleDateString(),
    };
    setImages([...images, newImg]);
    setImgUrl(""); setImgTitle("");
    setImgDialog(false);
    toast({ title: "Success", description: "Image added to library" });
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(i => i.id !== id));
    toast({ title: "Deleted", description: "Image removed" });
  };

  // ══════════════════════════════════════════════════════
  // COMPANY HANDLERS
  // ══════════════════════════════════════════════════════
  const handleSaveCompany = () => {
    if (!compForm.name) return toast({ title: "Error", description: "Company name is required", variant: "destructive" });
    if (editingComp) {
      setCompanies(companies.map(c => c.id === editingComp.id ? { ...editingComp, ...compForm } : c));
      toast({ title: "Updated", description: "Company updated" });
    } else {
      setCompanies([...companies, { id: Date.now().toString(), ...compForm }]);
      toast({ title: "Success", description: "Company added" });
    }
    setCompDialog(false);
    setEditingComp(null);
    setCompForm({ name: "", logo: "", website: "" });
  };

  const handleEditComp = (c: Company) => {
    setEditingComp(c);
    setCompForm({ name: c.name, logo: c.logo, website: c.website });
    setCompDialog(true);
  };

  const handleDeleteComp = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
    toast({ title: "Deleted", description: "Company removed" });
  };

  // ══════════════════════════════════════════════════════
  // LINK HANDLERS
  // ══════════════════════════════════════════════════════
  const handleSaveLink = () => {
    if (!linkForm.label || !linkForm.url) return toast({ title: "Error", description: "Label and URL are required", variant: "destructive" });
    if (editingLink) {
      setLinks(links.map(l => l.id === editingLink.id ? { ...editingLink, ...linkForm } : l));
      toast({ title: "Updated", description: "Link updated" });
    } else {
      setLinks([...links, { id: Date.now().toString(), ...linkForm }]);
      toast({ title: "Success", description: "Link added" });
    }
    setLinkDialog(false);
    setEditingLink(null);
    setLinkForm({ label: "", url: "", type: "social", platform: "Instagram" });
  };

  const handleEditLink = (l: LinkItem) => {
    setEditingLink(l);
    setLinkForm({ label: l.label, url: l.url, type: l.type, platform: l.platform || "Instagram" });
    setLinkDialog(true);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
    toast({ title: "Deleted", description: "Link removed" });
  };

  // ── Tab config ──
  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "images",    label: "Media Library", icon: <Image size={16} />,     count: images.length },
    { key: "companies", label: "Companies",     icon: <Building2 size={16} />, count: companies.length },
    { key: "links",     label: "Links",         icon: <Link2 size={16} />,     count: links.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Media & Content</h2>
        <p className="text-muted-foreground">Manage your images, companies, and links</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-0">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-600 border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span className={`text-xs rounded-full px-1.5 py-0.5 ${activeTab === tab.key ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ══ IMAGES TAB ══ */}
      {activeTab === "images" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={imgDialog} onOpenChange={setImgDialog}>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Image</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Add to Media Library</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Image Title</Label>
                    <Input placeholder="e.g. Campus Banner" value={imgTitle} onChange={e => setImgTitle(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <ImageUpload
                      onUpload={(url) => setImgUrl(url)}
                      preview={imgUrl}
                      onRemove={() => setImgUrl("")}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setImgDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddImage}>Add Image</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {images.length === 0 ? (
            <Card>
              <CardContent className="py-20 text-center">
                <Image size={40} className="mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground">No images yet. Upload your first one!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map(img => (
                <Card key={img.id} className="overflow-hidden group relative">
                  <img src={img.url} alt={img.title} className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(img.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs font-600 truncate">{img.title}</p>
                    <p className="text-xs text-muted-foreground">{img.uploadedAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ COMPANIES TAB ══ */}
      {activeTab === "companies" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={compDialog} onOpenChange={(v) => { setCompDialog(v); if (!v) { setEditingComp(null); setCompForm({ name: "", logo: "", website: "" }); } }}>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Company</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>{editingComp ? "Edit Company" : "Add Company"}</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Company Name *</Label>
                    <Input placeholder="e.g. TCS" value={compForm.name} onChange={e => setCompForm({ ...compForm, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <ImageUpload
                      onUpload={(url) => setCompForm({ ...compForm, logo: url })}
                      preview={compForm.logo}
                      onRemove={() => setCompForm({ ...compForm, logo: "" })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Website URL</Label>
                    <Input placeholder="https://company.com" value={compForm.website} onChange={e => setCompForm({ ...compForm, website: e.target.value })} />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => { setCompDialog(false); setEditingComp(null); setCompForm({ name: "", logo: "", website: "" }); }}>Cancel</Button>
                    <Button onClick={handleSaveCompany}>{editingComp ? "Update" : "Add"} Company</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {companies.length === 0 ? (
            <Card>
              <CardContent className="py-20 text-center">
                <Building2 size={40} className="mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground">No companies yet. Add your first hiring partner!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {companies.map(c => (
                <Card key={c.id}>
                  <CardContent className="py-4 flex items-center gap-4">
                    {c.logo ? (
                      <img src={c.logo} alt={c.name} className="w-12 h-12 object-contain rounded border" />
                    ) : (
                      <div className="w-12 h-12 rounded border bg-muted flex items-center justify-center">
                        <Building2 size={20} className="text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-700 text-base">{c.name}</p>
                      {c.website && (
                        <a href={c.website} target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                          <ExternalLink size={11} /> {c.website}
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditComp(c)}><Edit size={14} className="mr-1" /> Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteComp(c.id)}><Trash2 size={14} /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ LINKS TAB ══ */}
      {activeTab === "links" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={linkDialog} onOpenChange={(v) => { setLinkDialog(v); if (!v) { setEditingLink(null); setLinkForm({ label: "", url: "", type: "social", platform: "Instagram" }); } }}>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Link</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>{editingLink ? "Edit Link" : "Add Link"}</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Link Type</Label>
                    <Select value={linkForm.type} onValueChange={(v) => setLinkForm({ ...linkForm, type: v as "social" | "resource" })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="resource">Resource / External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {linkForm.type === "social" && (
                    <div className="space-y-2">
                      <Label>Platform</Label>
                      <Select value={linkForm.platform} onValueChange={(v) => setLinkForm({ ...linkForm, platform: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {SOCIAL_PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Label *</Label>
                    <Input placeholder="e.g. Follow us on Instagram" value={linkForm.label} onChange={e => setLinkForm({ ...linkForm, label: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>URL *</Label>
                    <Input placeholder="https://..." value={linkForm.url} onChange={e => setLinkForm({ ...linkForm, url: e.target.value })} />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => { setLinkDialog(false); setEditingLink(null); }}>Cancel</Button>
                    <Button onClick={handleSaveLink}>{editingLink ? "Update" : "Add"} Link</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Social Links */}
          {links.filter(l => l.type === "social").length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-700 text-muted-foreground uppercase tracking-wider">Social Media</p>
              <div className="grid gap-3">
                {links.filter(l => l.type === "social").map(l => (
                  <Card key={l.id}>
                    <CardContent className="py-3 flex items-center gap-3">
                      <span className="text-primary">{platformIcon(l.platform)}</span>
                      <Badge variant="secondary" className="text-xs">{l.platform}</Badge>
                      <div className="flex-1">
                        <p className="text-sm font-600">{l.label}</p>
                        <a href={l.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                          <ExternalLink size={10} /> {l.url}
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditLink(l)}><Edit size={13} /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(l.id)}><Trash2 size={13} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Resource Links */}
          {links.filter(l => l.type === "resource").length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-700 text-muted-foreground uppercase tracking-wider">Resource Links</p>
              <div className="grid gap-3">
                {links.filter(l => l.type === "resource").map(l => (
                  <Card key={l.id}>
                    <CardContent className="py-3 flex items-center gap-3">
                      <Globe size={14} className="text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-600">{l.label}</p>
                        <a href={l.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                          <ExternalLink size={10} /> {l.url}
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditLink(l)}><Edit size={13} /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(l.id)}><Trash2 size={13} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {links.length === 0 && (
            <Card>
              <CardContent className="py-20 text-center">
                <Link2 size={40} className="mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground">No links yet. Add social or resource links!</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
