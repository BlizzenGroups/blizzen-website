"use client";

import { useEffect, useState, DragEvent } from "react";

export type GalleryImage = {
  _id: string;
  url: string; // Cloudinary URL
};

// ✅ API only for backend calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function GalleryUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  /* Toast helper */
  const showMessage = (type: "success" | "error", text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  /* Fetch gallery images */
  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch gallery");

      const data: GalleryImage[] = await res.json();
      setImages(data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      showMessage("error", "Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();

    // cleanup preview URLs
    return () => preview.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  /* Drag & Drop */
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;

    const selected = Array.from(e.dataTransfer.files);
    setFiles(selected);
    setPreview(selected.map((file) => URL.createObjectURL(file)));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /* File input */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreview(selected.map((file) => URL.createObjectURL(file)));
  };

  /* Upload to Cloudinary (via backend) */
  const handleUpload = async () => {
    if (!files.length) {
      showMessage("error", "Select images first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFiles([]);
      setPreview([]);
      fetchGallery();
      showMessage("success", "Images uploaded successfully!");
    } catch (err: any) {
      console.error("UPLOAD ERROR:", err);
      showMessage("error", err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* Delete image */
  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      fetchGallery();
      showMessage("success", "Image deleted successfully!");
    } catch (err: any) {
      console.error("DELETE ERROR:", err);
      showMessage("error", err.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Toast */}
      {msg && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white z-50 ${
            msg.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Upload Section */}
      <div
        className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className="text-lg font-semibold mb-4">Upload Images</h3>
        <p className="mb-2 text-gray-500">
          Drag & drop images here or click to select
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 cursor-pointer"
        />

        {preview.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Preview"
                className="h-32 w-full object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      {/* Gallery Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Uploaded Images</h3>

        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img._id} className="relative group">
                {/* ✅ DIRECT Cloudinary URL */}
                <img
                  src={img.url}
                  alt="Gallery"
                  loading="lazy"
                  className="h-32 w-full object-cover rounded"
                />

                <button
                  onClick={() => deleteImage(img._id)}
                  className="absolute inset-0 bg-red-600/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-semibold rounded transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
