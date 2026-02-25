"use client"
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import GemsController from "../../controllers/GemController";
import JewelryController from "../../controllers/JewelryController";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (typeof window !== "undefined" && !localStorage.getItem("admin-auth")) {
    navigate("/admin/login");
    return null;
  }

  // Initialize controllers
  const gemsController = new GemsController();
  const jewelryController = new JewelryController();

  // State management
  const [gemImage, setGemImage] = useState(null);
  const [, setJewelryImage] = useState(null);
  const [showGemsForm, setShowGemsForm] = useState(true);
  const [showGemsTable, setShowGemsTable] = useState(false);
  const [gems, setGems] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [gemImageFile, setGemImageFile] = useState(null);
  const [jewelryImageFiles, setJewelryImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [gemData, setGemData] = useState(gemsController.getInitialGemData());
  const [jewelryData, setJewelryData] = useState({
    name: '',
    ...jewelryController.getInitialJewelryData()
  });

  // Load data when component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load initial data
  const loadInitialData = async () => {
    await Promise.all([fetchGems(), fetchJewelry()]);
  };

  // Fetch gems data
  const fetchGems = async () => {
    try {
      setIsLoading(true);
      const gemsData = await gemsController.fetchGems();
      setGems(gemsData);
    } catch (error) {
      console.error('Error fetching gems:', error);
      alert('Error loading gems: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Post jewelry data to API

  // Fetch jewelry data
  const fetchJewelry = async () => {
    try {
      setIsLoading(true);
      const jewelryData = await jewelryController.fetchJewelry();
      setJewelry(jewelryData);
    } catch (error) {
      console.error('Error fetching jewelry:', error);
      alert('Error loading jewelry: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle gem input changes
  const handleGemInput = (e) => {
    const { name, value } = e.target;
    if (['length', 'width', 'depth'].includes(name)) {
      setGemData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [name]: value
        }
      }));
    } else {
      setGemData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle jewelry input changes
  const handleJewelryInput = (e) => {
    setJewelryData({ ...jewelryData, [e.target.name]: e.target.value });
  };

  // Handle gem image selection
  const handleGemImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGemImage(URL.createObjectURL(file));
      setGemImageFile(file);
    }
  };

  // Add this helper for image preview/removal
  const JewelryImagePreview = ({ files, onRemove }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
      {files.map((file, idx) => (
        <div key={idx} className="relative group">
          <img
            src={URL.createObjectURL(file)}
            alt={`Jewelry ${idx + 1}`}
            className="w-24 h-24 object-cover rounded shadow"
          />
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  // Handle jewelry image selection
  const handleJewelryImage = (e) => {
    const files = Array.from(e.target.files);
    setJewelryImageFiles(prev => [...prev, ...files]);
    if (files.length > 0) {
      setJewelryImage(URL.createObjectURL(files[0]));
    } else {
      setJewelryImage(null);
    }
  };

  // Remove selected jewelry image
  const removeJewelryImage = (idx) => {
    setJewelryImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Add gem with validation
  const addGem = async () => {
    // Validate data first
    const validationErrors = gemsController.validateGemData(gemData);
    if (validationErrors.length > 0) {
      alert('Validation errors:\n' + validationErrors.join('\n'));
      return;
    }

    try {
      setIsLoading(true);
      await gemsController.addGem(gemData, gemImageFile ? [gemImageFile] : []);
      alert('Gem successfully added!');
      resetGemForm();
      await fetchGems();
    } catch (error) {
      console.error('Add gem error:', error);
      alert('Error adding gem: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add jewelry using API
  const addJewelry = async () => {
    if (jewelryImageFiles.length === 0) {
      alert('Please select at least one image for the jewelry.');
      return;
    }
    try {
      setIsLoading(true);
      await jewelryController.postJewelry(jewelryData, jewelryImageFiles);
      alert('Jewelry successfully added!');
      resetJewelryForm();
      await fetchJewelry();
    } catch (error) {
      console.error('Add jewelry error:', error);
      alert('Error adding jewelry: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete gem
  const deleteGem = async (gemId, index) => {
    if (!confirm('Are you sure you want to delete this gem?')) {
      return;
    }
    try {
      await gemsController.deleteGem(gemId);
      const newGems = [...gems];
      newGems.splice(index, 1);
      setGems(newGems);
      alert('Gem deleted successfully');
    } catch (error) {
      console.error('Error deleting gem:', error);
      alert('Error deleting gem: ' + error.message);
    }
  };

  // Delete jewelry
  const deleteJewelry = async (jewelryId, index) => {
    if (!confirm('Are you sure you want to delete this jewelry?')) {
      return;
    }
    try {
      if (jewelryId) {
        await jewelryController.deleteJewelry(jewelryId);
        await fetchJewelry();
      } else {
        const newJewelry = jewelryController.deleteJewelryLocal(jewelry, index);
        setJewelry(newJewelry);
      }
      alert('Jewelry deleted successfully');
    } catch (error) {
      console.error('Error deleting jewelry:', error);
      alert('Error deleting jewelry: ' + error.message);
    }
  };

  // Reset gem form
  const resetGemForm = () => {
    setGemData(gemsController.getInitialGemData());
    setGemImage(null);
    setGemImageFile(null);
  };

  // Reset jewelry form
  const resetJewelryForm = () => {
    setJewelryData(jewelryController.getInitialJewelryData());
    setJewelryImage(null);
    setJewelryImageFiles([]);
  };

  // Enhanced image component with better error handling
  const ImageDisplay = ({ images, alt, className }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Handle case where images is an array
    const imageArray = Array.isArray(images) ? images : (images ? [images] : []);
    const currentImage = imageArray[currentImageIndex];

    const handleImageLoad = () => {
      setImageLoading(false);
      setImageError(false);
    };

    const handleImageError = () => {
      setImageLoading(false);
      setImageError(true);
      console.error('Failed to load image:', currentImage);
      console.error('Attempted URL:', gemsController.getImageUrl(currentImage));
      if (currentImageIndex < imageArray.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
        setImageLoading(true);
        setImageError(false);
      }
    };

    if (!currentImage || imageError) {
      return (
        <div className={`bg-gray-200 rounded flex items-center justify-center text-xs ${className}`}>
          No Image
        </div>
      );
    }

    const imageUrl = gemsController.getImageUrl(currentImage);

    return (
      <div className="relative">
        {imageLoading && (
          <div className={`bg-gray-100 rounded flex items-center justify-center text-xs ${className}`}>
            Loading...
          </div>
        )}
        <img
          src={imageUrl}
          alt={alt}
          className={`${className} ${imageLoading ? 'hidden' : 'block'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {imageArray.length > 1 && !imageLoading && !imageError && (
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
            {currentImageIndex + 1}/{imageArray.length}
                  </div>
      )}
      </div>
    
  );
};

  return (
    <div className="min-h-screen font-serif">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-[#bf9b30] to-[#a88928] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                Admin Panel
              </h1>
              <p className="text-lg md:text-xl mt-2 opacity-90">
                Manage Gems & Jewelry Collections
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                <p className="text-sm font-medium">Total Gems: {gems.length}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                <p className="text-sm font-medium">Total Jewelry: {jewelry.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading...</span>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded font-medium transition ${showGemsForm ? 'bg-blue-700 text-white' : 'bg-white border text-blue-700'}`}
          onClick={() => {
            setShowGemsForm(true);
            setShowGemsTable(false);
          }}
        >
          Add New Gem
        </button>
        <button
          className={`px-4 py-2 rounded font-medium transition ${!showGemsForm ? 'bg-green-700 text-white' : 'bg-white border text-green-700'}`}
          onClick={() => {
            setShowGemsForm(false);
            setShowGemsTable(false);
          }}
        >
          Add New Jewelry
        </button>
        <button
          className={`px-4 py-2 rounded font-medium transition ${!showGemsForm ? 'bg-green-700 text-white' : 'bg-white border text-green-700'}`}
          onClick={() => {
            navigate('/admin/jtype');
            
          }}
        >
          Add New Type
        </button>
      </div>

      {/* GEM FORM */}
      {showGemsForm && !showGemsTable && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Gem</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* All top-level gemData fields except dimensions */}
            {Object.entries(gemData).map(([key, val]) => {
              if (key === "dimensions") return null;
              if (key === "inStock") {
                return (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={key}
                      checked={val}
                      onChange={(e) => setGemData(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="rounded"
                    />
                    <span>In Stock</span>
                  </label>
                );
              }
              return (
                <input
                  key={key}
                  name={key}
                  type={key === 'price' || key === 'caratWeight' || key === 'hardness' ? 'number' : 'text'}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={val}
                  onChange={handleGemInput}
                  className="border p-2 rounded w-full"
                  required={key === 'name' || key === 'category'}
                />
              );
            })}

            {/* Handle dimensions separately */}
            {["length", "width", "depth"].map((dim) => (
              <input
                key={dim}
                name={dim}
                type="number"
                step="0.01"
                placeholder={`Dimension: ${dim} (mm)`}
                value={gemData.dimensions[dim]}
                onChange={handleGemInput}
                className="border p-2 rounded w-full"
              />
            ))}

            <input type="file" onChange={handleGemImage} accept="image/*" />
            {gemImage && <img src={gemImage} alt="Gem Preview" className="w-32 h-32 object-cover rounded" />}
          </form>
          <div className="flex gap-4">
            <button 
              onClick={addGem} 
              disabled={isLoading}
              className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white px-4 py-2 rounded"
            >
              {isLoading ? 'Adding...' : 'Add Gem'}
            </button>
            <button onClick={() => setShowGemsTable(true)} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
              View Gem Table ({gems.length})
            </button>
            <button 
              onClick={fetchGems}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded"
            >
              Refresh Data
            </button>
            <button 
              onClick={resetGemForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Clear Form
            </button>
          </div>
        </div>
      )}

      {/* JEWELRY FORM */}
      {!showGemsForm && !showGemsTable && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-700">Add New Jewelry</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Jewelry Name field */}
            <input
              name="name"
              type="text"
              placeholder="Jewelry Name"
              value={jewelryData.name}
              onChange={handleJewelryInput}
              className="border p-2 rounded w-full"
              required
            />
            
            {/* Jewelry Type Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Jewelry Type</label>
              <select
                name="type"
                value={jewelryData.type}
                onChange={handleJewelryInput}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Jewelry Type</option>
                <option value="Ring">Ring</option>
                <option value="Necklace">Necklace</option>
                <option value="Earrings">Earrings</option>
                <option value="Bracelet">Bracelet</option>
              </select>
            </div>
            
            {/* Other jewelry fields */}
            {Object.entries(jewelryData).map(([key, val]) => (
              key !== 'name' && key !== 'type' && (
                <input
                  key={key}
                  name={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={val}
                  onChange={handleJewelryInput}
                  className="border p-2 rounded w-full"
                  required={key === 'category' || key === 'material'}
                />
              )
            ))}
            <div className="col-span-full">
              <input
                type="file"
                multiple
                onChange={handleJewelryImage}
                accept="image/*"
                className="mb-2"
              />
              {/* Preview selected images */}
              {jewelryImageFiles.length > 0 && (
                <JewelryImagePreview files={jewelryImageFiles} onRemove={removeJewelryImage} />
              )}
            </div>
          </form>
          <div className="flex gap-4">
            <button 
              onClick={addJewelry} 
              disabled={isLoading}
              className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-4 py-2 rounded"
            >
              {isLoading ? 'Adding...' : 'Add Jewelry'}
            </button>
            <button onClick={() => setShowGemsTable(true)} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
              View Jewelry Table ({jewelry.length})
            </button>
            <button 
              onClick={fetchJewelry}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded"
            >
              Refresh Data
            </button>
            <button 
              onClick={resetJewelryForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Clear Form
            </button>
          </div>
        </div>
      )}

      {/* GEMS TABLE */}
      {showGemsForm && showGemsTable && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">Gems Table ({gems.length} items)</h2>
            <button 
              onClick={fetchGems}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded text-sm"
            >
              Refresh
            </button>
          </div>
          
          {gems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No gems found. Add some gems to see them here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-blue-50 text-left">
                    <th className="p-2">Image</th>
                    {Object.keys(gemData).map((key) => (
                      <th key={key} className="p-2 min-w-[100px]">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gems.map((gem, idx) => (
                    <tr key={gem._id || gem.id || idx} className="border-t hover:bg-gray-50">
                      <td className="p-2">
                        <pre>{JSON.stringify(gem.images)}</pre>
                        <ImageDisplay 
                          images={gem.images} 
                          alt="Gem" 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      {Object.keys(gemData).map((key) => (
                        <td key={key} className="p-2 max-w-[150px] truncate" title={gemsController.renderGemFieldValue(gem, key)}>
                          {gemsController.renderGemFieldValue(gem, key)}
                        </td>
                      ))}
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => deleteGem(gem._id || gem.id, idx)} 
                            className="text-red-600 hover:underline flex items-center gap-1"
                            title="Delete gem"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* JEWELRY TABLE */}
      {!showGemsForm && showGemsTable && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-700">Jewelry Table ({jewelry.length} items)</h2>
            <button 
              onClick={fetchJewelry}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-3 py-1 rounded text-sm"
            >
              Refresh
            </button>
          </div>
          
          {jewelry.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No jewelry found. Add some jewelry to see them here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-green-50 text-left">
                    <th className="p-2">Image</th>
                    {Object.keys(jewelryData).map((key) => <th key={key} className="p-2">{key}</th>)}
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jewelry.map((item, idx) => (
                    <tr key={item._id || item.id || idx} className="border-t hover:bg-gray-50">
                      <td className="p-2">
                        {item.image || item.images ? (
                          <ImageDisplay 
                            images={item.images || item.image} 
                            alt="Jewelry" 
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </td>
                      {Object.keys(jewelryData).map((key) => (
                        <td key={key} className="p-2">{item[key] || ''}</td>
                      ))}
                      <td className="p-2">
                        <button 
                          onClick={() => deleteJewelry(item._id || item.id, idx)} 
                          className="text-red-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
    
  );
}