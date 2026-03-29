import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Trash2, Loader2 } from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: string;
  createdAt: string;
}

const AdminEnquiries = () => {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/enquiries`);
      if (response.data.success) {
        setEnquiries(response.data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch enquiries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/enquiries/${id}`);
      if (response.data.success) {
        toast({ title: "Success", description: "Enquiry deleted" });
        fetchEnquiries();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enquiries ({enquiries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : enquiries.length === 0 ? (
          <p className="text-muted-foreground">No enquiries</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone</th>
                  <th className="text-left p-2">Course</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{e.name}</td>
                    <td className="p-2">{e.email}</td>
                    <td className="p-2">{e.phone}</td>
                    <td className="p-2">{e.course}</td>
                    <td className="p-2"><span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{e.status}</span></td>
                    <td className="p-2">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(e._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminEnquiries;
