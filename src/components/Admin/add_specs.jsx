import React, { useState, useEffect } from "react";

export default function AddJewelrySpecs() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [specs, setSpecs] = useState([]);
  const [specName, setSpecName] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch jewelry types from backend (or hardcode for now)
  useEffect(() => {
    // Example: fetch("/api/jewelry-type").then...
    setTypes(["Ring", "Necklace", "Earrings", "Bracelet"]);
  }, []);

  // Fetch existing specs for selected type
  useEffect(() => {
    if (!selectedType) return;
    // Example: fetch(`/api/specs?type=${selectedType}`).then...
    setSpecs([]); // Clear or load from backend
  }, [selectedType]);

  const handleAddSpec = () => {
    if (!specName || !specValue) return;
    setSpecs([...specs, { name: specName, value: specValue }]);
    setSpecName("");
    setSpecValue("");
  };

  const handleRemoveSpec = (idx) => {
    setSpecs(specs.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType || specs.length === 0) {
      alert("Select a jewelry type and add at least one specification.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/specs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType, specs }),
      });
      if (res.ok) {
        alert("Specifications saved!");
        setSpecs([]);
      } else {
        alert("Failed to save specs.");
      }
    } catch {
      alert("Error saving specs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Jewelry Specifications</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Jewelry Type</label>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select type</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Spec Name (e.g. Size)"
            value={specName}
            onChange={e => setSpecName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Spec Value (e.g. 1, 2, 3)"
            value={specValue}
            onChange={e => setSpecValue(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button type="button" onClick={handleAddSpec} className="bg-blue-600 text-white px-3 py-2 rounded">
            Add
          </button>
        </div>
        <ul className="mb-4">
          {specs.map((spec, idx) => (
            <li key={idx} className="flex justify-between items-center border-b py-1">
              <span>{spec.name}: {spec.value}</span>
              <button type="button" onClick={() => handleRemoveSpec(idx)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Specifications"}
        </button>
      </form>
    </div>
  );
}