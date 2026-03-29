import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Upload, Loader2, X, FileText } from "lucide-react";

interface FileUploadProps {
  onUpload: (url: string) => void;
  label?: string;
  currentFile?: string;
  onRemove?: () => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
}

export const FileUpload = ({ 
  onUpload, 
  label = "Upload File",
  currentFile,
  onRemove,
  acceptedTypes = ".pdf",
  maxSize = 10
}: FileUploadProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (acceptedTypes.includes('.pdf') && file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Error",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Convert file to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          
          // Upload to server
          const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              file: base64,
              filename: file.name,
              type: file.type
            }),
          });

          const data = await response.json();
          
          if (data.success) {
            // Convert relative URL to full URL for downloads
            const fullUrl = data.url.startsWith('http') ? data.url : `${API_BASE_URL}/api/upload/file${data.url}`;
            onUpload(fullUrl);
            toast({
              title: "Success",
              description: "File uploaded successfully"
            });
          } else {
            throw new Error(data.message || 'Upload failed');
          }
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message || "Failed to upload file",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
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
        description: error.message || "Failed to upload file",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const getFileName = (url: string) => {
    try {
      return url.split('/').pop() || 'Unknown file';
    } catch {
      return 'Unknown file';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          {label}
        </Button>
        
        <input
          id="file-upload"
          type="file"
          accept={acceptedTypes}
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {currentFile && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm flex-1 truncate">{getFileName(currentFile)}</span>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};