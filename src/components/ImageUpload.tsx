import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Upload, Loader2, X } from "lucide-react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  label?: string;
  preview?: string;
  onRemove?: () => void;
}

export const ImageUpload = ({ 
  onUpload, 
  label = "Upload Image",
  preview,
  onRemove
}: ImageUploadProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (2MB for Base64 in DB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 2MB",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Convert file to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        console.log('✓ Image converted to Base64');

        // Send Base64 to backend
        const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64String,
            filename: file.name,
            mimetype: file.type
          })
        });

        const data = await response.json();

        if (data.success) {
          console.log('✓ Image stored in database');
          onUpload(data.data.image);
          toast({
            title: "Success",
            description: "Image uploaded to database successfully"
          });
        } else {
          toast({
            title: "Error",
            description: data.message || "Upload failed",
            variant: "destructive"
          });
        }
        setLoading(false);
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read file",
          variant: "destructive"
        });
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Upload failed",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input 
          id="image-upload"
          type="file" 
          accept="image/*" 
          onChange={handleUpload} 
          hidden 
          disabled={loading}
        />
        <label htmlFor="image-upload" className="flex-1 cursor-pointer">
          <Button 
            type="button" 
            disabled={loading}
            className="w-full"
            asChild
          >
            <span>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {label}
                </>
              )}
            </span>
          </Button>
        </label>
      </div>

      {preview && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-primary/20">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
