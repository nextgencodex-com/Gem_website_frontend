import React, { useState, useEffect, useMemo } from "react"
import { Search, ShoppingCart, PhoneIcon as Whatsapp, ChevronDown, ChevronUp, Filter } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../cart-context"
import CustomJewelleryPage from "../custom-jewellery";
import CurrencyConverter from "../currency-con";
// Static gems data for custom jewellery functionality
const staticGems = [
  {
    id: 1,
    name: "Natural Sapphire",
    color: "blue",
    origin: "srilanka",
    imageUrl: "/images/gem1.jpg",
    carats: 2.5,
    specs: { caratWeight: 2.5 }
  },
  {
    id: 2,
    name: "Spinel",
    color: "red",
    origin: "madagascar",
    imageUrl: "/images/gem2.jpg",
    carats: 1.8,
    specs: { caratWeight: 1.8 }
  },
  {
    id: 3,
    name: "Padparadscha",
    color: "pink",
    origin: "srilanka",
    imageUrl: "/images/gem3.jpg",
    carats: 3.2,
    specs: { caratWeight: 3.2 }
  },
  {
    id: 4,
    name: "Garnet",
    color: "red",
    origin: "madagascar",
    imageUrl: "/images/gem4.jpg",
    carats: 2.1,
    specs: { caratWeight: 2.1 }
  },
  {
    id: 5,
    name: "Chrysoberyl",
    color: "yellow",
    origin: "srilanka",
    imageUrl: "/images/gem5.jpg",
    carats: 1.5,
    specs: { caratWeight: 1.5 }
  }
];

// Add exchange rates (relative to LKR as base)
const exchangeRates = {
  LKR: 1,
  USD: 0.0031, // Example rate
  AED: 0.011,
  AUR: 0.0012,
  YEN: 0.49,
  RMD: 0.022,
};

function convertCurrency(priceLKR, toCurrency) {
  if (!exchangeRates[toCurrency]) return priceLKR;
  return priceLKR * exchangeRates[toCurrency];
}

function getImageUrl(img) {
  if (!img) return "/images/j1.jpg";
  // If already absolute, return as is
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  // Otherwise, prefix with backend URL
  return `http://localhost:3000${img}`;
}

function ProductCard({ name, image, images, tags, price, selectedCurrency, onViewDetails, onAddToCart, onCustomize, category, material, gemstone, size, carat, brand, inStock }) {
  const displayPrice = price ? convertCurrency(price, selectedCurrency) : null;
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const mainImage = Array.isArray(images) && images.length > 0 ? images[mainImageIdx] : image;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
      <div className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={getImageUrl(mainImage)}
            alt={name}
            className="rounded-t-lg object-cover w-full h-full"
          />
          {/* Dynamic Category Badge */}
          <div className="absolute right-2 top-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-gray-800">
            {category || 'Jewellery'}
          </div>
          {/* In Stock Badge */}
          <div className="absolute left-2 top-2 rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
            In Stock
          </div>
          {/* Thumbnails for multiple images */}
          {Array.isArray(images) && images.length > 1 && (
            <div className="absolute left-2 bottom-2 flex gap-1">
              {images.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-8 h-8 object-cover rounded border border-white shadow cursor-pointer ${mainImageIdx === idx ? "border-blue-500" : ""}`}
                  style={{ background: "#fff" }}
                  onClick={e => { e.stopPropagation(); setMainImageIdx(idx); }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{name}</h3>
          
          {/* Product Details Grid */}
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            {material && (
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">{material}</span>
              </div>
            )}
            {gemstone && (
              <div className="flex justify-between">
                <span className="text-gray-600">Gemstone:</span>
                <span className="font-medium">{gemstone}</span>
              </div>
            )}
            {size && (
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{size}</span>
              </div>
            )}
            {carat && (
              <div className="flex justify-between">
                <span className="text-gray-600">Carat:</span>
                <span className="font-medium">{carat}</span>
              </div>
            )}
            {brand && (
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="font-medium">{brand}</span>
              </div>
            )}
            
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            
          </div>
          <div className="text-blue-700 font-bold mb-2">
            {displayPrice !== null ? (
              <>
                {selectedCurrency === 'LKR' ? 'Rs. ' : ''}
                {displayPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedCurrency}
              </>
            ) : (
              'Price On Request'
            )}
          </div>
          <div className="flex gap-2">
            <button 
              className="flex-1 bg-[#bf9b30]  text-white py-2 rounded-md transition text-sm md:text-base"
              onClick={onViewDetails}
            >
              View Details
            </button>
            <button
             className="flex-1 bg-white text-black py-2 rounded-md transition border border-black text-sm md:text-base"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-[#bf9b30] text-white py-2 rounded-md transition text-sm md:text-base"
              onClick={onCustomize}
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JewelryCollectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [, setLoading] = useState(true);
  const [showCustomJewelleryModal, setShowCustomJewelleryModal] = useState(false);
  const [customJewelleryData, setCustomJewelleryData] = useState(null);
  
  // Custom Jewellery Modal States
  // Ring customization state - now handled by CustomJewelleryPage component
  
  // Additional customization states for different jewellery types - now handled by CustomJewelleryPage component
  
  const [selectedGem, setSelectedGem] = useState(null);
  const [gemSearch, setGemSearch] = useState("");
  const [gemColor, setGemColor] = useState("");
  const [gemType, setGemType] = useState("");
  const [gemOrigin, setGemOrigin] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    fullName: "",
    address: "",
    mobile: "",
    details: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  
  // Single Modal Navigation States
  const [modalView, setModalView] = useState("custom-jewellery"); // "custom-jewellery" or "gem-selection"

  // Email modal state for filter section (renamed to avoid conflicts)
  const [showFilterEmailModal, setShowFilterEmailModal] = useState(false);
  const [filterEmailForm, setFilterEmailForm] = useState({
    fullName: '',
    address: '',
    mobile: '',
    details: '',
  });
  const [filterEmailSent, setFilterEmailSent] = useState(false);
  const handleEmailInput = e => setEmailForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSendEmail = async () => {
    // Compose email body with all selected filter details
    let details = '**Selected Filters:**\n\n';
    
    if (search) details += `• Search: ${search}\n`;
    
    if (category !== 'all' || categorySearch) {
      let categoryText = category !== 'all' ? category : '';
      if (categorySearch) {
        categoryText = categoryText ? `${categoryText} (${categorySearch})` : categorySearch;
      }
      if (categoryText) details += `• Category: ${categoryText}\n`;
    }
    
    if (filterMaterial !== 'all' || materialSearch) {
      let materialText = filterMaterial !== 'all' ? filterMaterial : '';
      if (materialSearch) {
        materialText = materialText ? `${materialText} (${materialSearch})` : materialSearch;
      }
      if (filterMaterial === 'gold') {
        if (filterGoldType) materialText += ` - ${filterGoldType}`;
        if (filterGoldPurity) materialText += ` ${filterGoldPurity}`;
      }
      if (materialText) details += `• Material: ${materialText}\n`;
    }
    
    if (gemstone !== 'all' || gemstoneSearch) {
      let gemstoneText = gemstone !== 'all' ? gemstone : '';
      if (gemstoneSearch) {
        gemstoneText = gemstoneText ? `${gemstoneText} (${gemstoneSearch})` : gemstoneSearch;
      }
      if (gemstoneText) details += `• Gemstone: ${gemstoneText}\n`;
    }
    
    if (size !== 'all' || sizeSearch) {
      let sizeText = size !== 'all' ? size : '';
      if (sizeSearch) {
        sizeText = sizeText ? `${sizeText} (${sizeSearch})` : sizeSearch;
      }
      if (sizeText) details += `• Size: ${sizeText}\n`;
    }
    
    if (caratWeight !== 'all' || caratWeightSearch) {
      let caratText = caratWeight !== 'all' ? `${caratWeight}ct` : '';
      if (caratWeightSearch) {
        caratText = caratText ? `${caratText} (${caratWeightSearch}ct)` : `${caratWeightSearch}ct`;
      }
      if (caratText) details += `• Gemstone Weight: ${caratText}\n`;
    }

    const minPrice = minPriceInput ? Number(minPriceInput.replace(/[^0-9]/g, '')) : null;
    const maxPrice = maxPriceInput ? Number(maxPriceInput.replace(/[^0-9]/g, '')) : null;

    if (minPrice || maxPrice) {
      details += '• Price Range: ';
      if (minPrice) details += `Min ${minPriceInput}`;
      if (minPrice && maxPrice) details += ' - ';
      if (maxPrice) details += `Max ${maxPriceInput}`;
      details += '\n';
    }
    
    if (selectedCurrency) details += `• Currency: ${selectedCurrency}\n`;
    
    details += `\n**Total Products Found:** ${filteredProducts.length}\n`;
    details += '\nPlease contact me regarding these jewelry options.\n';
    
    const body = `Jewelry Inquiry\n\nFull Name: ${emailForm.fullName}\nShipping Address: ${emailForm.address}\nMobile Number: ${emailForm.mobile}\n\n${details}\nOther Details: ${emailForm.details}`;
    window.location.href = `mailto:contact@luxirisgems.com?subject=Jewelry Inquiry&body=${encodeURIComponent(body)}`;
    setEmailSent(true);
  };

  // Custom Jewellery Handlers - Now handled by CustomJewelleryPage component
  const handleCustomEmailInput = e => setEmailForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleCustomSendEmail = async () => {
    // This function is no longer needed as email functionality is handled by CustomJewelleryPage
    console.log("Email functionality moved to CustomJewelleryPage component");
  };

 // ...existing code...

// ...existing code...
  // WhatsApp functionality now handled by CustomJewelleryPage component
  const handleCustomWhatsApp = async (withUpload = false) => {
    console.log("WhatsApp functionality moved to CustomJewelleryPage component");
  };
// ...existing code...

// Helper to convert DataURL to File
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, {type:mime});
}

// ...existing code...

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gem filter logic for custom jewellery
  const uniqueGemTypes = useMemo(() => [...new Set(staticGems.map((g) => g.name))], []);
  const uniqueGemColors = useMemo(() => [...new Set(staticGems.map((g) => g.color))], []);
  const uniqueGemOrigins = useMemo(() => [...new Set(staticGems.map((g) => g.origin))], []);

  const filteredGems = useMemo(() => {
    let result = staticGems;
    if (gemSearch) {
      const searchLower = gemSearch.toLowerCase();
      result = result.filter(
        (g) =>
          (g.name && g.name.toLowerCase().includes(searchLower)) ||
          (g.color && g.color.toLowerCase().includes(searchLower)) ||
          (g.origin && g.origin.toLowerCase().includes(searchLower))
      );
    }
    if (gemType) result = result.filter((g) => g.name === gemType);
    if (gemColor) result = result.filter((g) => g.color === gemColor);
    if (gemOrigin) result = result.filter((g) => g.origin === gemOrigin);
    return result;
  }, [gemSearch, gemType, gemColor, gemOrigin]);

  const handleViewDetails = (productId, product) => {
    navigate(`/jew-details/${productId}`, { state: { product } });
  };

  // Fetch jewelry data from API
  useEffect(() => {
    const fetchJewelry = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/jewelry");
        const data = await res.json();
        // Normalize data for frontend
        const normalized = Array.isArray(data)
          ? data
          : data.data || [];
        setProducts(normalized.map(item => ({
          id: item.id,
          name: item.name || "Jewelry",
          description: item.description || "",
          price: item.priceRange || "",
          image: Array.isArray(item.images) && item.images.length > 0
            ? getImageUrl(item.images[0])
            : getImageUrl(item.imageUrl),
          images: Array.isArray(item.images)
            ? item.images.map(getImageUrl)
            : item.imageUrl ? [getImageUrl(item.imageUrl)] : [],
          tags: [
            item.category,
            item.gemstone,
            item.carat,
            item.brand
          ].filter(Boolean),
          category: item.category || "",
          material: item.material || "",
          gemstone: item.gemstone || "",
          size: item.size || "",
          specs: item.specs || {},
          imageCount: item.imageCount || (item.images ? item.images.length : 1),
        })));
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJewelry();
  }, []);

  // Handle gem selection from session storage
  // Consolidated useEffect for handling gem selection from session storage
  useEffect(() => {
    console.log("=== GEM SELECTION useEffect triggered ===");
    console.log("Current location:", location.pathname);
    console.log("returnToGemModal:", window.sessionStorage.getItem("returnToGemModal"));
    console.log("selectedGemForCustom:", window.sessionStorage.getItem("selectedGemForCustom"));
    
    const hasReturnFlag = window.sessionStorage.getItem("returnToGemModal");
    const gemJson = window.sessionStorage.getItem("selectedGemForCustom");
    
    if (hasReturnFlag && gemJson) {
      console.log("✅ RETURN FLAG AND GEM FOUND - Processing gem selection");
      
      try {
        const parsedGem = JSON.parse(gemJson);
        console.log("✅ Parsed gem successfully:", parsedGem);
        
        // Normalize the gem data to ensure consistent structure
        const normalizedGem = normalizeGemData(parsedGem);
        console.log("✅ Normalized gem:", normalizedGem);
        
        // Set the modal and view first
        setShowCustomJewelleryModal(true);
        setModalView("gem-selection");
        
        // Then set the selected gem with normalized data
        setSelectedGem(normalizedGem);
        console.log("✅ selectedGem state set to:", normalizedGem);
        
        // Clear the return flag after successful processing
        window.sessionStorage.removeItem("returnToGemModal");
        console.log("✅ returnToGemModal cleared from session storage");
        
      } catch (error) {
        console.error("❌ Error parsing gem from session storage:", error);
        console.error("Raw gemJson:", gemJson);
        // Don't clear the return flag if there was an error
      }
    } else if (hasReturnFlag && !gemJson) {
      console.log("⚠️ Return flag found but no gem data");
      setShowCustomJewelleryModal(true);
      setModalView("gem-selection");
      window.sessionStorage.removeItem("returnToGemModal");
    } else if (!hasReturnFlag && gemJson) {
      console.log("ℹ️ Gem data found but no return flag - keeping gem for potential use");
      // Don't clear the gem data, it might be needed later
    } else {
      console.log("ℹ️ No return flag or gem data found - normal page load");
      // On normal page load, clear any selected gem to show clean state
      setSelectedGem(null);
    }
  }, [location]); // Depend on location to catch navigation changes

  // Clear all filters on page refresh/load
  useEffect(() => {
    console.log("Page loaded - clearing all filters to show all products");
    console.log("Session storage on page load:");
    console.log("- returnToGemModal:", window.sessionStorage.getItem("returnToGemModal"));
    console.log("- selectedGemForCustom:", window.sessionStorage.getItem("selectedGemForCustom"));
    
    // Reset all filter states to show all products
    setCategory("all");
    setFilterMaterial("all");
    setGemstone("all");
    setSize("all");
    setCaratWeight("all");
    setSortBy("featured");
    setSearch("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setCategorySearch("");
    setMaterialSearch("");
    setGemstoneSearch("");
    setSizeSearch("");
    setCaratWeightSearch("");

  }, []);

  // Helper function to get proper image URL for gems
  const getGemImageUrl = (gem) => {
    if (!gem) return null;
    
    let imageUrl = null;
    
    // Try different image sources
    if (gem.imageUrl) {
      imageUrl = gem.imageUrl;
    } else if (gem.images?.main) {
      imageUrl = gem.images.main;
    } else if (Array.isArray(gem.images) && gem.images.length > 0) {
      imageUrl = gem.images[0];
    }
    
    if (!imageUrl) return null;
    
    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      return `http://localhost:3000${imageUrl}`;
    }
    
    // Handle absolute URLs
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Handle upload paths
    return `http://localhost:3000/uploads/${imageUrl}`;
  };

  // Helper function to get proper image URL for jewellery
  const getJewelleryImageUrl = (jewellery) => {
    if (!jewellery) return null;
    
    let imageUrl = null;
    
    // Try different image sources
    if (jewellery.image) {
      imageUrl = jewellery.image;
    } else if (jewellery.images && Array.isArray(jewellery.images) && jewellery.images.length > 0) {
      imageUrl = jewellery.images[0];
    } else if (jewellery.images?.main) {
      imageUrl = jewellery.images.main;
    }
    
    if (!imageUrl) return null;
    
    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      return `http://localhost:3000${imageUrl}`;
    }
    
    // Handle absolute URLs
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Handle upload paths
    return `http://localhost:3000/uploads/${imageUrl}`;
  };

  // Helper function to normalize gem data structure
  const normalizeGemData = (gem) => {
    if (!gem) return null;
    
    // Ensure consistent structure
    const normalized = {
      id: gem.id || gem._id,
      name: gem.name,
      color: gem.color,
      origin: gem.origin,
      carats: gem.carats || gem.specs?.caratWeight,
      type: gem.type,
      clarity: gem.clarity,
      // Handle different image structures with proper URL construction
      imageUrl: getGemImageUrl(gem),
      // Keep original data for compatibility
      ...gem
    };
    
    console.log("Normalized gem data:", normalized);
    console.log("Final imageUrl:", normalized.imageUrl);
    return normalized;
  };

  // Monitor selectedGem state changes
  useEffect(() => {
    console.log("=== SELECTEDGEM STATE CHANGED ===");
    console.log("New selectedGem value:", selectedGem);
    console.log("Type:", typeof selectedGem);
    if (selectedGem) {
      console.log("Keys:", Object.keys(selectedGem));
      console.log("Name:", selectedGem.name);
      console.log("ImageUrl:", selectedGem.imageUrl);
      console.log("Normalized gem:", normalizeGemData(selectedGem));
    }
  }, [selectedGem]);

  // Monitor customJewelleryData state changes
  useEffect(() => {
    console.log("=== CUSTOMJEWELLERYDATA STATE CHANGED ===");
    console.log("New customJewelleryData value:", customJewelleryData);
    console.log("Type:", typeof customJewelleryData);
    if (customJewelleryData) {
      console.log("Keys:", Object.keys(customJewelleryData));
      console.log("Name:", customJewelleryData.name);
      console.log("Image:", customJewelleryData.image);
      console.log("Product:", customJewelleryData.product);
    }
  }, [customJewelleryData]);

  // Monitor modalView changes
  useEffect(() => {
    console.log("=== MODALVIEW STATE CHANGED ===");
    console.log("New modalView value:", modalView);
    console.log("customJewelleryData at modalView change:", customJewelleryData);
    console.log("selectedGem at modalView change:", selectedGem);
    
    // Load jewellery data from session storage when modal opens
    if (showCustomJewelleryModal && !customJewelleryData) {
      const storedJewelleryData = window.sessionStorage.getItem("customJewelleryData");
      if (storedJewelleryData) {
        try {
          const parsedData = JSON.parse(storedJewelleryData);
          console.log("✅ Loading jewellery data from session storage:", parsedData);
          setCustomJewelleryData(parsedData);
        } catch (error) {
          console.error("❌ Error parsing stored jewellery data:", error);
        }
      }
    }
  }, [modalView, showCustomJewelleryModal, customJewelleryData]);

  // States for filters
  const [category, setCategory] = useState("all")
  const [filterMaterial, setFilterMaterial] = useState("all")
  const [gemstone, setGemstone] = useState("all")
  const [size, setSize] = useState("all")
  const [caratWeight, setCaratWeight] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [search, setSearch] = useState("")
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  // Material sub-selections
  const [filterGoldType, setFilterGoldType] = useState("")
  const [filterGoldPurity, setFilterGoldPurity] = useState("")
  
  // Additional filter states for gold customization
  const [goldPurity, setGoldPurity] = useState("18k")

  // Add search states for each filter
  const [categorySearch, setCategorySearch] = useState("");
  const [materialSearch, setMaterialSearch] = useState("");
  const [gemstoneSearch, setGemstoneSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");
  const [caratWeightSearch, setCaratWeightSearch] = useState("");

  // Enhanced filtering logic
  let filteredProducts = products.filter(product => {
    // Main search
    if (search) {
      const searchLower = search.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(searchLower));
      if (!nameMatch && !tagMatch) return false;
    }
    // Category filter
    if (category !== "all" && product.category !== category) return false;
    if (categorySearch && !product.category.toLowerCase().includes(categorySearch.toLowerCase())) return false;
    // Material filter
    if (filterMaterial !== "all" && product.material !== filterMaterial) return false;
    if (filterMaterial === "gold" && filterGoldType && !product.tags.some(tag => tag.includes(filterGoldType))) return false;
    if (filterMaterial === "gold" && filterGoldPurity && !product.tags.some(tag => tag.includes(filterGoldPurity))) return false;
    if (materialSearch && !product.material.toLowerCase().includes(materialSearch.toLowerCase())) return false;
    // Gemstone filter
    if (gemstone !== "all" && product.gemstone !== gemstone) return false;
    if (gemstoneSearch && !product.gemstone.toLowerCase().includes(gemstoneSearch.toLowerCase())) return false;
    // Size filter
    if (size !== "all" && product.size !== size) return false;
    if (sizeSearch && !product.size.toLowerCase().includes(sizeSearch.toLowerCase())) return false;
    // Carat weight filter (check tags for carat mentions)
    if (caratWeight !== "all") {
      const caratMatch = product.tags.some(tag => tag.includes(`${caratWeight}ct`));
      if (!caratMatch) return false;
    }
    if (caratWeightSearch) {
      const caratSearchMatch = product.tags.some(tag => tag.includes(`${caratWeightSearch}ct`));
      if (!caratSearchMatch) return false;
    }
    // Price range filter
    const minPrice = minPriceInput ? Number(minPriceInput.replace(/[^0-9]/g, '')) : null;
    const maxPrice = maxPriceInput ? Number(maxPriceInput.replace(/[^0-9]/g, '')) : null;

    if (minPrice && product.price < minPrice) return false;
    if (maxPrice && product.price > maxPrice) return false;
    return true;
  });

  // Sorting logic
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  const handleClearAll = () => {
    setCategory("all");
    setFilterMaterial("all");
    setGemstone("all");
    setSize("all");
    setCaratWeight("all");
    setSortBy("featured");
    setSearch("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setCategorySearch("");
    setMaterialSearch("");
    setGemstoneSearch("");
    setSizeSearch("");
    setCaratWeightSearch("");
    setFilterGoldType("");
    setFilterGoldPurity("");
    setGoldPurity("18k");
  };

  // Get unique values for dropdowns
  const uniqueCategories = [...new Set(products.map(p => p.category))]
  const uniqueGemstones = [...new Set(products.map(p => p.gemstone))]
  const uniqueSizes = [...new Set(products.map(p => p.size))]

  // Filtered options for dropdowns based on search inputs
  const filteredCategories = uniqueCategories.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase()));
  const filteredGemstones = uniqueGemstones.filter(gem => gem.toLowerCase().includes(gemstoneSearch.toLowerCase()));
  const filteredSizes = uniqueSizes.filter(s => s.toLowerCase().includes(sizeSearch.toLowerCase()));
  const caratWeights = ["0.25", "0.5", "0.75", "1", "1.5", "2"];
  const filteredCaratWeights = caratWeights.filter(w => w.includes(caratWeightSearch));

  // Ring size options grouped by region
  const ringSizes = {
    "UK Sizes": Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
    "US Sizes": Array.from({ length: 21 }, (_, i) => (3 + i * 0.5).toFixed(1)), // 3-13 in 0.5 increments
    "EU Sizes": Array.from({ length: 27 }, (_, i) => (44 + i).toString()) // 44-70
  };

  // Gold options
  const goldTypes = ["Yellow Gold", "White Gold", "Rose Gold", "Green Gold", "Grey Gold", "Spangold", "Purple Gold", "Blue Gold"];
  const goldPurities = ["14k", "15k", "16k", "17k", "18k", "19k", "20k", "21k", "22k", "23k", "24k"];

  // Category options
  const categoryOptions = ["Rings", "Necklace", "Earrings", "Bracelet"];

  // Gemstone types from GemCollection
  const gemstoneTypes = [
    "Ruby", "Sapphire", "Emerald", "Diamond", "Pearl", "Opal", "Garnet", 
    "Amethyst", "Citrine", "Topaz", "Aquamarine", "Peridot", "Tanzanite", 
    "Tourmaline", "Zircon", "Spinel", "Alexandrite", "Moonstone", "Jade", 
    "Lapis Lazuli", "Turquoise", "Onyx", "Agate", "Jasper", "Malachite"
  ];

  const handleRequestViaWhatsApp = () => {
    let message = 'Jewelry Inquiry:%0A%0A';
    
    // Add all selected filters to the message
    message += '**Selected Filters:**%0A';
    
    if (search) message += `• Search: ${search}%0A`;
    if (category !== 'all' || categorySearch) {
      let categoryText = category !== 'all' ? category : '';
      if (categorySearch) {
        categoryText = categoryText ? `${categoryText} (${categorySearch})` : categorySearch;
      }
      if (categoryText) message += `• Category: ${categoryText}%0A`;
    }
    
    if (filterMaterial !== 'all' || materialSearch) {
      let materialText = filterMaterial !== 'all' ? filterMaterial : '';
      if (materialSearch) {
        materialText = materialText ? `${materialText} (${materialSearch})` : materialSearch;
      }
      if (filterMaterial === 'gold') {
        if (filterGoldType) materialText += ` - ${filterGoldType}`;
        if (filterGoldPurity) materialText += ` ${filterGoldPurity}`;
      }
      if (materialText) message += `• Material: ${materialText}%0A`;
    }
    
    if (gemstone !== 'all' || gemstoneSearch) {
      let gemstoneText = gemstone !== 'all' ? gemstone : '';
      if (gemstoneSearch) {
        gemstoneText = gemstoneText ? `${gemstoneText} (${gemstoneSearch})` : gemstoneSearch;
      }
      if (gemstoneText) message += `• Gemstone: ${gemstoneText}%0A`;
    }
    
    if (size !== 'all' || sizeSearch) {
      let sizeText = size !== 'all' ? size : '';
      if (sizeSearch) {
        sizeText = sizeText ? `${sizeText} (${sizeSearch})` : sizeSearch;
      }
      if (sizeText) message += `• Size: ${sizeText}%0A`;
    }
    
    if (caratWeight !== 'all' || caratWeightSearch) {
      let caratText = caratWeight !== 'all' ? `${caratWeight}ct` : '';
      if (caratWeightSearch) {
        caratText = caratText ? `${caratText} (${caratWeightSearch}ct)` : `${caratWeightSearch}ct`;
      }
      if (caratText) message += `• Gemstone Weight: ${caratText}%0A`;
    }

    const minPrice = minPriceInput ? Number(minPriceInput.replace(/[^0-9]/g, '')) : null;
    const maxPrice = maxPriceInput ? Number(maxPriceInput.replace(/[^0-9]/g, '')) : null;

    if (minPrice || maxPrice) {
      message += '• Price Range: ';
      if (minPrice) message += `Min ${minPriceInput}`;
      if (minPrice && maxPrice) message += ' - ';
      if (maxPrice) message += `Max ${maxPriceInput}`;
      message += '%0A';
    }
    
    if (selectedCurrency) message += `• Currency: ${selectedCurrency}%0A`;
    
    message += '%0A**Total Products Found:** ' + filteredProducts.length + '%0A';
    message += '%0APlease contact me regarding these jewelry options.';

    const url = `https://wa.me/94759627589?text=${message}`;
    window.open(url, '_blank');
  };

  // Add state to control filter modal visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // Prevent background scroll when filter panel is open
  React.useEffect(() => {
    if (showFilterPanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showFilterPanel]);

  // 1. Add state: const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  return (
    <div className="font-[Poppins]">
      <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <img
          src="/images/jc.jpg"
          alt="Luxury Jewelry Collection"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="relative z-20 space-y-4 px-6 lg:px-12 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl">
            Luxury Jewellry Collection
          </h1>
          <p className="max-w-2xl text-base drop-shadow-md md:text-lg">
            Discover Timeless Elegance And Exquisite Craftsmanship
          </p>
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <div className="fixed left-6 bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300"
          onClick={() => window.open('https://wa.me/94759627589', '_blank')}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-8 py-16">
        {/* Filter Button (mobile only) */}
        <div className="flex lg:hidden sticky top-0 z-30 bg-white shadow-sm px-4 py-2 justify-end">
          <button
            className="flex items-center gap-2 bg-[#bf9b30] hover:bg-[#a88928] text-white px-4 py-2 rounded-md font-semibold shadow"
            onClick={() => setShowFilterPanel(true)}
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Filter Section - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl text-[#bf9b30] text-center  font-bold mb-4">Filters</h2>
              
            {/* Search input with icon */}
              <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, material, gemstone, or size"
                className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Display</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedCurrency}
                  onChange={e => setSelectedCurrency(e.target.value)}
                >
                  <option value="RMD">RMD</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                  <option value="AUR">AUR</option>
                  <option value="YEN">YEN</option>
                  <option value="LKR">LKR</option>
                </select>
                <span className="ml-2 font-bold text-[#bf9b30]">{selectedCurrency}</span>
              </div>

              <div className="space-y-6">
              {/* Category Select */}
              <div>
                <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  placeholder="Search Category"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                  value={categorySearch}
                  onChange={e => setCategorySearch(e.target.value)}
                />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Material Select */}
              <div>
                <label htmlFor="material" className="mb-1 block text-sm font-medium text-gray-700">Material</label>
                <input
                  type="text"
                  placeholder="Search Material"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                  value={materialSearch}
                  onChange={e => setMaterialSearch(e.target.value)}
                />
                <select
                  id="material"
                  value={filterMaterial}
                  onChange={(e) => {
                    setFilterMaterial(e.target.value);
                    setFilterGoldType("");
                    setFilterGoldPurity("");
                  }}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Materials</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                  <option value="silver">Silver</option>
                  <option value="titanium">Titanium</option>
                </select>
                
                {/* Gold sub-options */}
                {filterMaterial === "gold" && (
                  <div className="mt-2 space-y-2">
                    <select
                      value={filterGoldType}
                      onChange={(e) => setFilterGoldType(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Gold Type</option>
                      {goldTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    
                    {filterGoldType && (
                      <select
                        value={filterGoldPurity}
                        onChange={(e) => setFilterGoldPurity(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Gold Purity</option>
                        {goldPurities.map(purity => (
                          <option key={purity} value={purity}>{purity}</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
              
              {/* Gemstone Select */}
              <div>
                <label htmlFor="gemstone" className="mb-1 block text-sm font-medium text-gray-700">Gemstone</label>
                <input
                  type="text"
                  placeholder="Search Gemstone"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                  value={gemstoneSearch}
                  onChange={e => setGemstoneSearch(e.target.value)}
                />
                <select
                  id="gemstone"
                  value={gemstone}
                  onChange={(e) => setGemstone(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Gemstones</option>
                  {gemstoneTypes.map(gem => (
                    <option key={gem} value={gem}>{gem}</option>
                  ))}
                </select>
              </div>
              
              {/* Size Select */}
              <div>
                <label htmlFor="size" className="mb-1 block text-sm font-medium text-gray-700">Size</label>
                <input
                  type="text"
                  placeholder="Search Size (e.g., US 6, UK M, EU 50)"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                  value={sizeSearch}
                  onChange={e => setSizeSearch(e.target.value)}
                />
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Sizes</option>
                  {Object.entries(ringSizes).map(([region, sizes]) => (
                    <optgroup key={region} label={region}>
                      {sizes.map(size => (
                        <option key={`${region}-${size}`} value={size}>
                          {size}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  {filteredSizes.filter(s => !Object.values(ringSizes).flat().includes(s)).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
            </div>
            
              {/* Carat Weight Select */}
              <div>
                <label htmlFor="carat-weight" className="mb-1 block text-sm font-medium text-gray-700">Gemstone Weight</label>
                <input
                  type="text"
                  placeholder="Search Weight (ct)"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                  value={caratWeightSearch}
                  onChange={e => setCaratWeightSearch(e.target.value)}
                />
                <select
                  id="carat-weight"
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Weights</option>
                  {filteredCaratWeights.map(w => (
                    <option key={w} value={w}>{w} ct</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
                <div>
                <label htmlFor="price-range" className="mb-1 block text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 50LKR, 100USD"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                    value={minPriceInput}
                    onChange={e => setMinPriceInput(e.target.value)}
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="text"
                    placeholder="e.g. 50LKR, 100USD"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                    value={maxPriceInput}
                    onChange={e => setMaxPriceInput(e.target.value)}
                  />
              </div>
            </div>
            
            
                <div className="flex flex-col gap-2 mt-6">
                  <button 
                    className="border border-gray-300 bg-[#bf9b30] text-white rounded-md px-4 py-2 transition" 
                    onClick={handleClearAll}
                  >
                    Clear All
                  </button>
                  <button
                    className="bg-[#bf9b30] hover:bg-[#a88928] text-white py-3 px-6 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:ring-offset-2 flex items-center justify-center gap-2"
                    onClick={() => setShowFilterEmailModal(true)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z" />
                    </svg>
                    Request via Email
                  </button>
                  <button
                    className="border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                    onClick={() => handleRequestViaWhatsApp()}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Request via WhatsApp
                  </button>
                </div>
            </div>
          </div>
        </div>

      {/* Product Listing Section */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
                  id="sort"
            value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-gray-300 bg-gray-100 py-1 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
          </select>
              </div>
        </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              selectedCurrency={selectedCurrency}
              category={product.category}
              material={product.material}
              gemstone={product.gemstone}
              size={product.size}
              carat={product.carat}
              brand={product.brand}
              inStock={product.inStock}
              onViewDetails={() => handleViewDetails(product.id, product)}
              onAddToCart={() => addToCart({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                type: "jewellery",
              })}
              onCustomize={() => {
                console.log("=== CUSTOMIZE BUTTON CLICKED ===");
                console.log("Product data:", product);
                console.log("Product image:", product.image);
                console.log("Product images:", product.images);
                
                // Handle different image structures for jewellery
                const jewelleryImage = product.image || 
                                     (product.images && Array.isArray(product.images) && product.images[0]) ||
                                     (product.images && product.images.main) ||
                                     null;
                
                console.log("Selected jewellery image:", jewelleryImage);
                
                const jewelleryData = { 
                  name: product.name, 
                  image: jewelleryImage, 
                  category: product.category,
                  product 
                };
                
                // Store jewellery data in session storage for persistence
                window.sessionStorage.setItem("customJewelleryData", JSON.stringify(jewelleryData));
                console.log("✅ Jewellery data stored in session storage:", jewelleryData);
                
                setCustomJewelleryData(jewelleryData);
                setModalView("custom-jewellery");
                setShowCustomJewelleryModal(true);
              }}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No jewelry found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition"
              onClick={handleClearAll}
            >
              Clear All Filters
            </button>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* Filter Panel/Modal - Mobile */}
      {showFilterPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto mt-16 max-h-[75vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowFilterPanel(false)}
            >
              ×
            </button>
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              {/* Search input with icon */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, material, gemstone, or size"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Display</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedCurrency}
                  onChange={e => setSelectedCurrency(e.target.value)}
                >
                  <option value="RMD">RMD</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                  <option value="AUR">AUR</option>
                  <option value="YEN">YEN</option>
                  <option value="LKR">LKR</option>
                </select>
                <span className="ml-2 font-bold text-[#bf9b30]">{selectedCurrency}</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                {/* Category Select */}
                <div>
                  <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    placeholder="Search Category"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                    value={categorySearch}
                    onChange={e => setCategorySearch(e.target.value)}
                  />
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Material Select */}
                <div>
                  <label htmlFor="material" className="mb-1 block text-sm font-medium text-gray-700">Material</label>
                  <input
                    type="text"
                    placeholder="Search Material"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                    value={materialSearch}
                    onChange={e => setMaterialSearch(e.target.value)}
                  />
                  <select
                    id="material"
                    value={filterMaterial}
                    onChange={(e) => {
                      setFilterMaterial(e.target.value);
                      setFilterGoldType("");
                      setFilterGoldPurity("");
                    }}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="all">All Materials</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                    <option value="silver">Silver</option>
                    <option value="titanium">Titanium</option>
                  </select>
                  
                  {/* Gold sub-options */}
                  {filterMaterial === "gold" && (
                    <div className="mt-2 space-y-2">
                      <select
                        value={filterGoldType}
                        onChange={(e) => setFilterGoldType(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Gold Type</option>
                        {goldTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      
                      {filterGoldType && (
                        <select
                          value={filterGoldPurity}
                          onChange={(e) => setFilterGoldPurity(e.target.value)}
                          className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select Gold Purity</option>
                          {goldPurities.map(purity => (
                            <option key={purity} value={purity}>{purity}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Gemstone Select */}
                <div>
                  <label htmlFor="gemstone" className="mb-1 block text-sm font-medium text-gray-700">Gemstone</label>
                  <input
                    type="text"
                    placeholder="Search Gemstone"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                    value={gemstoneSearch}
                    onChange={e => setGemstoneSearch(e.target.value)}
                  />
                  <select
                    id="gemstone"
                    value={gemstone}
                    onChange={(e) => setGemstone(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="all">All Gemstones</option>
                    {gemstoneTypes.map(gem => (
                      <option key={gem} value={gem}>{gem}</option>
                    ))}
                  </select>
                </div>
                
                {/* Size Select */}
                <div>
                  <label htmlFor="size" className="mb-1 block text-sm font-medium text-gray-700">Size</label>
                  <input
                    type="text"
                    placeholder="Search Size (e.g., US 6, UK M, EU 50)"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                    value={sizeSearch}
                    onChange={e => setSizeSearch(e.target.value)}
                  />
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="all">All Sizes</option>
                    {Object.entries(ringSizes).map(([region, sizes]) => (
                      <optgroup key={region} label={region}>
                        {sizes.map(size => (
                          <option key={`${region}-${size}`} value={size}>
                            {size}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    {filteredSizes.filter(s => !Object.values(ringSizes).flat().includes(s)).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {/* Carat Weight Select */}
                <div>
                  <label htmlFor="carat-weight" className="mb-1 block text-sm font-medium text-gray-700">Gemstone Weight</label>
                  <input
                    type="text"
                    placeholder="Search Weight (ct)"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 text-sm mb-1"
                    value={caratWeightSearch}
                    onChange={e => setCaratWeightSearch(e.target.value)}
                  />
                  <select
                    id="carat-weight"
                    value={caratWeight}
                    onChange={(e) => setCaratWeight(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="all">All Weights</option>
                    {filteredCaratWeights.map(w => (
                      <option key={w} value={w}>{w} ct</option>
                    ))}
                  </select>
                </div>
                
                {/* Price Range */}
                <div className="col-span-2">
                  <label htmlFor="price-range" className="mb-1 block text-sm font-medium text-gray-700">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 50LKR, 100USD"
                      className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                      value={minPriceInput}
                      onChange={e => setMinPriceInput(e.target.value)}
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="text"
                      placeholder="e.g. 50LKR, 100USD"
                      className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                      value={maxPriceInput}
                      onChange={e => setMaxPriceInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-6">
                <button 
                  className="border border-gray-300 bg-[#bf9b30] text-white rounded-md px-4 py-2 transition" 
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
                <button
                  className="bg-[#bf9b30] hover:bg-[#a88928] text-white py-3 px-6 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:ring-offset-2 flex items-center justify-center gap-2"
                  onClick={() => setShowEmailModal(true)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z" />
                  </svg>
                  Request via Email
                </button>
                <button
                  className="border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  onClick={() => handleRequestViaWhatsApp()}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Request via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Jewellery Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEmailModal(false)}
            >
              &#10005;
            </button>
            <h3 className="text-lg font-bold mb-4">Request via Email</h3>
            <input
              name="fullName"
              value={emailForm.fullName}
              onChange={handleCustomEmailInput}
              placeholder="Full Name"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="address"
              value={emailForm.address}
              onChange={handleCustomEmailInput}
              placeholder="Shipping Address"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="mobile"
              value={emailForm.mobile}
              onChange={handleCustomEmailInput}
              placeholder="Mobile Number"
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              name="details"
              value={emailForm.details}
              onChange={handleCustomEmailInput}
              placeholder="Other Jewelry Details"
              className="w-full mb-2 p-2 border rounded"
              rows={3}
            />
            <button
              className="w-full bg-[#bf9b30] hover:bg-[#a88928] text-white font-semibold rounded px-6 py-2 mt-2"
              onClick={handleCustomSendEmail}
            >
              Send Email
            </button>
            {emailSent && (
              <div className="text-green-600 mt-2">
                Email client opened. Please send the email to complete your request.
              </div>
            )}
          </div>
        </div>
      )}



      {/* Filter Email Modal */}
      {showFilterEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowEmailModal(false)}>&#10005;</button>
            <h3 className="text-lg font-bold mb-4">Request via Email</h3>
            <input name="fullName" value={emailForm.fullName} onChange={handleEmailInput} placeholder="Full Name" className="w-full mb-2 p-2 border rounded" />
            <input name="address" value={emailForm.address} onChange={handleEmailInput} placeholder="Shipping Address" className="w-full mb-2 p-2 border rounded" />
            <input name="mobile" value={emailForm.mobile} onChange={handleEmailInput} placeholder="Mobile Number" className="w-full mb-2 p-2 border rounded" />
            <textarea name="details" value={emailForm.details} onChange={handleEmailInput} placeholder="Other Jewelry Details" className="w-full mb-2 p-2 border rounded" rows={3} />
            <button className="w-full bg-[#bf9b30] hover:bg-[#a88928] text-white font-semibold rounded px-6 py-2 mt-2" onClick={handleSendEmail}>Send Email</button>
            {emailSent && <div className="text-green-600 mt-2">Email client opened. Please send the email to complete your request.</div>}
          </div>
        </div>
      )}

      {/* Single Custom Jewellery Modal */}
      {showCustomJewelleryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => {
                console.log("=== MODAL CLOSE BUTTON CLICKED ===");
                // Clear all session storage related to customization
                window.sessionStorage.removeItem("returnToGemModal");
                window.sessionStorage.removeItem("selectedGemForCustom");
                window.sessionStorage.removeItem("customJewelleryData");
                console.log("✅ Session storage cleared");
                // Close the modal
                setShowCustomJewelleryModal(false);
                setSelectedGem(null);
                setCustomJewelleryData(null);
                setModalView("custom-jewellery");
                // Clear all filters to show all carts
                handleClearAll();
              }}
            >
              ×
            </button>
            
            {/* Custom Jewellery View */}
            
              
              {/* Custom Jewellery Form */}
              <CustomJewelleryPage
                name={customJewelleryData?.name}
                image={getJewelleryImageUrl(customJewelleryData)}
                category={customJewelleryData?.product?.category}
                onClose={() => {
                  setShowCustomJewelleryModal(false);
                  setCustomJewelleryData(null);
                  setModalView("custom-jewellery");
                }}
              />
              
              
              
              
              
              
              
              {/* Custom Design Upload Section */}
              
               

                {/* Request via Email Button (after WhatsApp custom design) */}
              
              </div>
           
            
            
            
          </div>
       
      )}
      
      {/* Custom Jewellery Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEmailModal(false)}
            >
              &#10005;
            </button>
            <h3 className="text-lg font-bold mb-4">Request via Email</h3>
            <input
              name="fullName"
              value={emailForm.fullName}
              onChange={handleCustomEmailInput}
              placeholder="Full Name"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="address"
              value={emailForm.address}
              onChange={handleCustomEmailInput}
              placeholder="Shipping Address"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="mobile"
              value={emailForm.mobile}
              onChange={handleCustomEmailInput}
              placeholder="Mobile Number"
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              name="details"
              value={emailForm.details}
              onChange={handleCustomEmailInput}
              placeholder="Other Jewelry Details"
              className="w-full mb-2 p-2 border rounded"
              rows={3}
            />
            <button
              className="w-full bg-[#bf9b30] hover:bg-[#a88928] text-white font-semibold rounded px-6 py-2 mt-2"
              onClick={handleCustomSendEmail}
            >
              Send Email
            </button>
            {emailSent && (
              <div className="text-green-600 mt-2">
                Email client opened. Please send the email to complete your request.
              </div>
            )}
          </div>
        </div>
      )}
    </>
    </div>
  );
}