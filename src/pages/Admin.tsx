import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminHome from "@/components/admin/AdminHome";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminPlacements from "@/components/admin/AdminPlacements";
import AdminContactInfo from "@/components/admin/AdminContactInfo";
import AdminAbout from "@/components/admin/AdminAbout";
import AdminEnquiries from "@/components/admin/AdminEnquiries";
import AdminTrustStats from "@/components/admin/AdminTrustStats";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminGallery from "@/components/admin/GalleryUpload";
import Pages from "@/components/admin/page";
import AdminAuth from "@/components/AdminAuth";
import {
  Home,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  MessageSquare,
  LogOut,
  Shield,
  Star,
  Footprints,
  FileText,
  Menu
} from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const authStatus = localStorage.getItem("admin_authenticated");
    const loginTime = localStorage.getItem("admin_login_time");

    if (authStatus === "true" && loginTime) {
      const currentTime = Date.now();
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

      if (currentTime - parseInt(loginTime) < sessionDuration) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem("admin_authenticated");
        localStorage.removeItem("admin_login_time");
      }
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_login_time");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Loading admin panel...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-start">
          <div className="animate-slide-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Manage all site content from here</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="hover-glow animate-slide-left"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="home" className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-12 mb-8 bg-white/50 backdrop-blur-sm border border-primary/20 shadow-soft">
            <TabsTrigger value="navbar" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Navbar</span>
            </TabsTrigger>
            <TabsTrigger value="home" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="placements" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Placements</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="trust-stats" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Trust Stats</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Enquiries</span>
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Pages</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">
              <Footprints className="w-4 h-4" />
              <span className="hidden sm:inline">Footer</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="navbar">
            <AdminNavbar />
          </TabsContent>
          <TabsContent value="home">
            <AdminHome />
          </TabsContent>
          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>
          <TabsContent value="placements">
            <AdminPlacements />
          </TabsContent>
          <TabsContent value="blog">
            <AdminBlog />
          </TabsContent>
          <TabsContent value="trust-stats">
            <AdminTrustStats />
          </TabsContent>
          <TabsContent value="contact">
            <AdminContactInfo />
          </TabsContent>
          <TabsContent value="about">
            <AdminAbout />
          </TabsContent>
          <TabsContent value="enquiries">
            <AdminEnquiries />
          </TabsContent>
          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>
          <TabsContent value="pages">
            <Pages />
          </TabsContent>
          <TabsContent value="footer">
            <AdminFooter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
