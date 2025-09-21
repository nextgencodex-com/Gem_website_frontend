import React, { useState } from "react";

export default function AddJewelryType() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !description || !imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("type", type);
    formData.append("description", description);
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:3000/api/jewelry-types", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Jewelry type added!");
        setType("");
        setDescription("");
        setImageFile(null);
        setPreview(null);
      } else {
        alert("Failed to add jewelry type.");
      }
    } catch (err) {
      alert("Error adding jewelry type.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Jewelry Type</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Jewelry Type"}
        </button>
      </form>
    </div>
  );
}