import { useState } from "react";

export default function CloudinaryUploader() {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload"); 

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbjkrmasl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    setImageUrl(data.secure_url);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-48 h-48 rounded-lg" />
      )}
    </div>
  );
}
