import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { Loader2, Save } from "lucide-react";

const AdminContactInfo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: [{ label: "Main", number: "" }],
    email: [{ label: "Info", address: "" }],
    officeHours: {
      monday: "9 AM - 7 PM",
      tuesday: "9 AM - 7 PM",
      wednesday: "9 AM - 7 PM",
      thursday: "9 AM - 7 PM",
      friday: "9 AM - 7 PM",
      saturday: "10 AM - 5 PM",
      sunday: "Closed"
    }
  });

useEffect(() => {
  const fetchContactInfo = async () => {
    try {
      setFetching(true);
      const response = await apiService.getContactInfo();
      if (response.success && response.data) {
        const d = response.data;
        setFormData({
          companyName: d.companyName || "",
          address: d.address || "",
          city: d.city || "",
          state: d.state || "",
          zipCode: d.zipCode || "",
          country: d.country || "",
          phone: d.phone?.length ? d.phone : [{ label: "Main", number: "" }],
          email: d.email?.length ? d.email : [{ label: "Info", address: "" }],
          officeHours: d.officeHours || {
            monday: "9 AM - 7 PM",
            tuesday: "9 AM - 7 PM",
            wednesday: "9 AM - 7 PM",
            thursday: "9 AM - 7 PM",
            friday: "9 AM - 7 PM",
            saturday: "10 AM - 5 PM",
            sunday: "Closed"
          }
        });
      }
    } catch (error) {
      // silently fail, form stays with defaults
    } finally {
      setFetching(false);
    }
  };
  fetchContactInfo();
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
   const response = await apiService.updateContactInfo(formData);
if (response.success) {
        toast({ title: "Success", description: "Contact info updated successfully" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update contact info",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            <Input
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
            <Input
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Phone Numbers</label>
            {formData.phone.map((p, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Label (e.g., Main)"
                  value={p.label}
                  onChange={(e) => {
                    const newPhone = [...formData.phone];
                    newPhone[idx].label = e.target.value;
                    setFormData({ ...formData, phone: newPhone });
                  }}
                />
                <Input
                  placeholder="Phone Number"
                  value={p.number}
                  onChange={(e) => {
                    const newPhone = [...formData.phone];
                    newPhone[idx].number = e.target.value;
                    setFormData({ ...formData, phone: newPhone });
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData({ ...formData, phone: [...formData.phone, { label: "", number: "" }] })}
            >
              + Add Phone
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Email Addresses</label>
            {formData.email.map((e, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Label (e.g., Info)"
                  value={e.label}
                  onChange={(ev) => {
                    const newEmail = [...formData.email];
                    newEmail[idx].label = ev.target.value;
                    setFormData({ ...formData, email: newEmail });
                  }}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={e.address}
                  onChange={(ev) => {
                    const newEmail = [...formData.email];
                    newEmail[idx].address = ev.target.value;
                    setFormData({ ...formData, email: newEmail });
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData({ ...formData, email: [...formData.email, { label: "", address: "" }] })}
            >
              + Add Email
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Office Hours</label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Monday</label>
                <Input
                  placeholder="9 AM - 7 PM"
                  value={formData.officeHours.monday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, monday: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Tuesday</label>
                <Input
                  placeholder="9 AM - 7 PM"
                  value={formData.officeHours.tuesday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, tuesday: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Wednesday</label>
                <Input
                  placeholder="9 AM - 7 PM"
                  value={formData.officeHours.wednesday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, wednesday: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Thursday</label>
                <Input
                  placeholder="9 AM - 7 PM"
                  value={formData.officeHours.thursday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, thursday: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Friday</label>
                <Input
                  placeholder="9 AM - 7 PM"
                  value={formData.officeHours.friday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, friday: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Saturday</label>
                <Input
                  placeholder="10 AM - 5 PM"
                  value={formData.officeHours.saturday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, saturday: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Sunday</label>
                <Input
                  placeholder="Closed"
                  value={formData.officeHours.sunday}
                  onChange={(e) => setFormData({
                    ...formData,
                    officeHours: { ...formData.officeHours, sunday: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Contact Info
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminContactInfo;
