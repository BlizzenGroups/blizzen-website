import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { Loader2, Save, Star, Plus, Trash2 } from 'lucide-react';

interface RatingPlatform {
  name: string;
  rating: number;
  icon: string;
  color: string;
  isActive: boolean;
}

interface TrustStats {
  studentCount: string;
  studentLabel: string;
  ratingPlatforms: RatingPlatform[];
}

const AdminTrustStats = () => {
  const [trustStats, setTrustStats] = useState<TrustStats>({
    studentCount: '1,000+',
    studentLabel: 'Students Alumni',
    ratingPlatforms: [
      {
        name: 'Trustpilot',
        rating: 4.8,
        icon: 'trustpilot',
        color: '#00b67a',
        isActive: true
      },
      {
        name: 'Google',
        rating: 4.9,
        icon: 'google',
        color: '#4285F4',
        isActive: true
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTrustStats();
  }, []);

  const fetchTrustStats = async () => {
    try {
      const data = await apiService.getTrustStats();
      setTrustStats(data);
    } catch (error) {
      console.error('Error fetching trust stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load trust stats',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiService.updateTrustStats(trustStats);
      toast({
        title: 'Success',
        description: 'Trust stats updated successfully',
      });
    } catch (error) {
      console.error('Error updating trust stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to update trust stats',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof TrustStats, value: any) => {
    setTrustStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateRatingPlatform = (index: number, field: keyof RatingPlatform, value: any) => {
    const updatedPlatforms = [...trustStats.ratingPlatforms];
    updatedPlatforms[index] = { ...updatedPlatforms[index], [field]: value };
    setTrustStats(prev => ({
      ...prev,
      ratingPlatforms: updatedPlatforms
    }));
  };

  const addRatingPlatform = () => {
    const newPlatform: RatingPlatform = {
      name: '',
      rating: 5.0,
      icon: '',
      color: '#FFC107',
      isActive: true
    };
    setTrustStats(prev => ({
      ...prev,
      ratingPlatforms: [...prev.ratingPlatforms, newPlatform]
    }));
  };

  const removeRatingPlatform = (index: number) => {
    const updatedPlatforms = trustStats.ratingPlatforms.filter((_, i) => i !== index);
    setTrustStats(prev => ({
      ...prev,
      ratingPlatforms: updatedPlatforms
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trust Statistics</h2>
          <p className="text-muted-foreground">
            Manage the trust indicators displayed on the homepage
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Student Count Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Student Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentCount">Student Count</Label>
                <Input
                  id="studentCount"
                  value={trustStats.studentCount}
                  onChange={(e) => handleInputChange('studentCount', e.target.value)}
                  placeholder="e.g., 1,00,000+"
                />
              </div>
              <div>
                <Label htmlFor="studentLabel">Student Label</Label>
                <Input
                  id="studentLabel"
                  value={trustStats.studentLabel}
                  onChange={(e) => handleInputChange('studentLabel', e.target.value)}
                  placeholder="e.g., Students Alumni"
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              This will display as: "Trusted by {trustStats.studentCount} {trustStats.studentLabel}"
            </div>
          </CardContent>
        </Card>

        {/* Rating Platforms Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Rating Platforms
            </CardTitle>
            <Button onClick={addRatingPlatform} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Platform
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {trustStats.ratingPlatforms.map((platform, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Platform {index + 1}</h4>
                  <Button
                    onClick={() => removeRatingPlatform(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Platform Name</Label>
                    <Input
                      value={platform.name}
                      onChange={(e) => updateRatingPlatform(index, 'name', e.target.value)}
                      placeholder="e.g., Trustpilot"
                    />
                  </div>
                  <div>
                    <Label>Rating (0-5)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={platform.rating}
                      onChange={(e) => updateRatingPlatform(index, 'rating', parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Icon Name</Label>
                    <Input
                      value={platform.icon}
                      onChange={(e) => updateRatingPlatform(index, 'icon', e.target.value)}
                      placeholder="e.g., trustpilot"
                    />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <Input
                      value={platform.color}
                      onChange={(e) => updateRatingPlatform(index, 'color', e.target.value)}
                      placeholder="e.g., #00b67a"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trusted by <span className="text-primary">{trustStats.studentCount}</span> {trustStats.studentLabel}
            </h3>
          </div>

          {/* Rating Platforms Preview */}
          {trustStats.ratingPlatforms.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
              {trustStats.ratingPlatforms.filter(p => p.isActive).map((platform, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2">{platform.rating.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground mb-3">Ratings on</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5" style={{ color: platform.color }} />
                    </div>
                    <span className="text-lg font-semibold">{platform.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTrustStats;