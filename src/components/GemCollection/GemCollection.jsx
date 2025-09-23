"use client";

import { Search, Phone, Filter, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart-context";
import { fetchGems } from "./gems-data";
import Customize from "../customize"; // Updated import

// Loading Skeleton Component
const GemCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col animate-pulse">
    <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
    <div className="h-6 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
    <div className="h-5 bg-gray-200 rounded mb-2 w-1/2"></div>
    <div className="flex gap-2 mt-auto">
      <div className="flex-1 h-10 bg-gray-200 rounded"></div>
      <div className="flex-1 h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    <div className="text-xl font-semibold text-gray-600">Loading gems...</div>
  </div>
);

// Removed unused functions to fix linter errors

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    const incrementTime = duration / end;
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

// Shape images mapping (add your actual image paths here)
const shapeImages = {
  "Octagonal Square": "/images/ss1.jpg",
  "Octagonal Rectangle": "/images/ss2.jpg",
  Round: "/images/ss3.jpg",
  Oval: "/images/ss4.jpg",
  Pear: "/images/ss5.jpg",
  Heart: "/images/ss6.jpg",
  Cushion: "/images/ss7.jpg",
  Marquise: "/images/ss8.jpg",
  "Cabochon Oval": "/images/ss9.jpg",
  Sugarloaf: "/images/ss10.jpg",
  "Cabochon Round": "/images/ss11.jpg",
  "Cabochon Pear": "/images/ss12.jpg",
};

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

export default function GemCollection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State for gems data
  const [gems, setGems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)

    // Load gems from API
  useEffect(() => {
    const loadGems = async () => {
      try {
        setLoading(true)
        setError(null)
        setDataLoaded(false)
        
        // Add minimum loading time for smooth UX
        const [gemsData] = await Promise.all([
          fetchGems(),
          new Promise(resolve => setTimeout(resolve, 800)) // Minimum 800ms loading
        ]);
        
        setGems(gemsData || [])
        setDataLoaded(true)
      } catch (err) {
        setError(err.message)
        setGems([])
      } finally {
        // Add a small delay before hiding loading to show the animation
        setTimeout(() => {
          setLoading(false)
        }, 200)
      }
    }
    
    loadGems()
  }, [])

  // Debug session storage on page load
  useEffect(() => {
    console.log("Gem Collection page loaded");
    console.log("returnToGemModal:", window.sessionStorage.getItem("returnToGemModal"));
    console.log("selectedGemForCustom:", window.sessionStorage.getItem("selectedGemForCustom"));
  }, [])

  // Debug: Log gem data structure when gems change
  useEffect(() => {
    if (gems.length > 0) {
      console.log('Gem data structure:', gems[0]);
      console.log('Available gem properties:', Object.keys(gems[0]));
    }
  }, [gems])

  // Static filter options as per user request
  const calibrationOptions = ["Calibrated", "Free Style"];
  const shapeOptions = [
    "Octagonal Square",
    "Octagonal Rectangle",
    "Round",
    "Oval",
    "Pear",
    "Heart",
    "Cushion",
    "Marquise",
    "Cabochon Oval",
    "Sugarloaf",
    "Cabochon Round",
    "Cabochon Pear",
  ];
  const cutOptions = ["Faceted", "Cabochon"];
  const intensityOptions = [
    "Deep",
    "Vivid",
    "Intense",
    "Medium Intense",
    "Light",
    "Very",
  ];
  const clarityOptions = ["Slightly Included", "Included"];
  const treatmentOptions = ["Normally Heated", "Unheated"];

  // Updated filter options as per user request
  // Removed unused variables to fix linter errors
  const priceOptions = ["Under $100", "$100 - $500", "$500 - $1000", "$1000 - $5000", "Over $5000"];
  
  // Generate dimension options as requested
  const lengthOptions = Array.from({length: 12}, (_, i) => (4 + i * 0.5).toFixed(1)).map(val => `${val}mm`);
  const widthOptions = Array.from({length: 12}, (_, i) => (4 + i * 0.5).toFixed(1)).map(val => `${val}mm`);
  const heightOptions = Array.from({length: 10}, (_, i) => (2.5 + i * 0.5).toFixed(1)).map(val => `${val}mm`);

  // Extract unique values for other dropdowns from gems data (keeping for backward compatibility)
  const gemTypes = useMemo(() => [...new Set(gems.map((g) => g.name))], [gems]);
  const origins = useMemo(
    () => [...new Set(gems.map((g) => g.origin).filter(Boolean))],
    [gems]
  );
  const colors = useMemo(
    () => [...new Set(gems.map((g) => g.color).filter(Boolean))],
    [gems]
  );

  // State for filters and search
  const [search, setSearch] = useState("");
  const [selectedCalibration, setSelectedCalibration] = useState("");
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedCut, setSelectedCut] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");
  const [selectedClarity, setSelectedClarity] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedWidth, setSelectedWidth] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  // const [minPriceInput, setMinPriceInput] = useState("");
  // const [maxPriceInput, setMaxPriceInput] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Search states for filter inputs
  const [calibrationSearch, setCalibrationSearch] = useState("");
  const [shapeSearch, setShapeSearch] = useState("");
  const [cutSearch, setCutSearch] = useState("");
  const [intensitySearch, setIntensitySearch] = useState("");
  const [claritySearch, setClaritySearch] = useState("");
  const [treatmentSearch, setTreatmentSearch] = useState("");
  const [lengthSearch, setLengthSearch] = useState("");
  const [widthSearch, setWidthSearch] = useState("");
  const [heightSearch, setHeightSearch] = useState("");
  const [originSearch, setOriginSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");

  // Filtered options for dropdowns based on search inputs
  const filteredCalibrationOptions = calibrationOptions.filter((opt) =>
    opt.toLowerCase().includes(calibrationSearch.toLowerCase())
  );

  const filteredCutOptions = cutOptions.filter((opt) =>
    opt.toLowerCase().includes(cutSearch.toLowerCase())
  );

  const filteredIntensityOptions = intensityOptions.filter((opt) =>
    opt.toLowerCase().includes(intensitySearch.toLowerCase())
  );

  const filteredClarityOptions = clarityOptions.filter((opt) =>
    opt.toLowerCase().includes(claritySearch.toLowerCase())
  );

  const filteredTreatmentOptions = treatmentOptions.filter((opt) =>
    opt.toLowerCase().includes(treatmentSearch.toLowerCase())
  );


  const filteredColors = colors.filter(
    (opt) => opt && opt.toLowerCase().includes(colorSearch.toLowerCase())
  );

  const filteredTypes = gemTypes.filter(
    (opt) => opt && opt.toLowerCase().includes(typeSearch.toLowerCase())
  );

  const filteredOrigins = origins.filter(
    (opt) => opt && opt.toLowerCase().includes(originSearch.toLowerCase())
  );

  const filteredPriceOptions = priceOptions.filter(
    (opt) => opt && opt.toLowerCase().includes(priceSearch.toLowerCase())
  );

  // Dimension filters with mm suffix - removed unused variables to fix linter errors

  // CLEAR ALL handler
  const handleClearAll = () => {
    setSearch("");
    setSelectedCalibration("");
    setSelectedShapes([]);
    setSelectedCut("");
    setSelectedIntensity("");
    setSelectedClarity("");
    setSelectedTreatment("");
    setSelectedLength("");
    setSelectedWidth("");
    setSelectedHeight("");
    setSelectedOrigin("");
    setSelectedType("");
    setSelectedColor("");
    setSelectedPrice("");
    // setMinPriceInput("");
    // setMaxPriceInput("");
    setSortBy("Featured");
    setCalibrationSearch("");
    setShapeSearch("");
    setCutSearch("");
    setIntensitySearch("");
    setClaritySearch("");
    setTreatmentSearch("");
    setLengthSearch("");
    setWidthSearch("");
    setHeightSearch("");
    setOriginSearch("");
    setTypeSearch("");
    setColorSearch("");
    setPriceSearch("");
  };

  // WhatsApp Request handler
  const handleWhatsAppRequest = () => {
    const filters = [];
    filters.push(`Type: ${selectedType || "-"}`);
    filters.push(`Color: ${selectedColor || "-"}`);
    filters.push(`Origin: ${selectedOrigin || "-"}`);
    filters.push(`Calibration: ${selectedCalibration || "-"}`);
    filters.push(
      `Shape: ${selectedShapes.length > 0 ? selectedShapes.join(", ") : "-"}`
    );
    filters.push(`Cut: ${selectedCut || "-"}`);
    filters.push(`Intensity: ${selectedIntensity || "-"}`);
    filters.push(`Clarity: ${selectedClarity || "-"}`);
    filters.push(`Treatment: ${selectedTreatment || "-"}`);
    filters.push(`Length: ${selectedLength || "-"}`);
    filters.push(`Width: ${selectedWidth || "-"}`);
    filters.push(`Height: ${selectedHeight || "-"}`);
    // filters.push(`Min Price: ${minPriceInput || "-"}`);
    // filters.push(`Max Price: ${maxPriceInput || "-"}`);
    filters.push(`Currency: ${selectedCurrency}`);
    const filterString = `\n${filters.join("\n")}`;
    const message = encodeURIComponent(
      `Gem Inquiry:%0A${filterString}`
    );
    window.open(`https://wa.me/94759627589?text=${message}`, '_blank');
  };

  // Helper function to get image URL
  const getImageUrl = (gem) => {
    const baseUrl = "http://localhost:3000";
    
    let imagePath = null;
    
    if (gem.imageUrl) {
      imagePath = gem.imageUrl;
    } else if (gem.images) {
      if (typeof gem.images === 'string') {
        imagePath = gem.images;
      } else if (gem.images.main) {
        imagePath = gem.images.main;
      } else if (Array.isArray(gem.images) && gem.images.length > 0) {
        imagePath = gem.images[0];
      }
    }
    
    if (!imagePath) {
      return "/images/placeholder.svg";
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath.startsWith('/')) {
      return `${baseUrl}${imagePath}`;
    }
    
    return `${baseUrl}/uploads/${imagePath}`;
  }

  // Helper function to get gem price
  const getGemPrice = (gem) => {
    return gem.price || 0;
  }

  // Helper function to get gem carats

  // Filtering logic
  const filteredGems = useMemo(() => {
    let result = gems;
    
    // Debug: Log initial count
    console.log('Initial gems count:', result.length);

    // Main search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (g) =>
          (g.name && g.name.toLowerCase().includes(searchLower)) ||
          (g.color && g.color.toLowerCase().includes(searchLower)) ||
          (g.origin && g.origin.toLowerCase().includes(searchLower)) ||
          (g.shape && g.shape.toLowerCase().includes(searchLower)) ||
          (g.cut && g.cut.toLowerCase().includes(searchLower)) ||
          (g.treatment && g.treatment.toLowerCase().includes(searchLower)) ||
          (g.clarity && g.clarity.toLowerCase().includes(searchLower)) ||
          (g.intensity && g.intensity.toLowerCase().includes(searchLower))
      );
    }

    // Type filter
    if (selectedType) {
      console.log('Filtering by type:', selectedType);
      result = result.filter((g) => g.name === selectedType);
      console.log('After type filter:', result.length);
    } else if (typeSearch) {
      console.log('Filtering by type search:', typeSearch);
      result = result.filter((g) => g.name && g.name.toLowerCase().includes(typeSearch.toLowerCase()));
      console.log('After type search filter:', result.length);
    }

    // Color filter
    if (selectedColor) {
      console.log('Filtering by color:', selectedColor);
      result = result.filter((g) => g.color === selectedColor);
      console.log('After color filter:', result.length);
    } else if (colorSearch) {
      console.log('Filtering by color search:', colorSearch);
      result = result.filter((g) => g.color && g.color.toLowerCase().includes(colorSearch.toLowerCase()));
      console.log('After color search filter:', result.length);
    }

    // Origin filter
    if (selectedOrigin) {
      result = result.filter(g => g.origin === selectedOrigin);
    } else if (originSearch) {
      console.log('Filtering by origin search:', originSearch);
      result = result.filter((g) => g.origin && g.origin.toLowerCase().includes(originSearch.toLowerCase()));
      console.log('After origin search filter:', result.length);
    }

    // Calibration filter
    if (selectedCalibration) {
      result = result.filter((g) => g.calibration === selectedCalibration);
    } else if (calibrationSearch) {
      console.log('Filtering by calibration search:', calibrationSearch);
      result = result.filter((g) => g.calibration && g.calibration.toLowerCase().includes(calibrationSearch.toLowerCase()));
      console.log('After calibration search filter:', result.length);
    }

    // Shape filter
    if (selectedShapes.length > 0) {
      result = result.filter((g) => selectedShapes.includes(g.shape));
    }

    // Cut filter
    if (selectedCut) {
      result = result.filter((g) => g.cut === selectedCut);
    } else if (cutSearch) {
      console.log('Filtering by cut search:', cutSearch);
      result = result.filter((g) => g.cut && g.cut.toLowerCase().includes(cutSearch.toLowerCase()));
      console.log('After cut search filter:', result.length);
    }

    // Intensity filter
    if (selectedIntensity) {
      result = result.filter((g) => g.intensity === selectedIntensity);
    } else if (intensitySearch) {
      console.log('Filtering by intensity search:', intensitySearch);
      result = result.filter((g) => g.intensity && g.intensity.toLowerCase().includes(intensitySearch.toLowerCase()));
      console.log('After intensity search filter:', result.length);
    }

    // Clarity filter
    if (selectedClarity) {
      result = result.filter((g) => g.clarity === selectedClarity);
    } else if (claritySearch) {
      console.log('Filtering by clarity search:', claritySearch);
      result = result.filter((g) => g.clarity && g.clarity.toLowerCase().includes(claritySearch.toLowerCase()));
      console.log('After clarity search filter:', result.length);
    }

    // Treatment filter
    if (selectedTreatment) {
      result = result.filter((g) => g.treatment === selectedTreatment);
    } else if (treatmentSearch) {
      console.log('Filtering by treatment search:', treatmentSearch);
      result = result.filter((g) => g.treatment && g.treatment.toLowerCase().includes(treatmentSearch.toLowerCase()));
      console.log('After treatment search filter:', result.length);
    }

    // Dimension filters
    if (selectedLength) {
      const lengthValue = parseFloat(selectedLength.replace("mm", ""));
      result = result.filter((g) => {
        const gemLength = g.length || g.dimensions?.length || g.specs?.length;
        return gemLength === lengthValue;
      });
    } else if (lengthSearch) {
      console.log('Filtering by length search:', lengthSearch);
      const searchValue = lengthSearch.replace("mm", "").trim();
      result = result.filter((g) => {
        const gemLength = g.length || g.dimensions?.length || g.specs?.length;
        return gemLength && gemLength.toString().includes(searchValue);
      });
      console.log('After length search filter:', result.length);
    }

    if (selectedWidth) {
      const widthValue = parseFloat(selectedWidth.replace("mm", ""));
      result = result.filter((g) => {
        const gemWidth = g.width || g.dimensions?.width || g.specs?.width;
        return gemWidth === widthValue;
      });
    } else if (widthSearch) {
      console.log('Filtering by width search:', widthSearch);
      const searchValue = widthSearch.replace("mm", "").trim();
      result = result.filter((g) => {
        const gemWidth = g.width || g.dimensions?.width || g.specs?.width;
        return gemWidth && gemWidth.toString().includes(searchValue);
      });
      console.log('After width search filter:', result.length);
    }

    if (selectedHeight) {
      const heightValue = parseFloat(selectedHeight.replace("mm", ""));
      result = result.filter((g) => {
        const gemHeight = g.height || g.dimensions?.height || g.specs?.height;
        return gemHeight === heightValue;
      });
    } else if (heightSearch) {
      console.log('Filtering by height search:', heightSearch);
      const searchValue = heightSearch.replace("mm", "").trim();
      result = result.filter((g) => {
        const gemHeight = g.height || g.dimensions?.height || g.specs?.height;
        return gemHeight && gemHeight.toString().includes(searchValue);
      });
      console.log('After height search filter:', result.length);
    }

    // Price filter
    if (selectedPrice) {
      console.log('Filtering by price:', selectedPrice);
      const priceRange = selectedPrice.toLowerCase();
      if (priceRange.includes("under $100")) {
        result = result.filter(g => getGemPrice(g) < 100);
      } else if (priceRange.includes("$100 - $500")) {
        result = result.filter(g => getGemPrice(g) >= 100 && getGemPrice(g) <= 500);
      } else if (priceRange.includes("$500 - $1000")) {
        result = result.filter(g => getGemPrice(g) >= 500 && getGemPrice(g) <= 1000);
      } else if (priceRange.includes("$1000 - $5000")) {
        result = result.filter(g => getGemPrice(g) >= 1000 && getGemPrice(g) <= 5000);
      } else if (priceRange.includes("over $5000")) {
        result = result.filter(g => getGemPrice(g) > 5000);
      }
      console.log('After price filter:', result.length);
    } else if (priceSearch) {
      console.log('Filtering by price search:', priceSearch);
      const searchValue = priceSearch.toLowerCase();
      result = result.filter((g) => {
        const price = getGemPrice(g);
        return price && price.toString().includes(searchValue.replace(/[^0-9]/g, ''));
      });
      console.log('After price search filter:', result.length);
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => getGemPrice(a) - getGemPrice(b));
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => getGemPrice(b) - getGemPrice(a));
    } else if (sortBy === "Newest Arrivals") {
      result = [...result].sort((a, b) => (b.id || b._id).localeCompare(a.id || a._id));
    }

    console.log('Final filtered gems count:', result.length);
    return result;
  }, [
    gems, search,
    selectedType, typeSearch,
    selectedColor, colorSearch,
    selectedCalibration, calibrationSearch,
    selectedShapes,
    selectedCut, cutSearch,
    selectedIntensity, intensitySearch,
    selectedClarity, claritySearch,
    selectedTreatment, treatmentSearch,
    selectedLength, lengthSearch,
    selectedWidth, widthSearch,
    selectedHeight, heightSearch,
    selectedOrigin, originSearch,
    selectedPrice, priceSearch,
    sortBy,
  ]);

  const handleViewDetails = (gem) => {
    navigate(`/gem-details/${gem.id}`, { state: { gem } });
  };

  const handleSelectForCustomization = (gem) => {
    console.log("handleSelectForCustomization called with gem:", gem);
    console.log("Gem properties:", {
      id: gem.id,
      name: gem.name,
      color: gem.color,
      origin: gem.origin,
      imageUrl: gem.imageUrl,
      carats: gem.carats
    });
    
    // Store the selected gem in session storage
    const gemJson = JSON.stringify(gem);
    window.sessionStorage.setItem("selectedGemForCustom", gemJson);
    console.log("selectedGemForCustom stored in session storage:", gemJson);
    
    // Verify the storage worked
    const storedGem = window.sessionStorage.getItem("selectedGemForCustom");
    console.log("Verification - stored gem:", storedGem);
    
    // Navigate back to the previous page (jewellery collection or details)
    navigate(-1);
  };

  // Add state to control filter modal visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Prevent background scroll when filter panel is open
  useEffect(() => {
    if (showFilterPanel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilterPanel]);

  // Email modal state for filter section
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    fullName: "",
    address: "",
    mobile: "",
    details: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const handleEmailInput = (e) =>
    setEmailForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSendEmail = async () => {
    const filters = [];
    if (selectedType) filters.push(`Type: ${selectedType}`);
    if (selectedCalibration)
      filters.push(`Calibration: ${selectedCalibration}`);
    if (selectedShapes.length > 0)
      filters.push(`Shape: ${selectedShapes.join(", ")}`);
    if (selectedCut) filters.push(`Cut: ${selectedCut}`);
    if (selectedIntensity) filters.push(`Intensity: ${selectedIntensity}`);
    if (selectedClarity) filters.push(`Clarity: ${selectedClarity}`);
    if (selectedTreatment) filters.push(`Treatment: ${selectedTreatment}`);
    if (selectedLength) filters.push(`Length: ${selectedLength}`);
    if (selectedWidth) filters.push(`Width: ${selectedWidth}`);
    if (selectedHeight) filters.push(`Height: ${selectedHeight}`);
    if (selectedOrigin) filters.push(`Origin: ${selectedOrigin}`);
    if (selectedColor) filters.push(`Color: ${selectedColor}`);
    // if (minPriceInput) {
    //   const [price, currency] = minPriceInput.split(",");
    //   filters.push(`Min Price: ${price}${currency}`);
    // }
    // if (maxPriceInput) {
    //   const [price, currency] = maxPriceInput.split(",");
    //   filters.push(`Max Price: ${price}${currency}`);
    // }
    if (selectedCurrency) filters.push(`Currency: ${selectedCurrency}`);
    const filterString = filters.length ? `\n${filters.join("\n")}` : "";
    const body = `Gem Inquiry\n\nFull Name: ${emailForm.fullName}\nShipping Address: ${emailForm.address}\nMobile Number: ${emailForm.mobile}\n${filterString}\nOther Details: ${emailForm.details}`;
    window.location.href = `mailto:gangulr30@gmail.com?subject=Gem Inquiry&body=${encodeURIComponent(
      body
    )}`;
    setEmailSent(true);
  };

  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [customizeGem, setCustomizeGem] = useState(null);

  // Show enhanced loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#bf9b30] mb-6"></div>
          <div className="text-xl font-semibold text-[#bf9b30]">Loading gems...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-xl font-semibold text-red-600 mb-4">Error loading gems</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 font-[Poppins]">
      {/* Hero Section with fade-in animation */}
      <div className={`relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden transition-all duration-1000 ${dataLoaded ? 'animate-fade-in' : ''}`}>
        <img
          src="/images/g00.jpg"
          alt="Gem Collection Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="relative z-20 space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg animate-slide-up">
            
            Gem Collection
          
          </h1>
          <p className="text-base md:text-lg drop-shadow-md animate-slide-up animation-delay-300">
            
            Discover Our Finest Ceylon Sapphires & Precious Gems
          
          </p>
        </div>
      </div>

      {/* Selection Mode Notification */}
      {window.sessionStorage.getItem("returnToGemModal") && (
        <div className="bg-blue-500 text-white py-3 px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Selection Mode Active - Click on any gem to select it for customization</span>
          </div>
        </div>
      )}

      {/* Filter Button (mobile only) */}
      <div className="flex lg:hidden sticky top-0 z-30 bg-white shadow-sm px-4 py-2 justify-between items-center">
        <button
          className="flex items-center gap-2 bg-[#bf9b30] hover:bg-[#a88928] text-white px-4 py-2 rounded-md font-semibold shadow transition-all duration-200 hover:scale-105"
          onClick={() => setShowFilterPanel(true)}
        >
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 container mx-auto px-4 py-8 lg:py-8 py-16 min-h-[90vh]">
        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block lg:w-1/3 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-32 max-h-[calc(100vh-7rem)] overflow-y-auto">
            {/* Back to Customization Button - Desktop */}
            {window.sessionStorage.getItem("returnToGemModal") && (
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold shadow transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    window.sessionStorage.removeItem("returnToGemModal");
                    window.sessionStorage.removeItem("selectedGemForCustom");
                    navigate(-1);
                  }}
                >
                  ← Back to Customization
                </button>
              </div>
            )}
            <h2 className="text-xl text-[#bf9b30] text-center font-bold mb-4">
              Filters
            </h2>
            {/* Main Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gems by name, color, origin, shape, cut, treatment..."
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type
                </label>
                <input
                  type="text"
                  placeholder="Search Type"
                  className={`w-full border rounded-md px-3 py-2 text-sm mb-1 ${
                    typeSearch ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  value={typeSearch}
                  onChange={(e) => setTypeSearch(e.target.value)}
                />
                <select
                  id="type"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {filteredTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Color
                </label>
                <input
                  type="text"
                  placeholder="Search Color"
                  className={`w-full border rounded-md px-3 py-2 text-sm mb-1 ${
                    colorSearch ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                />
                <select
                  id="color"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">All Colors</option>
                  {filteredColors.map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Origin */}
              <div>
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Origin
                </label>
                <input
                  type="text"
                  placeholder="Search Origin"
                  className={`w-full border rounded-md px-3 py-2 text-sm mb-1 ${
                    originSearch ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  value={originSearch}
                  onChange={(e) => setOriginSearch(e.target.value)}
                />
                <select
                  id="origin"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                >
                  <option value="">All Origins</option>
                  {filteredOrigins.map((origin) => (
                    <option key={origin} value={origin}>
                      {origin.charAt(0).toUpperCase() + origin.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price-range"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="text"
                  placeholder="Search Price"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={priceSearch}
                  onChange={(e) => setPriceSearch(e.target.value)}
                />
                <select
                  id="price-range"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  <option value="">All Prices</option>
                  {filteredPriceOptions.map((price) => (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Display
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  <option value="RMD">RMD</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                  <option value="AUR">AUR</option>
                  <option value="YEN">YEN</option>
                  <option value="LKR">LKR</option>
                </select>
              </div>

              {/* Calibration */}
              <div>
                <label
                  htmlFor="calibration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Calibration
                </label>
                <input
                  type="text"
                  placeholder="Search Calibration"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={calibrationSearch}
                  onChange={(e) => setCalibrationSearch(e.target.value)}
                />
                <select
                  id="calibration"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedCalibration}
                  onChange={(e) => setSelectedCalibration(e.target.value)}
                >
                  <option value="">All Calibrations</option>
                  {filteredCalibrationOptions.map((cal) => (
                    <option key={cal} value={cal}>
                      {cal.charAt(0).toUpperCase() + cal.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shape */}
              <div>
                <label
                  htmlFor="shape"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shape
                </label>
                <input
                  type="text"
                  placeholder="Search Shape"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={shapeSearch}
                  onChange={(e) => setShapeSearch(e.target.value)}
                  onClick={() => setShowShapeModal(true)}
                  readOnly
                />
                <div
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                  onClick={() => setShowShapeModal(true)}
                >
                  {selectedShapes.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedShapes.map((shape) => (
                        <span
                          key={shape}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {shape}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">Select Shapes</span>
                  )}
                </div>
              </div>

              {/* Cut */}
              <div>
                <label
                  htmlFor="cut"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cut
                </label>
                <input
                  type="text"
                  placeholder="Search Cut"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={cutSearch}
                  onChange={(e) => setCutSearch(e.target.value)}
                />
                <select
                  id="cut"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedCut}
                  onChange={(e) => setSelectedCut(e.target.value)}
                >
                  <option value="">All Cuts</option>
                  {filteredCutOptions.map((cut) => (
                    <option key={cut} value={cut}>
                      {cut.charAt(0).toUpperCase() + cut.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intensity */}
              <div>
                <label
                  htmlFor="intensity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Intensity
                </label>
                <input
                  type="text"
                  placeholder="Search Intensity"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={intensitySearch}
                  onChange={(e) => setIntensitySearch(e.target.value)}
                />
                <select
                  id="intensity"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedIntensity}
                  onChange={(e) => setSelectedIntensity(e.target.value)}
                >
                  <option value="">All Intensities</option>
                  {filteredIntensityOptions.map((intensity) => (
                    <option key={intensity} value={intensity}>
                      {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clarity */}
              <div>
                <label
                  htmlFor="clarity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Clarity
                </label>
                <input
                  type="text"
                  placeholder="Search Clarity"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={claritySearch}
                  onChange={(e) => setClaritySearch(e.target.value)}
                />
                <select
                  id="clarity"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedClarity}
                  onChange={(e) => setSelectedClarity(e.target.value)}
                >
                  <option value="">All Clarities</option>
                  {filteredClarityOptions.map((clarity) => (
                    <option key={clarity} value={clarity}>
                      {clarity.charAt(0).toUpperCase() + clarity.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Treatment */}
              <div>
                <label
                  htmlFor="treatment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Treatment
                </label>
                <input
                  type="text"
                  placeholder="Search Treatment"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={treatmentSearch}
                  onChange={(e) => setTreatmentSearch(e.target.value)}
                />
                <select
                  id="treatment"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                >
                  <option value="">All Treatments</option>
                  {filteredTreatmentOptions.map((treatment) => (
                    <option key={treatment} value={treatment}>
                      {treatment.charAt(0).toUpperCase() + treatment.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div>
                <label
                  htmlFor="length"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Length (mm)
                </label>
                <input
                  type="text"
                  placeholder="Search Length"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={lengthSearch}
                  onChange={(e) => setLengthSearch(e.target.value)}
                />
                <select
                  id="length"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(e.target.value)}
                >
                  <option value="">All Lengths</option>
                  {lengthOptions.map((len) => (
                    <option key={len} value={len}>
                      {len}
                    </option>
                  ))}
                </select>
              </div>

              {/* Width */}
              <div>
                <label
                  htmlFor="width"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Width (mm)
                </label>
                <input
                  type="text"
                  placeholder="Search Width"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={widthSearch}
                  onChange={(e) => setWidthSearch(e.target.value)}
                />
                <select
                  id="width"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedWidth}
                  onChange={(e) => setSelectedWidth(e.target.value)}
                >
                  <option value="">All Widths</option>
                  {widthOptions.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Height */}
              <div>
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Height (mm)
                </label>
                <input
                  type="text"
                  placeholder="Search Height"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                  value={heightSearch}
                  onChange={(e) => setHeightSearch(e.target.value)}
                />
                <select
                  id="height"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={selectedHeight}
                  onChange={(e) => setSelectedHeight(e.target.value)}
                >
                  <option value="">All Heights</option>
                  {heightOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* WhatsApp Request Button */}
            <div className="flex flex-row justify-center mt-4 gap-2">
              <button
                className="border border-[#007bff] text-[#007bff] hover:bg-gray-50 px-4 py-2 rounded-md bg-transparent font-semibold"
                onClick={handleClearAll}
              >
                Clear All
              </button>
              <button
                className="bg-[#bf9b30] hover:bg-[#a88928] text-white px-4 py-2 rounded-md font-semibold"
                onClick={() => setShowEmailModal(true)}
              >
                Request via Email
              </button>
              <button
                className="border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                onClick={handleWhatsAppRequest}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Request via WhatsApp
              </button>
            </div>
            {/* Email Modal */}
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
                    onChange={handleEmailInput}
                    placeholder="Full Name"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    name="address"
                    value={emailForm.address}
                    onChange={handleEmailInput}
                    placeholder="Shipping Address"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    name="mobile"
                    value={emailForm.mobile}
                    onChange={handleEmailInput}
                    placeholder="Mobile Number"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    name="details"
                    value={emailForm.details}
                    onChange={handleEmailInput}
                    placeholder="Other Gem Details (optional)"
                    className="w-full mb-2 p-2 border rounded"
                    rows={3}
                  />
                  <div className="text-xs text-gray-500 mb-2">
                    All selected gem filter details will be included
                    automatically in the email.
                  </div>
                  <button
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded px-6 py-2 mt-2"
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </button>
                  {emailSent && (
                    <div className="text-green-600 mt-2">
                      Email client opened. Please send the email to complete
                      your request.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Clear All Button */}
            <div className="flex justify-center md:justify-end gap-4 mt-6">
             
            </div>
          </div>
        </div>

        {/* Product Listing Section */}
        <div className="w-full lg:w-2/3">
          {/* Sort Options and Filter Button (Desktop) */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              Showing {filteredGems.length} of {gems.length} gems
              {import.meta.env.MODE === 'development' && (
                <div className="text-xs text-gray-400 mt-1">
                  Active filters: {[
                    selectedType && `Type: ${selectedType}`,
                    typeSearch && !selectedType && `Type Search: ${typeSearch}`,
                    selectedColor && `Color: ${selectedColor}`,
                    colorSearch && !selectedColor && `Color Search: ${colorSearch}`,
                    selectedOrigin && `Origin: ${selectedOrigin}`,
                    originSearch && !selectedOrigin && `Origin Search: ${originSearch}`,
                    selectedPrice && `Price: ${selectedPrice}`,
                    priceSearch && !selectedPrice && `Price Search: ${priceSearch}`,
                    selectedCalibration && `Calibration: ${selectedCalibration}`,
                    calibrationSearch && !selectedCalibration && `Calibration Search: ${calibrationSearch}`,
                    selectedCut && `Cut: ${selectedCut}`,
                    cutSearch && !selectedCut && `Cut Search: ${cutSearch}`,
                    selectedIntensity && `Intensity: ${selectedIntensity}`,
                    intensitySearch && !selectedIntensity && `Intensity Search: ${intensitySearch}`,
                    selectedClarity && `Clarity: ${selectedClarity}`,
                    claritySearch && !selectedClarity && `Clarity Search: ${claritySearch}`,
                    selectedTreatment && `Treatment: ${selectedTreatment}`,
                    treatmentSearch && !selectedTreatment && `Treatment Search: ${treatmentSearch}`,
                    selectedShapes.length > 0 && `Shapes: ${selectedShapes.join(', ')}`,
                    shapeSearch && selectedShapes.length === 0 && `Shape Search: ${shapeSearch}`,
                    selectedLength && `Length: ${selectedLength}`,
                    lengthSearch && !selectedLength && `Length Search: ${lengthSearch}`,
                    selectedWidth && `Width: ${selectedWidth}`,
                    widthSearch && !selectedWidth && `Width Search: ${widthSearch}`,
                    selectedHeight && `Height: ${selectedHeight}`,
                    heightSearch && !selectedHeight && `Height Search: ${heightSearch}`
                  ].filter(Boolean).join(', ')}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-700"
              >
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-gray-300 bg-gray-100 py-1 px-3 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Featured">Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest</option>
              </select>
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {filteredGems.map((gem) => {
              const displayPrice = convertCurrency(gem.price, selectedCurrency);
              return (
                <div
                  key={gem.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
                >
                  <div className="relative w-full">
                    <img
                      src={getImageUrl(gem)}
                      alt={getImageUrl(gem)}
                      className={`w-full h-40 object-cover rounded mb-4 ${
                        window.sessionStorage.getItem("returnToGemModal") 
                          ? "cursor-pointer hover:opacity-80 transition-opacity" 
                          : ""
                      }`}
                      onClick={() => {
                        if (window.sessionStorage.getItem("returnToGemModal")) {
                          console.log("Gem image clicked for selection:", gem.name);
                          handleSelectForCustomization(gem);
                        }
                      }}
                    />
                    {/* Stock Status */}
                    <div className="absolute top-2 left-2 rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                      In Stock
                    </div>
                  </div>
                  {/* Show selection indicator when returnToGemModal is active */}
                  {window.sessionStorage.getItem("returnToGemModal") && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Click to Select
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{gem.name}</h3>
                  
                  {/* Gem Details */}
                  <div className="mb-3 space-y-1">
                    {gem.carats && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Carat Weight:</span>
                        <span className="text-gray-800 font-medium">{gem.carats}</span>
                      </div>
                    )}
                    {gem.color && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Color:</span>
                        <span className="text-gray-800 font-medium">{gem.color}</span>
                      </div>
                    )}
                    {gem.origin && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Origin:</span>
                        <span className="text-gray-800 font-medium">{gem.origin}</span>
                      </div>
                    )}
                    {gem.cut && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cut:</span>
                        <span className="text-gray-800 font-medium">{gem.cut}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-blue-700 font-bold mb-2">
                    {selectedCurrency === 'LKR' ? 'Rs. ' : ''}
                    {displayPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedCurrency}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="flex-1 bg-[#bf9b30] text-white py-2 rounded-full font-semi text-xs shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bf9b30]/40"
                      onClick={() => handleViewDetails(gem)}
                    >
                      View Details
                    </button>
                    <button
                      className="flex-1 bg-white text-black py-2 rounded-full font-semibold border border-black text-xs shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                      onClick={() =>
                        addToCart({
                          id: gem.id,
                          name: gem.name,
                          image: getImageUrl(gem),
                          price: gem.price,
                          type: "gem",
                          selectedCurrency: selectedCurrency,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 bg-[#bf9b30] text-white py-2 rounded-full font-semi text-xs shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bf9b30]/40"
                      onClick={() => {
                        setCustomizeGem(gem);
                        setShowCustomizePopup(true);
                      }}
                    >
                      Customize
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Modal - Mobile */}
      {showFilterPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center p-4 pt-20">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors duration-200"
              onClick={() => setShowFilterPanel(false)}
            >
              ×
            </button>
            {/* Filter Section (moved here from always-visible) */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              {/* Main Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search gems by name, color, origin, shape, cut, treatment..."
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    placeholder="Search Type"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={typeSearch}
                    onChange={(e) => setTypeSearch(e.target.value)}
                  />
                  <select
                    id="type"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {filteredTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    placeholder="Search Color"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={colorSearch}
                    onChange={(e) => setColorSearch(e.target.value)}
                  />
                  <select
                    id="color"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="">All Colors</option>
                    {filteredColors.map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Origin */}
                <div>
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Origin
                  </label>
                  <input
                    type="text"
                    placeholder="Search Origin"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={originSearch}
                    onChange={(e) => setOriginSearch(e.target.value)}
                  />
                  <select
                    id="origin"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                  >
                    <option value="">All Origins</option>
                    {filteredOrigins.map((origin) => (
                      <option key={origin} value={origin}>
                        {origin.charAt(0).toUpperCase() + origin.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="price-range"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="Search Price"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={priceSearch}
                    onChange={(e) => setPriceSearch(e.target.value)}
                  />
                  <select
                    id="price-range"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  >
                    <option value="">All Prices</option>
                    {filteredPriceOptions.map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Display
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <option value="RMD">RMD</option>
                    <option value="USD">USD</option>
                    <option value="AED">AED</option>
                    <option value="AUR">AUR</option>
                    <option value="YEN">YEN</option>
                    <option value="LKR">LKR</option>
                  </select>
                </div>

                {/* Calibration */}
                <div>
                  <label
                    htmlFor="calibration"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Calibration
                  </label>
                  <input
                    type="text"
                    placeholder="Search Calibration"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={calibrationSearch}
                    onChange={(e) => setCalibrationSearch(e.target.value)}
                  />
                  <select
                    id="calibration"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedCalibration}
                    onChange={(e) => setSelectedCalibration(e.target.value)}
                  >
                    <option value="">All Calibrations</option>
                    {filteredCalibrationOptions.map((cal) => (
                      <option key={cal} value={cal}>
                        {cal.charAt(0).toUpperCase() + cal.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Shape */}
                <div>
                  <label
                    htmlFor="shape"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Shape
                  </label>
                  <input
                    type="text"
                    placeholder="Search Shape"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={shapeSearch}
                    onChange={(e) => setShapeSearch(e.target.value)}
                    onClick={() => setShowShapeModal(true)}
                    readOnly
                  />
                  <div
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                    onClick={() => setShowShapeModal(true)}
                  >
                    {selectedShapes.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedShapes.map((shape) => (
                          <span
                            key={shape}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {shape}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Select Shapes</span>
                    )}
                  </div>
                </div>

                {/* Cut */}
                <div>
                  <label
                    htmlFor="cut"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cut
                  </label>
                  <input
                    type="text"
                    placeholder="Search Cut"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={cutSearch}
                    onChange={(e) => setCutSearch(e.target.value)}
                  />
                  <select
                    id="cut"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedCut}
                    onChange={(e) => setSelectedCut(e.target.value)}
                  >
                    <option value="">All Cuts</option>
                    {filteredCutOptions.map((cut) => (
                      <option key={cut} value={cut}>
                        {cut.charAt(0).toUpperCase() + cut.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Intensity */}
                <div>
                  <label
                    htmlFor="intensity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Intensity
                  </label>
                  <input
                    type="text"
                    placeholder="Search Intensity"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={intensitySearch}
                    onChange={(e) => setIntensitySearch(e.target.value)}
                  />
                  <select
                    id="intensity"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedIntensity}
                    onChange={(e) => setSelectedIntensity(e.target.value)}
                  >
                    <option value="">All Intensities</option>
                    {filteredIntensityOptions.map((intensity) => (
                      <option key={intensity} value={intensity}>
                        {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clarity */}
                <div>
                  <label
                    htmlFor="clarity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Clarity
                  </label>
                  <input
                    type="text"
                    placeholder="Search Clarity"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={claritySearch}
                    onChange={(e) => setClaritySearch(e.target.value)}
                  />
                  <select
                    id="clarity"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedClarity}
                    onChange={(e) => setSelectedClarity(e.target.value)}
                  >
                    <option value="">All Clarities</option>
                    {filteredClarityOptions.map((clarity) => (
                      <option key={clarity} value={clarity}>
                        {clarity.charAt(0).toUpperCase() + clarity.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Treatment */}
                <div>
                  <label
                    htmlFor="treatment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Treatment
                  </label>
                  <input
                    type="text"
                    placeholder="Search Treatment"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={treatmentSearch}
                    onChange={(e) => setTreatmentSearch(e.target.value)}
                  />
                  <select
                    id="treatment"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                  >
                    <option value="">All Treatments</option>
                    {filteredTreatmentOptions.map((treatment) => (
                      <option key={treatment} value={treatment}>
                        {treatment.charAt(0).toUpperCase() + treatment.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Length */}
                <div>
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Length (mm)
                  </label>
                  <input
                    type="text"
                    placeholder="Search Length"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={lengthSearch}
                    onChange={(e) => setLengthSearch(e.target.value)}
                  />
                  <select
                    id="length"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedLength}
                    onChange={(e) => setSelectedLength(e.target.value)}
                  >
                    <option value="">All Lengths</option>
                    {lengthOptions.map((len) => (
                      <option key={len} value={len}>
                        {len}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Width */}
                <div>
                  <label
                    htmlFor="width"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Width (mm)
                  </label>
                  <input
                    type="text"
                    placeholder="Search Width"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={widthSearch}
                    onChange={(e) => setWidthSearch(e.target.value)}
                  />
                  <select
                    id="width"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedWidth}
                    onChange={(e) => setSelectedWidth(e.target.value)}
                  >
                    <option value="">All Widths</option>
                    {widthOptions.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Height */}
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Height (mm)
                  </label>
                  <input
                    type="text"
                    placeholder="Search Height"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-1"
                    value={heightSearch}
                    onChange={(e) => setHeightSearch(e.target.value)}
                  />
                  <select
                    id="height"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={selectedHeight}
                    onChange={(e) => setSelectedHeight(e.target.value)}
                  >
                    <option value="">All Heights</option>
                    {heightOptions.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* WhatsApp Request Button */}
              <div className="flex justify-center mt-4 gap-2">
                <div className="w-full flex flex-col items-center gap-4 mt-6">
                 <div className="w-full flex justify-center">
  <div className="w-full max-w-xs flex flex-col items-center gap-4">
    {/* CLEAR ALL */}
    <button
      className="border border-[#007bff] text-[#007bff] py-3 px-6 rounded-md font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 flex items-center justify-center gap-2"
      onClick={handleClearAll}
    >
      CLEAR ALL
    </button>

    {/* Request via Email */}
    <button
      className="bg-[#bf9b30] hover:bg-[#a88928] text-white py-3 px-6 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:ring-offset-2 flex items-center justify-center gap-2"
      onClick={() => setShowEmailModal(true)}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z" />
      </svg>
      Request via Email
    </button>

    {/* Request via WhatsApp */}
    <button
      className="border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
      onClick={handleWhatsAppRequest}
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
              {/* Email Modal */}
              {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    {/* Close button (X icon) */}
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                      onClick={() => setShowEmailModal(false)}
                    >
                      &times;
                    </button>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-4 text-center text-[#bf9b30]">
                      Request via Email
                    </h3>

                    {/* Input Fields */}
                    <input
                      name="fullName"
                      value={emailForm.fullName}
                      onChange={handleEmailInput}
                      placeholder="Full Name"
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      name="address"
                      value={emailForm.address}
                      onChange={handleEmailInput}
                      placeholder="Shipping Address"
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      name="mobile"
                      value={emailForm.mobile}
                      onChange={handleEmailInput}
                      placeholder="Mobile Number"
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      name="details"
                      value={emailForm.details}
                      onChange={handleEmailInput}
                      placeholder="Other Gem Details (optional)"
                      className="w-full mb-2 p-2 border rounded"
                      rows={3}
                    />

                    {/* Note */}
                    <div className="text-xs text-gray-500 mb-2">
                      All selected gem filter details will be included
                      automatically in the email.
                    </div>

                    {/* Send Email Button */}
                    <button
                      className="w-full bg-[#bf9b30] hover:bg-[#a88928] text-white font-semibold rounded px-6 py-2 mt-2"
                      onClick={handleSendEmail}
                    >
                      Send Email
                    </button>

                    {/* Confirmation Message */}
                    {emailSent && (
                      <div className="text-green-600 mt-2 text-sm">
                        Email client opened. Please send the email to complete
                        your request.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shape Selection Modal */}
      {showShapeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Shapes</h3>
              <button
                onClick={() => setShowShapeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {shapeOptions.map((shape) => (
                  <div
                    key={shape}
                    className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer transition hover:shadow-lg ${
                      selectedShapes.includes(shape)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedShapes([shape]);
                      setShowShapeModal(false);
                    }}
                  >
                    <img
                      src={
                        shapeImages[shape] || "/images/placeholder-shape.png"
                      }
                      alt={shape}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <span className="text-sm text-center font-medium">
                      {shape}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowShapeModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowShapeModal(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customize Popup */}
      {showCustomizePopup && customizeGem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowCustomizePopup(false)}
            >
              ×
            </button>
            <Customize
              selectedGem={customizeGem}
              onClose={() => setShowCustomizePopup(false)}
            />
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="fixed left-6 bottom-6 z-20">
       
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Gem List */}
      
   
    </div>
  );
}