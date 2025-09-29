"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCart } from "./cart-context";

// Static gems data for custom jewellery functionality
const staticGems = [
  {
    id: 1,
    name: "Natural Sapphire",
    color: "blue",
    origin: "srilanka",
    imageUrl: "/images/gem01.jpg",
    carats: 2.5,
    specs: { caratWeight: 2.5 },
  },
  {
    id: 2,
    name: "Spinel",
    color: "red",
    origin: "madagascar",
    imageUrl: "/images/gem02.jpg",
    carats: 1.8,
    specs: { caratWeight: 1.8 },
  },
  {
    id: 3,
    name: "Padparadscha",
    color: "pink",
    origin: "srilanka",
    imageUrl: "/images/gem03.jpg",
    carats: 3.2,
    specs: { caratWeight: 3.2 },
  },
  {
    id: 4,
    name: "Garnet",
    color: "red",
    origin: "madagascar",
    imageUrl: "/images/gem04.jpg",
    carats: 2.1,
    specs: { caratWeight: 2.1 },
  },
  {
    id: 5,
    name: "Chrysoberyl",
    color: "yellow",
    origin: "srilanka",
    imageUrl: "/images/gem05.jpg",
    carats: 1.5,
    specs: { caratWeight: 1.5 },
  },
];

// Material and style options
const materialOptions = ["Gold", "Platinum", "Silver", "Titanium"];
const goldTypes = ["White Gold", "Rose Gold", "Pink Gold", "Yellow Gold", "Green Gold"];
const purityOptions = ["14K", "15K", "16K", "17K", "18K", "19K", "20K", "21K", "22K", "23K", "24K"];

const ringStyleOptions = [
  "Solitaire", "Halo", "Vintage", "Modern", "Classic", "Art Deco", "Victorian", 
  "Edwardian", "Contemporary", "Minimalist", "Statement", "Three-Stone", "Pave", 
  "Channel Set", "Bezel Set", "Prong Set", "Tension Set", "Invisible Set", 
  "Cluster", "Eternity"
];

const necklaceStyleOptions = [
  "Pendant", "Choker", "Princess", "Matinee", "Opera", "Rope", "Lariat", 
  "Bib", "Collar", "Station", "Bar", "Y-Necklace", "Heart", "Locket", 
  "Multi-Strand", "Beaded", "Charm", "Tennis", "Floating", "Bolo"
];

const braceletStyleOptions = [
  "Bangle", "Cuff", "Chain", "Charm", "Tennis", "Beaded", "Stretch", "Wrap", 
  "Slave", "Shamballa", "Friendship", "Hinged", "Adjustable", "Mesh", 
  "Pearl", "Gemstone", "Bar", "ID", "Personalized", "Lava"
];

const earringsStyleOptions = [
  "Stud", "Hoop", "Dangle", "Drop", "Huggie", "Chandelier", "Cluster", 
  "Pearl", "Gemstone", "Jacket", "Threader", "Cuff", "Ear Cuff", 
  "Ear Wrap", "Leverback", "Fishhook", "Clip-on", "Screw-back", 
  "Push-back", "Magnetic"
];

// Size options
const ringSizeOptions = {
  US: ["3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"],
  UK: ["F", "F.5", "G", "G.5", "H", "H.5", "I", "I.5", "J", "J.5", "K", "K.5", "L", "L.5", "M", "M.5", "N", "N.5", "O", "O.5", "P", "P.5", "Q", "Q.5", "R", "R.5", "S", "S.5", "T", "T.5", "U", "U.5", "V", "V.5", "W", "W.5", "X", "X.5", "Y", "Y.5", "Z", "Z.5"]
};

const necklaceSizeOptions = {
  US: ['14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
  UK: ["36cm", "40cm", "45cm", "50cm", "55cm", "60cm", "65cm", "70cm", "75cm"]
};

const braceletSizeOptions = {
  US: ['6"', '6.5"', '7"', '7.5"', '8"', '8.5"', '9"', '9.5"', '10"'],
  UK: ["15cm", "16.5cm", "18cm", "19cm", "20cm", "21.5cm", "23cm", "24cm", "25cm"]
};

const earringsSizeOptions = {
  US: ['Small (0.5")', 'Medium (0.75")', 'Large (1")', 'Extra Large (1.25")'],
  UK: ["Small (1.3cm)", "Medium (1.9cm)", "Large (2.5cm)", "Extra Large (3.2cm)"]
};

// Exchange rates (relative to LKR as base)
const exchangeRates = {
  LKR: 1,
  USD: 0.0031,
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
  if (!img) return "/images/1.jpg";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return `http://localhost:3000${img}`;
}

// Helper function to get proper image URL for gems
const getGemImageUrl = (gem) => {
  if (!gem) return "/images/placeholder.svg";
  
  const baseUrl = "http://localhost:3000";
  let imagePath = null;

  if (gem.imageUrl) {
    imagePath = gem.imageUrl;
  } else if (gem.images) {
    if (typeof gem.images === "string") {
      imagePath = gem.images;
    } else if (gem.images.main) {
      imagePath = gem.images.main;
    } else if (Array.isArray(gem.images) && gem.images.length > 0) {
      imagePath = gem.images[0];
    }
  }

  if (!imagePath) return "/images/placeholder.svg";

  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return `${baseUrl}${imagePath}`;
  return `${baseUrl}/uploads/${imagePath}`;
};

export default function JewDetails() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("LKR");
  const { addToCart } = useCart();

  // Custom Jewellery Modal States
  const [ringStyle, setRingStyle] = useState("");
  const [necklaceStyle, setNecklaceStyle] = useState("");
  const [braceletStyle, setBraceletStyle] = useState("");
  const [earringsStyle, setEarringsStyle] = useState("");
  const [customStyle, setCustomStyle] = useState("");
  
  const [ringSize, setRingSize] = useState("");
  const [ringSizeType, setRingSizeType] = useState("US");
  const [necklaceSize, setNecklaceSize] = useState("");
  const [necklaceSizeType, setNecklaceSizeType] = useState("US");
  const [braceletSize, setBraceletSize] = useState("");
  const [braceletSizeType, setBraceletSizeType] = useState("US");
  const [earringsSize, setEarringsSize] = useState("");
  const [earringsSizeType, setEarringsSizeType] = useState("US");
  
  const [material, setMaterial] = useState("Gold");
  const [goldType, setGoldType] = useState("White Gold");
  const [purity, setPurity] = useState("18K");
  const [selectedGem, setSelectedGem] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    fullName: "",
    address: "",
    mobile: "",
    details: "",
  });
  const [emailSent, setEmailSent] = useState(false);

  // State for real product data
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch real jewelry data if not provided via navigation
  useEffect(() => {
    const stateProduct = location.state?.product;
    if (stateProduct) {
      setProduct(stateProduct);
      setLoading(false);
      return;
    }

    // Try to get product by ID from params (if using /jew-details/:id route)
    const fetchJewelry = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/jewelry");
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.data || [];
        let found = null;
        if (params.id) {
          found = items.find((item) => item.id === params.id);
        }
        setProduct(found || items[0] || null);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJewelry();
  }, [location.state, params.id]);

  // Image gallery logic
  const thumbnails = product?.images
    ? Array.isArray(product.images)
      ? product.images.map(getImageUrl)
      : [getImageUrl(product.images)]
    : product?.imageUrl
    ? [getImageUrl(product.imageUrl)]
    : ["/images/1.jpg"];

  const mainImage =
    thumbnails[currentImageIndex] ||
    getImageUrl(product?.imageUrl) ||
    "/images/1.jpg";

  const handleThumbnailClick = (index) => setCurrentImageIndex(index);
  const handlePrevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? thumbnails.length - 1 : prev - 1
    );
  const handleNextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === thumbnails.length - 1 ? 0 : prev + 1
    );

  const handleCustomizeNow = () => setShowCustomizePopup(true);
  const handleCloseCustomize = () => setShowCustomizePopup(false);

  // Handle material change
  const handleMaterialChange = (newMaterial) => {
    setMaterial(newMaterial);
    if (newMaterial !== "Gold") {
      setGoldType("White Gold");
    }
  };

  // Custom Jewellery Handlers
  const handleCustomEmailInput = (e) =>
    setEmailForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  
  const handleCustomSendEmail = async () => {
    const materialInfo =
      material === "Gold" ? `${material} - ${goldType} ${purity}` : material;
    
    let body = `Jewelry Customization Request\n\nFull Name: ${emailForm.fullName}\nShipping Address: ${emailForm.address}\nMobile Number: ${emailForm.mobile}\nJewelry: ${product?.name || "-"}\n`;

    // Add style based on category
    const category = product?.category || "Custom";
    if (category === "Ring" && ringStyle) {
      body += `Ring Style: ${ringStyle}\n`;
    } else if (category === "Necklace" && necklaceStyle) {
      body += `Necklace Style: ${necklaceStyle}\n`;
    } else if (category === "Bracelet" && braceletStyle) {
      body += `Bracelet Style: ${braceletStyle}\n`;
    } else if (category === "Earrings" && earringsStyle) {
      body += `Earrings Style: ${earringsStyle}\n`;
    } else if (customStyle) {
      body += `Custom Style: ${customStyle}\n`;
    }

    // Add sizes based on category
    if (category === "Ring" && ringSize) {
      body += `Ring Size: ${ringSize} (${ringSizeType})\n`;
    } else if (category === "Necklace" && necklaceSize) {
      body += `Necklace Size: ${necklaceSize} (${necklaceSizeType})\n`;
    } else if (category === "Bracelet" && braceletSize) {
      body += `Bracelet Size: ${braceletSize} (${braceletSizeType})\n`;
    } else if (category === "Earrings" && earringsSize) {
      body += `Earrings Size: ${earringsSize} (${earringsSizeType})\n`;
    }

    body += `Material: ${materialInfo}\n`;
    if (selectedGem) {
      body += `Gem: ${selectedGem.name}\n`;
    }
    body += `Other Details: ${emailForm.details}`;

    window.location.href = `mailto:contact@luxirisgems.com?subject=Custom Jewelry Request&body=${encodeURIComponent(body)}`;
    setEmailSent(true);
  };

  const handleCustomWhatsApp = (withUpload = false) => {
    let message = `Jewelry Customization Request:%0A`;
    message += `Jewelry: ${product?.name || "-"}%0A`;
    
    const category = product?.category || "Custom";
    if (category === "Ring" && ringStyle) {
      message += `Ring Style: ${ringStyle}%0A`;
    } else if (category === "Necklace" && necklaceStyle) {
      message += `Necklace Style: ${necklaceStyle}%0A`;
    } else if (category === "Bracelet" && braceletStyle) {
      message += `Bracelet Style: ${braceletStyle}%0A`;
    } else if (category === "Earrings" && earringsStyle) {
      message += `Earrings Style: ${earringsStyle}%0A`;
    } else if (customStyle) {
      message += `Custom Style: ${customStyle}%0A`;
    }

    // Add sizes based on category
    if (category === "Ring" && ringSize) {
      message += `Ring Size: ${ringSize} (${ringSizeType})%0A`;
    } else if (category === "Necklace" && necklaceSize) {
      message += `Necklace Size: ${necklaceSize} (${necklaceSizeType})%0A`;
    } else if (category === "Bracelet" && braceletSize) {
      message += `Bracelet Size: ${braceletSize} (${braceletSizeType})%0A`;
    } else if (category === "Earrings" && earringsSize) {
      message += `Earrings Size: ${earringsSize} (${earringsSizeType})%0A`;
    }

    const materialInfo = material === "Gold" ? `${material} - ${goldType} ${purity}` : material;
    message += `Material: ${materialInfo}%0A`;
    
    if (selectedGem) {
      message += `Gem: ${selectedGem.name || "-"}%0A`;
    }
    if (withUpload && uploadedImage) {
      message += `Custom Design Image: [see uploaded image]%0A`;
    }
    window.open(`https://wa.me/94759627589?text=${message}`, "_blank");
  };

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

  // Handle gem selection from session storage
  useEffect(() => {
    // If a gem was selected in Gem Collection, use it
    const gemJson = window.sessionStorage.getItem("selectedGemForCustom");
    if (gemJson) {
      try {
        setSelectedGem(JSON.parse(gemJson));
        window.sessionStorage.removeItem("selectedGemForCustom");
      } catch {
        /* empty */
      }
    }
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      image: mainImage,
      price: product.price,
      type: "jewellery",
      selectedCurrency: selectedCurrency,
    });
  };

  // Helper functions for style and size management based on product category
  const getStyleOptions = () => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) return ringStyleOptions;
    if (category.includes("necklace")) return necklaceStyleOptions;
    if (category.includes("bracelet")) return braceletStyleOptions;
    if (category.includes("earring")) return earringsStyleOptions;
    return [];
  };

  const getCurrentStyleValue = () => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) return ringStyle;
    if (category.includes("necklace")) return necklaceStyle;
    if (category.includes("bracelet")) return braceletStyle;
    if (category.includes("earring")) return earringsStyle;
    return customStyle;
  };

  const setStyleValue = (value) => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) setRingStyle(value);
    else if (category.includes("necklace")) setNecklaceStyle(value);
    else if (category.includes("bracelet")) setBraceletStyle(value);
    else if (category.includes("earring")) setEarringsStyle(value);
    else setCustomStyle(value);
  };

  const getSizeOptions = () => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) return ringSizeOptions;
    if (category.includes("necklace")) return necklaceSizeOptions;
    if (category.includes("bracelet")) return braceletSizeOptions;
    if (category.includes("earring")) return earringsSizeOptions;
    return { US: [], UK: [] };
  };

  const getCurrentSizeValue = () => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) return ringSize;
    if (category.includes("necklace")) return necklaceSize;
    if (category.includes("bracelet")) return braceletSize;
    if (category.includes("earring")) return earringsSize;
    return "";
  };

  const getCurrentSizeType = () => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) return ringSizeType;
    if (category.includes("necklace")) return necklaceSizeType;
    if (category.includes("bracelet")) return braceletSizeType;
    if (category.includes("earring")) return earringsSizeType;
    return "US";
  };

  const setSizeValue = (value) => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) setRingSize(value);
    else if (category.includes("necklace")) setNecklaceSize(value);
    else if (category.includes("bracelet")) setBraceletSize(value);
    else if (category.includes("earring")) setEarringsSize(value);
  };

  const setSizeType = (value) => {
    const category = product?.category?.toLowerCase() || "";
    if (category.includes("ring")) setRingSizeType(value);
    else if (category.includes("necklace")) setNecklaceSizeType(value);
    else if (category.includes("bracelet")) setBraceletSizeType(value);
    else if (category.includes("earring")) setEarringsSizeType(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading jewelry details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">Jewelry not found.</div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-800 font-[Poppins]">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="relative">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Carousel Arrows */}
              {thumbnails.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-600" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="mt-4 flex space-x-3 overflow-x-auto pb-2">
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                    index === currentImageIndex
                      ? "border-2 border-blue-500"
                      : "border border-gray-300 hover:border-blue-500"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#bf9b30]">
              {product.name}
            </h2>

            {/* Price Display with Currency Selection */}
            {product.price && (
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-blue-700">
                  {selectedCurrency === "LKR" ? "Rs. " : ""}
                  {convertCurrency(
                    product.price,
                    selectedCurrency
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  {selectedCurrency}
                </div>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="LKR">LKR</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                  <option value="AUR">AUR</option>
                  <option value="YEN">YEN</option>
                  <option value="RMD">RMD</option>
                </select>
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Material */}
              {product.material && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Material</span>
                  <span className="text-blue-700 italic">
                    {product.material}
                  </span>
                </div>
              )}
              {/* Weight */}
              {product.weight && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Weight</span>
                  <span className="text-blue-700 italic">{product.weight}</span>
                </div>
              )}
              {/* Size */}
              {product.size && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Size</span>
                  <span className="text-blue-700 italic">{product.size}</span>
                </div>
              )}
              {/* Category */}
              {product.category && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Category</span>
                  <span className="text-blue-700 italic">
                    {product.category}
                  </span>
                </div>
              )}
              {/* Gemstone */}
              {product.gemstone && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Gemstone</span>
                  <span className="text-blue-700 italic">
                    {product.gemstone}
                  </span>
                </div>
              )}
              {/* Carat */}
              {product.carat && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Carat</span>
                  <span className="text-blue-700 italic">{product.carat}</span>
                </div>
              )}
              {/* Brand */}
              {product.brand && (
                <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Brand</span>
                  <span className="text-blue-700 italic">{product.brand}</span>
                </div>
              )}
              {/* In Stock */}
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">
                  Availability
                </span>
                <span
                  className={`italic ${
                    product.inStock ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="w-40 bg-[#bf9b30] text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button
                className="w-40 bg-[#bf9b30] text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                onClick={() => setShowCustomizePopup(true)}
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Customize Popup Modal */}
      {showCustomizePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold text-[#bf9b30]">
                Customize Your {product.category || "Jewelry"}
              </h2>
              <button
                onClick={() => setShowCustomizePopup(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Product Preview */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-lg">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-[#bf9b30] mt-2">
                    {selectedCurrency === "LKR" ? "Rs. " : ""}
                    {convertCurrency(product.price, selectedCurrency).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    {selectedCurrency}
                  </p>
                </div>
              </div>

              {/* Customization Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Style Selection */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Style Options</h4>
                  
                  {getStyleOptions().length > 0 ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {product.category} Style
                      </label>
                      <select
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                        value={getCurrentStyleValue()}
                        onChange={(e) => setStyleValue(e.target.value)}
                      >
                        <option value="">Select Style</option>
                        {getStyleOptions().map((style) => (
                          <option key={style} value={style}>
                            {style}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  {/* Custom Style Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {getStyleOptions().length > 0 ? "Or enter custom style:" : "Custom Style:"}
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                      value={customStyle}
                      onChange={(e) => setCustomStyle(e.target.value)}
                      placeholder={`Enter custom ${(product.category || "jewelry").toLowerCase()} style`}
                    />
                  </div>
                </div>

                {/* Size Selection */}
                {getSizeOptions().US.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Size Options</h4>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Size</label>
                        <select
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                          value={getCurrentSizeValue()}
                          onChange={(e) => setSizeValue(e.target.value)}
                        >
                          <option value="">Select Size</option>
                          {getSizeOptions()[getCurrentSizeType()]?.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-24">
                        <label className="block text-sm font-medium mb-2">Unit</label>
                        <select
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                          value={getCurrentSizeType()}
                          onChange={(e) => {
                            setSizeType(e.target.value);
                            setSizeValue(""); // Reset size when type changes
                          }}
                        >
                          <option value="US">US</option>
                          <option value="UK">UK</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Material Selection */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Material Options</h4>
                  <div>
                    <label className="block text-sm font-medium mb-2">Metal Type</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                      value={material}
                      onChange={(e) => handleMaterialChange(e.target.value)}
                    >
                      {materialOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gold Type - Only show when Gold is selected */}
                  {material === "Gold" && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <label className="block text-sm font-medium mb-2 text-yellow-800">
                        Gold Type
                      </label>
                      <select
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white mb-3"
                        value={goldType}
                        onChange={(e) => setGoldType(e.target.value)}
                      >
                        {goldTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      
                      <label className="block text-sm font-medium mb-2 text-yellow-800">
                        Purity
                      </label>
                      <select
                        className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                        value={purity}
                        onChange={(e) => setPurity(e.target.value)}
                      >
                        {purityOptions.map((purityOpt) => (
                          <option key={purityOpt} value={purityOpt}>
                            {purityOpt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Gem Selection */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Gemstone Options</h4>
                  <button
                    className="w-40 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                    onClick={() => navigate("/gem-collection")}
                  >
                    Select Gemstone
                  </button>
                  
                  {selectedGem && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={getGemImageUrl(selectedGem)}
                          alt={selectedGem.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "/images/placeholder.svg";
                          }}
                        />
                        <div>
                          <h5 className="font-semibold text-gray-800">{selectedGem.name}</h5>
                          <p className="text-sm text-gray-600">Color: {selectedGem.color}</p>
                          <p className="text-sm text-gray-600">
                            Carat: {selectedGem.carats || selectedGem.specs?.caratWeight || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">Origin: {selectedGem.origin}</p>
                        </div>
                        <button
                          onClick={() => setSelectedGem(null)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Design Upload */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Custom Design Upload
                </h4>
                <p className="text-gray-600 mb-4">
                  Have a specific design in mind? Upload an image and we'll create something similar.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#bf9b30] file:text-white hover:file:bg-[#a88928]"
                />
                {uploadedImage && (
                  <div className="flex flex-col items-center">
                    <img
                      src={uploadedImage}
                      alt="Custom Design"
                      className="w-40 h-40 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      This image will be shared with our designers
                    </p>
                  </div>
                )}
              </div>

              {/* Summary of Selected Options */}
              {(getCurrentStyleValue() || customStyle || getCurrentSizeValue() || selectedGem) && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">
                    Customization Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {(getCurrentStyleValue() || customStyle) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Style:</span>
                        <span className="font-medium text-green-700">
                          {getCurrentStyleValue() || customStyle}
                        </span>
                      </div>
                    )}
                    {getCurrentSizeValue() && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-green-700">
                          {getCurrentSizeValue()} ({getCurrentSizeType()})
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium text-green-700">
                        {material === "Gold" ? `${goldType} ${purity}` : material}
                      </span>
                    </div>
                    {selectedGem && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gemstone:</span>
                        <span className="font-medium text-green-700">{selectedGem.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col item-center justify-center sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  className="w-60 md:w-60 h-8 border border-green-600 text-green-600 text-sm text-black bg-green-50 hover:bg-green-100 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200 transform active:scale-105"
                  onClick={() => handleCustomWhatsApp()}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.510-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Contact Via WhatsApp
                </button>
                <button
                  className="w-60 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                  onClick={() => setShowEmailModal(true)}
                >
                  Request Via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <h3 className="text-lg font-bold mb-4 text-center">Request via Email</h3>
              <input
                name="fullName"
                value={emailForm.fullName}
                onChange={handleCustomEmailInput}
                placeholder="Full Name"
                className="w-full text-sm mb-2 p-2 border rounded"
              />
              <input
                name="address"
                value={emailForm.address}
                onChange={handleCustomEmailInput}
                placeholder="Shipping Address"
                className="w-full text-sm mb-2 p-2 border rounded"
              />
              <input
                name="mobile"
                value={emailForm.mobile}
                onChange={handleCustomEmailInput}
                placeholder="Mobile Number"
                className="w-full text-sm mb-2 p-2 border rounded"
              />
              <textarea
                name="details"
                value={emailForm.details}
                onChange={handleCustomEmailInput}
                placeholder="Additional customization details"
                className="w-full text-sm mb-2 p-2 border rounded"
                rows={4}
              />
          <div className="text-xs text-gray-500 mb-2">All gem details will be included automatically in the email.</div>
            <dev className="flex flex-col items-center justify-center mt-4">
              <button
                className="w-40 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                onClick={handleCustomSendEmail}
              >
                Send Email Request
              </button>
            </dev>
              
              {emailSent && (
                <div className="text-black-600 text-sm mt-3">
                  Email client opened. Please send the email to complete your request.
                </div>
              )}
            </div>
          </div>
      )}
    </div>
  );
}