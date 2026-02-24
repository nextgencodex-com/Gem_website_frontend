import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Static gems data for custom jewellery functionality
const staticGems = [
  {
    id: 1,
    name: "Natural Sapphire",
    color: "blue",
    origin: "srilanka",
    imageUrl: "/images/gem1.jpg",
    carats: 2.5,
    specs: { caratWeight: 2.5 },
  },
  {
    id: 2,
    name: "Spinel",
    color: "red",
    origin: "madagascar",
    imageUrl: "/images/gem2.jpg",
    carats: 1.8,
    specs: { caratWeight: 1.8 },
  },
  {
    id: 3,
    name: "Padparadscha",
    color: "pink",
    origin: "srilanka",
    imageUrl: "/images/gem3.jpg",
    carats: 3.2,
    specs: { caratWeight: 3.2 },
  },
  {
    id: 4,
    name: "Garnet",
    color: "red",
    origin: "madagascar",
    imageUrl: "/images/gem4.jpg",
    carats: 2.1,
    specs: { caratWeight: 2.1 },
  },
  {
    id: 5,
    name: "Chrysoberyl",
    color: "yellow",
    origin: "srilanka",
    imageUrl: "/images/gem5.jpg",
    carats: 1.5,
    specs: { caratWeight: 1.5 },
  },
];

const materialOptions = ["Gold", "Platinum", "Silver", "Titanium"];

const goldTypes = [
  "White Gold",
  "Rose Gold",
  "Pink Gold",
  "Yellow Gold",
  "Green Gold",
];

const purityOptions = [
  "14K",
  "15K",
  "16K",
  "17K",
  "18K",
  "19K",
  "20K",
  "21K",
  "22K",
  "23K",
  "24K",
];

const ringStyleOptions = [
  "Solitaire",
  "Halo",
  "Vintage",
  "Modern",
  "Classic",
  "Art Deco",
  "Victorian",
  "Edwardian",
  "Contemporary",
  "Minimalist",
  "Statement",
  "Three-Stone",
  "Pave",
  "Channel Set",
  "Bezel Set",
  "Prong Set",
  "Tension Set",
  "Invisible Set",
  "Cluster",
  "Eternity",
];

const necklaceStyleOptions = [
  "Pendant",
  "Choker",
  "Princess",
  "Matinee",
  "Opera",
  "Rope",
  "Lariat",
  "Bib",
  "Collar",
  "Station",
  "Bar",
  "Y-Necklace",
  "Heart",
  "Locket",
  "Multi-Strand",
  "Beaded",
  "Charm",
  "Tennis",
  "Floating",
  "Bolo",
];

const braceletStyleOptions = [
  "Bangle",
  "Cuff",
  "Chain",
  "Charm",
  "Tennis",
  "Beaded",
  "Stretch",
  "Wrap",
  "Slave",
  "Shamballa",
  "Friendship",
  "Hinged",
  "Adjustable",
  "Mesh",
  "Pearl",
  "Gemstone",
  "Bar",
  "ID",
  "Personalized",
  "Lava",
];

const earringsStyleOptions = [
  "Stud",
  "Hoop",
  "Dangle",
  "Drop",
  "Huggie",
  "Chandelier",
  "Cluster",
  "Pearl",
  "Gemstone",
  "Jacket",
  "Threader",
  "Cuff",
  "Ear Cuff",
  "Ear Wrap",
  "Leverback",
  "Fishhook",
  "Clip-on",
  "Screw-back",
  "Push-back",
  "Magnetic",
];

// Size options for different jewelry types
const ringSizeOptions = {
  US: [
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
  ],
  UK: [
    "F",
    "F.5",
    "G",
    "G.5",
    "H",
    "H.5",
    "I",
    "I.5",
    "J",
    "J.5",
    "K",
    "K.5",
    "L",
    "L.5",
    "M",
    "M.5",
    "N",
    "N.5",
    "O",
    "O.5",
    "P",
    "P.5",
    "Q",
    "Q.5",
    "R",
    "R.5",
    "S",
    "S.5",
    "T",
    "T.5",
    "U",
    "U.5",
    "V",
    "V.5",
    "W",
    "W.5",
    "X",
    "X.5",
    "Y",
    "Y.5",
    "Z",
    "Z.5",
  ],
};

const necklaceSizeOptions = {
  US: ['14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
  UK: ["36cm", "40cm", "45cm", "50cm", "55cm", "60cm", "65cm", "70cm", "75cm"],
};

const braceletSizeOptions = {
  US: ['6"', '6.5"', '7"', '7.5"', '8"', '8.5"', '9"', '9.5"', '10"'],
  UK: [
    "15cm",
    "16.5cm",
    "18cm",
    "19cm",
    "20cm",
    "21.5cm",
    "23cm",
    "24cm",
    "25cm",
  ],
};

const earringsSizeOptions = {
  US: ['Small (0.5")', 'Medium (0.75")', 'Large (1")', 'Extra Large (1.25")'],
  UK: [
    "Small (1.3cm)",
    "Medium (1.9cm)",
    "Large (2.5cm)",
    "Extra Large (3.2cm)",
  ],
};

// Helper function to get proper image URL for gems
const getGemImageUrl = (gem) => {
  if (!gem) {
    console.log("getGemImageUrl: No gem provided");
    return null;
  }

  const baseUrl = "http://localhost:3000";
  let imagePath = null;

  console.log("getGemImageUrl: Processing gem:", gem.name, "with properties:", {
    imageUrl: gem.imageUrl,
    images: gem.images,
  });

  // Try different possible image properties
  if (gem.imageUrl) {
    imagePath = gem.imageUrl;
    console.log("getGemImageUrl: Using imageUrl:", imagePath);
  } else if (gem.images) {
    if (typeof gem.images === "string") {
      imagePath = gem.images;
      console.log("getGemImageUrl: Using images string:", imagePath);
    } else if (gem.images.main) {
      imagePath = gem.images.main;
      console.log("getGemImageUrl: Using images.main:", imagePath);
    } else if (Array.isArray(gem.images) && gem.images.length > 0) {
      imagePath = gem.images[0];
      console.log("getGemImageUrl: Using images array first item:", imagePath);
    }
  }

  if (!imagePath) {
    console.log("getGemImageUrl: No image path found, using placeholder");
    return "/images/placeholder.svg";
  }

  // Handle different URL formats
  if (imagePath.startsWith("http")) {
    console.log("getGemImageUrl: Returning full URL:", imagePath);
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    const fullUrl = `${baseUrl}${imagePath}`;
    console.log("getGemImageUrl: Returning relative URL with base:", fullUrl);
    return fullUrl;
  }

  // If it's just a filename, assume it's in uploads folder
  const uploadUrl = `${baseUrl}/uploads/${imagePath}`;
  console.log("getGemImageUrl: Returning upload URL:", uploadUrl);
  return uploadUrl;
};

export default function CustomJewelleryPage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  // Use props first, then location.state fallback
  const name = props.name || (location.state && location.state.name) || "";
  const image = props.image || (location.state && location.state.image) || "";
  const category =
    props.category || (location.state && location.state.category) || "";

  // Handle close and refresh functionality
  const handleCloseAndRefresh = () => {
    // Clear all session storage related to customization
    window.sessionStorage.removeItem("returnToGemModal");
    window.sessionStorage.removeItem("selectedGemForCustom");

    // Navigate back to jewellery collection page
    navigate("/jewellery-collection");
  };

  // Jewelry customization state
  const [ringStyle, setRingStyle] = useState("");
  const [necklaceStyle, setNecklaceStyle] = useState("");
  const [braceletStyle, setBraceletStyle] = useState("");
  const [earringsStyle, setEarringsStyle] = useState("");
  const [customStyle, setCustomStyle] = useState("");

  // Size states
  const [ringSize, setRingSize] = useState("");
  const [ringSizeType, setRingSizeType] = useState("US");
  const [necklaceSize, setNecklaceSize] = useState("");
  const [necklaceSizeType, setNecklaceSizeType] = useState("US");
  const [braceletSize, setBraceletSize] = useState("");
  const [braceletSizeType, setBraceletSizeType] = useState("US");
  const [earringsSize, setEarringsSize] = useState("");
  const [earringsSizeType, setEarringsSizeType] = useState("US");

  // Material states
  const [material, setMaterial] = useState(materialOptions[0]);
  const [goldType, setGoldType] = useState("");
  const [purity, setPurity] = useState("18K");

  // Gem selection state
  const [showGemModal, setShowGemModal] = useState(false);
  const [selectedGem, setSelectedGem] = useState(null);
  const [gemSearch, setGemSearch] = useState("");
  const [gemColor, setGemColor] = useState("");
  const [gemType, setGemType] = useState("");
  const [gemOrigin, setGemOrigin] = useState("");

  // Handle reopening modal if coming back from Gem Collection
  useEffect(() => {
    console.log("Custom Jewellery useEffect - checking session storage");

    if (window.sessionStorage.getItem("returnToGemModal")) {
      console.log("Returning to gem modal");
      setShowGemModal(true);
      window.sessionStorage.removeItem("returnToGemModal");
    }

    // If a gem was selected in Gem Collection, use it
    const gemJson = window.sessionStorage.getItem("selectedGemForCustom");
    if (gemJson) {
      try {
        const parsedGem = JSON.parse(gemJson);
        console.log("Setting selected gem from session storage:", parsedGem);
        setSelectedGem(parsedGem);
      } catch (error) {
        console.error("Error parsing gem from session storage:", error);
      }
      window.sessionStorage.removeItem("selectedGemForCustom");
    }

    // Handle selected gem from navigation state
    if (location.state && location.state.selectedGem) {
      console.log(
        "Setting selected gem from location state:",
        location.state.selectedGem
      );
      setSelectedGem(location.state.selectedGem);
    }
  }, [location.state]);

  // WhatsApp integration
  const handleRequestViaWhatsApp = (withUpload = false) => {
    let message = `Jewelry Customization Request:%0A%0A`;
    message += `Jewelry: ${name || "-"}%0A`;
    // Do NOT include jewelry or gem images in the message

    // Add style based on category
    if (category === "Rings" && ringStyle) {
      message += `Ring Style: ${ringStyle}%0A`;
    } else if (category === "Necklace" && necklaceStyle) {
      message += `Necklace Style: ${necklaceStyle}%0A`;
    } else if (category === "Bracelet" && braceletStyle) {
      message += `Bracelet Style: ${braceletStyle}%0A`;
    } else if (category === "Earings" && earringsStyle) {
      message += `Earrings Style: ${earringsStyle}%0A`;
    } else if (customStyle) {
      message += `Custom Style: ${customStyle}%0A`;
    }

    // Add sizes based on category
    if (category === "Rings" && ringSize) {
      message += `Ring Size: ${ringSize} (${ringSizeType})%0A`;
    } else if (category === "Necklace" && necklaceSize) {
      message += `Necklace Size: ${necklaceSize} (${necklaceSizeType})%0A`;
    } else if (category === "Bracelet" && braceletSize) {
      message += `Bracelet Size: ${braceletSize} (${braceletSizeType})%0A`;
    } else if (category === "Earings" && earringsSize) {
      message += `Earrings Size: ${earringsSize} (${earringsSizeType})%0A`;
    }

    message += `Metal Type: ${material || "-"}%0A`;
    if (material === "Gold" && goldType) {
      message += `Gold Type: ${goldType}%0A`;
      message += `Purity: ${purity}%0A`;
    }
    if (selectedGem) {
      message += `Gem: ${selectedGem.name || "-"}%0A`;
    }
    if (withUpload && uploadedImage) {
      message += `Custom Design Image: [see uploaded image]%0A`;
    }
    window.location.href = `https://wa.me/94759627589?text=${message}`;
  };

  // Image upload for custom design
  const [uploadedImage, setUploadedImage] = useState(null);
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

  // Gem filter logic
  const uniqueGemTypes = useMemo(
    () => [...new Set(staticGems.map((g) => g.name))],
    []
  );
  const uniqueGemColors = useMemo(
    () => [...new Set(staticGems.map((g) => g.color))],
    []
  );
  const uniqueGemOrigins = useMemo(
    () => [...new Set(staticGems.map((g) => g.origin))],
    []
  );

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

  // Email modal state
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
    // Compose email body
    let body = `Jewelry Customization Request\n\nFull Name: ${
      emailForm.fullName
    }\nShipping Address: ${emailForm.address}\nMobile Number: ${
      emailForm.mobile
    }\nJewelry: ${name || "-"}\n`;

    // Add style based on category
    if (category === "Rings" && ringStyle) {
      body += `Ring Style: ${ringStyle}\n`;
    } else if (category === "Necklace" && necklaceStyle) {
      body += `Necklace Style: ${necklaceStyle}\n`;
    } else if (category === "Bracelet" && braceletStyle) {
      body += `Bracelet Style: ${braceletStyle}\n`;
    } else if (category === "Earrings" && earringsStyle) {
      body += `Earings Style: ${earringsStyle}\n`;
    } else if (customStyle) {
      body += `Custom Style: ${customStyle}\n`;
    }

    // Add sizes based on category
    if (category === "Rings" && ringSize) {
      body += `Ring Size: ${ringSize} (${ringSizeType})\n`;
    } else if (category === "Necklace" && necklaceSize) {
      body += `Necklace Size: ${necklaceSize} (${necklaceSizeType})\n`;
    } else if (category === "Bracelet" && braceletSize) {
      body += `Bracelet Size: ${braceletSize} (${braceletSizeType})\n`;
    } else if (category === "Earrings" && earringsSize) {
      body += `Earings Size: ${earringsSize} (${earringsSizeType})\n`;
    }

    body += `Metal Type: ${material || "-"}`;

    if (material === "Gold" && goldType) {
      body += `\nGold Type: ${goldType}\nPurity: ${purity}`;
    }

    if (selectedGem) {
      body += `\nGem: ${selectedGem.name}`;
    }

    body += `\nOther Details: ${emailForm.details}`;

    // Use mailto for now (can be replaced with backend API)
    window.location.href = `mailto:contact@luxirisgems.com?subject=Custom Jewelry Request&body=${encodeURIComponent(
      body
    )}`;
    setEmailSent(true);
  };

  // Get the appropriate style options based on category
  const getStyleOptions = () => {
    switch (category) {
      case "Rings":
        return ringStyleOptions;
      case "Necklace":
        return necklaceStyleOptions;
      case "Bracelet":
        return braceletStyleOptions;
      case "Earings":
        return earringsStyleOptions;
      default:
        return [];
    }
  };

  // Get the current style value based on category
  const getCurrentStyleValue = () => {
    switch (category) {
      case "Rings":
        return ringStyle;
      case "Necklace":
        return necklaceStyle;
      case "Bracelet":
        return braceletStyle;
      case "Earings":
        return earringsStyle;
      default:
        return customStyle;
    }
  };

  // Set the style value based on category
  const setStyleValue = (value) => {
    switch (category) {
      case "Rings":
        setRingStyle(value);
        break;
      case "Necklace":
        setNecklaceStyle(value);
        break;
      case "Bracelet":
        setBraceletStyle(value);
        break;
      case "Earings":
        setEarringsStyle(value);
        break;
      default:
        setCustomStyle(value);
    }
  };

  // Get the appropriate size options based on category
  const getSizeOptions = () => {
    switch (category) {
      case "Rings":
        return ringSizeOptions;
      case "Necklace":
        return necklaceSizeOptions;
      case "Bracelet":
        return braceletSizeOptions;
      case "Earings":
        return earringsSizeOptions;
      default:
        return { US: [], UK: [] };
    }
  };

  // Get the current size value based on category
  const getCurrentSizeValue = () => {
    switch (category) {
      case "Rings":
        return ringSize;
      case "Necklace":
        return necklaceSize;
      case "Bracelet":
        return braceletSize;
      case "Earings":
        return earringsSize;
      default:
        return "";
    }
  };

  // Get the current size type based on category
  const getCurrentSizeType = () => {
    switch (category) {
      case "Rings":
        return ringSizeType;
      case "Necklace":
        return necklaceSizeType;
      case "Bracelet":
        return braceletSizeType;
      case "Earings":
        return earringsSizeType;
      default:
        return "US";
    }
  };

  // Set the size value based on category
  const setSizeValue = (value) => {
    switch (category) {
      case "Rings":
        setRingSize(value);
        break;
      case "Necklace":
        setNecklaceSize(value);
        break;
      case "Bracelet":
        setBraceletSize(value);
        break;
      case "Earings":
        setEarringsSize(value);
        break;
      default:
        break;
    }
  };

  // Set the size type based on category
  const setSizeType = (value) => {
    switch (category) {
      case "Rings":
        setRingSizeType(value);
        break;
      case "Necklace":
        setNecklaceSizeType(value);
        break;
      case "Bracelet":
        setBraceletSizeType(value);
        break;
      case "Earings":
        setEarringsSizeType(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center font-serif">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors duration-200"
          onClick={handleCloseAndRefresh}
          title="Close and Refresh"
        >
          
        </button>
        <h1 className="text-3xl text-[#bf9b30] font-bold mb-6 text-center">
          Create Your Custom Jewellery
        </h1>
        {/* Jewelry Details (inside card, above the button) */}
        <div className="flex flex-col items-center mb-6">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}
          <h2 className="text-xl font-semibold mb-2">Selected {category}</h2>
          <button
            className="w-80 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
            onClick={() => {
              window.sessionStorage.setItem("returnToGemModal", "1");
              navigate("/gem-collection");
            }}
          >
            Customize Gem for Jeweller
          </button>
        </div>
        {/* Jewelry Customization Section */}
        <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
          <h3 className="text-lg text-[#bf9b30] text-center font-bold mb-6">
            {category} Customization
          </h3>
          {/* Style Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {category} Style
            </label>
            {["Rings", "Necklace", "Bracelet", "Earings"].includes(category) ? (
              <>
                <select
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                  value={getCurrentStyleValue()}
                  onChange={(e) => setStyleValue(e.target.value)}
                >
                  <option value="">Select {category} Style</option>
                  {getStyleOptions().map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
                {/* Add custom style input for all categories */}
                <div className="mt-2">
                  <label className="block text-sm font-medium mb-2">
                    Or enter custom style:
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    placeholder={`Enter custom ${category.toLowerCase()} style`}
                  />
                </div>
              </>
            ) : (
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                placeholder={`Enter ${category.toLowerCase()} style`}
              />
            )}
          </div>

          {/* Size Selection - Show for rings, necklaces, bracelets, and earrings */}
          {["Rings", "Necklace", "Bracelet", "Earings"].includes(category) && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {category} Size
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
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

          {/* Metal Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Metal Type</label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bf9b30] focus:border-transparent"
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
                setGoldType(""); // Reset gold type when material changes
                setPurity("18K"); // Reset purity when material changes
              }}
            >
              <option value="">Select Metal Type</option>
              {materialOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Gold Type - Only show when Gold is selected */}
          {material === "Gold" && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <label className="block text-sm font-medium mb-2 text-yellow-800">
                Gold Type{" "}
                <span className="text-xs text-yellow-600">
                  (Required for Gold)
                </span>
              </label>
              <select
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                value={goldType}
                onChange={(e) => setGoldType(e.target.value)}
              >
                <option value="">Select Gold Type</option>
                {goldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Purity - Only show when Gold is selected */}
          {material === "Gold" && goldType && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <label className="block text-sm font-medium mb-2 text-yellow-800">
                Purity{" "}
                <span className="text-xs text-yellow-600">
                  (Required for Gold)
                </span>
              </label>
              <select
                className="w-full border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
              >
                <option value="">Select Purity</option>
                {purityOptions.map((purityOpt) => (
                  <option key={purityOpt} value={purityOpt}>
                    {purityOpt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Summary of Selected Options */}
          {(getCurrentStyleValue() ||
            customStyle ||
            getCurrentSizeValue() ||
            material) && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-3">
                Selected Options:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {(getCurrentStyleValue() || customStyle) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{category} Style:</span>
                    <span className="font-medium">
                      {getCurrentStyleValue() || customStyle}
                    </span>
                  </div>
                )}
                {getCurrentSizeValue() && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{category} Size:</span>
                    <span className="font-medium">
                      {getCurrentSizeValue()} ({getCurrentSizeType()})
                    </span>
                  </div>
                )}
                {material && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metal Type:</span>
                    <span className="font-medium">{material}</span>
                  </div>
                )}
                {material === "Gold" && goldType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gold Type:</span>
                    <span className="font-medium">{goldType}</span>
                  </div>
                )}
                {material === "Gold" && goldType && purity && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purity:</span>
                    <span className="font-medium">{purity}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Gem Details */}
        {selectedGem && (
          <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-center mb-3">
              <h4 className="font-semibold text-[#bf9b30] text-center">
                Selected Gem
              </h4>
              <div className="ml-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center mb-3">
              {getGemImageUrl(selectedGem) && (
                <img
                  src={getGemImageUrl(selectedGem)}
                  alt={selectedGem.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.svg";
                  }}
                />
              )}
            </div>
            <div className="text-center space-y-1">
              <div className="font-semibold text-lg text-gray-800">
                {selectedGem.name}
              </div>
              <div className="text-sm text-gray-600">
                Color: {selectedGem.color}
              </div>
              <div className="text-sm text-gray-600">
                Carat:{" "}
                {selectedGem.carats || selectedGem.specs?.caratWeight || "N/A"}
              </div>
              <div className="text-sm text-gray-600">
                Origin: {selectedGem.origin}
              </div>
            </div>
          </div>
        )}
        {/* Preview Section: show jewelry and gem visually together */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#bf9b30] text-center mb-2">
            Preview Your Design
          </h3>
          <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 relative overflow-hidden">
            {image && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="text-xs text-gray-500 mb-1 text-center">
                  Jewelry
                </div>
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 object-contain rounded-lg shadow-lg border-2 border-white"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
            {selectedGem && getGemImageUrl(selectedGem) && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="text-xs text-gray-500 mb-1 text-center">
                  Selected Gem
                </div>
                <img
                  src={getGemImageUrl(selectedGem)}
                  alt={selectedGem.name}
                  className="w-20 h-20 object-contain rounded-full shadow-lg border-2 border-blue-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
            {!image && !selectedGem && (
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="text-sm">
                  Select a gem to see your custom design preview
                </span>
              </div>
            )}
            {image && selectedGem && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-xs text-gray-500 mb-1 text-center">
                  Combined Design
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* WhatsApp Integration */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-center mt-4">
            <button
              className="w-60 md:w-60 h-8 border border-green-600 text-green-600 text-sm text-black bg-green-50 hover:bg-green-100 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200 transform active:scale-105"
              onClick={() => handleRequestViaWhatsApp()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Contact Via WhatsApp
            </button>
          </div>

          {/* Request via Email Button */}
          <div className="flex justify-center mt-4">
            <button
              className="w-60 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Request via Email
            </button>
          </div>
        </div>
        {/* Custom Design Upload Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-bold text-black">
            Can't find your dream jewellery design output? Try with image, we
            can customize your jewellery similar to your image.
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {uploadedImage && (
            <div className="mb-4 flex flex-col items-center">
              <img
                src={uploadedImage}
                alt="Uploaded Design"
                className="w-40 h-40 object-contain rounded shadow"
              />
              <span className="text-xs text-gray-500 mt-2">
                (This image will be sent to WhatsApp)
              </span>
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              className="w-60 md:w-60 h-8 border border-green-600 text-green-600 text-sm text-black bg-green-50 hover:bg-green-100 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200 transform active:scale-105"
              onClick={() => handleRequestViaWhatsApp(true)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Contact Via WhatsApp
            </button>
          </div>

          {/* Request via Email Button (after WhatsApp custom design) */}
          <div className="flex justify-center mt-4">
            <button
              className="w-60 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Request via Email
            </button>
          </div>
        </div>
      </div>
      {/* Gem Selection Modal */}
      {showGemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowGemModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Select a Gem for Jewel</h3>
            <div className="flex justify-end mb-4">
              <button
                className="bg-[#bf9b30] hover:bg-[#a88928] text-white font-semibold rounded px-4 py-2"
                onClick={() => {
                  window.sessionStorage.setItem("returnToGemModal", "1");
                  navigate("/gem-collection");
                }}
              >
                Navigate to Gem Collection
              </button>
            </div>
            {/* Gem Collection Filter Section */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                className="border rounded px-3 py-2"
                placeholder="Search by name, color, origin..."
                value={gemSearch}
                onChange={(e) => setGemSearch(e.target.value)}
              />
              <select
                className="border rounded px-3 py-2"
                value={gemType}
                onChange={(e) => setGemType(e.target.value)}
              >
                <option value="">All Types</option>
                {uniqueGemTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="border rounded px-3 py-2"
                value={gemColor}
                onChange={(e) => setGemColor(e.target.value)}
              >
                <option value="">All Colors</option>
                {uniqueGemColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              <select
                className="border rounded px-3 py-2"
                value={gemOrigin}
                onChange={(e) => setGemOrigin(e.target.value)}
              >
                <option value="">All Origins</option>
                {uniqueGemOrigins.map((origin) => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </div>
            {/* Filtered Gems Output */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto mb-4">
              {filteredGems.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No gems found.
                </div>
              )}
              {filteredGems.map((gem) => (
                <div
                  key={gem.id}
                  className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer transition-all duration-200 ${
                    selectedGem && selectedGem.id === gem.id
                      ? "border-blue-500 ring-2 ring-blue-300 bg-blue-50 scale-105"
                      : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedGem(gem)}
                >
                  <div className="relative">
                    <img
                      src={getGemImageUrl(gem)}
                      alt={gem.name}
                      className="w-16 h-16 object-cover rounded mb-2"
                      onError={(e) => {
                        e.target.src = "/images/placeholder.svg";
                      }}
                    />
                    {selectedGem && selectedGem.id === gem.id && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="font-semibold text-sm mb-1 text-center">
                    {gem.name}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{gem.color}</div>
                  <div className="text-xs text-gray-600">{gem.origin}</div>
                </div>
              ))}
            </div>
            <button
              className="mt-2 w-full bg-[#bf9b30] hover:bg-[#a88928] text-white rounded px-4 py-2 disabled:opacity-50"
              disabled={!selectedGem}
              onClick={() => {
                // Store the selected gem for the custom jewellery page
                window.sessionStorage.setItem(
                  "selectedGemForCustom",
                  JSON.stringify(selectedGem)
                );
                // Navigate to the custom jewellery page
                navigate("/custom-jewellery", {
                  state: {
                    selectedGem: selectedGem,
                    fromGemSelection: true,
                  },
                });
              }}
            >
              Continue jewelry customize with this gem
            </button>
          </div>
        </div>
      )}
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              onClick={() => setShowEmailModal(false)}
            >
              &#10005;
            </button>
            <h3 className="text-md font-bold mb-3 text-center text-black">Request via Email</h3>
            <input
              name="fullName"
              value={emailForm.fullName}
              onChange={handleEmailInput}
              placeholder="Full Name"
              className="w-full text-xs mb-2 p-2 border rounded"
            />
            <input
              name="address"
              value={emailForm.address}
              onChange={handleEmailInput}
              placeholder="Shipping Address"
              className="w-full text-xs mb-2 p-2 border rounded"
            />
            <input
              name="mobile"
              value={emailForm.mobile}
              onChange={handleEmailInput}
              placeholder="Mobile Number"
              className="w-full text-xs mb-2 p-2 border rounded"
            />
            <textarea
              name="details"
              value={emailForm.details}
              onChange={handleEmailInput}
              placeholder="Other Jewelry Details"
              className="w-full text-xs mb-2 p-2 border rounded"
              rows={3}
            />
        <div className="text-xs text-gray-500 mb-2">All gem details will be included automatically in the email.</div>
          <div className="flex justify-center mt-4">
            <button
              className="w-40 bg-[#bf9b30] text-white text-sm py-1 px-1 rounded-full transition-colors duration-300"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
            {emailSent && (
              <div className="text-black-600 mt-2 text-xs">
                Email client opened. Please send the email to complete your
                request.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
