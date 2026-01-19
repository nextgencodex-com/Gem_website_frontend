import { X, ChevronDown, Upload } from "lucide-react";
import { useState, useRef, useEffect} from "react";
import { useCart } from "./cart-context";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "./GemCollection/gems-data";

// Sample popular designs for each jewelry type
const popularDesigns = {
  Ring: [
    { id: 1, name: "Classic Solitaire", image: "/images/p.r.1.jpg" },
    { id: 2, name: "Halo Diamond", image: "/images/p.jpg" },
    { id: 3, name: "Vintage Inspired", image: "/images/p.r.2.jpg" },
  ],
  Necklace: [
    { id: 4, name: "Pendant Necklace", image: "/images/n.4.jpg" },
    { id: 5, name: "Diamond Choker", image: "/images/n.2.jpg" },
    { id: 6, name: "Pear Drop", image: "/images/n.3.jpg" },
  ],
  Earrings: [
    { id: 7, name: "Diamond Studs", image: "/images/r.1.jpg" },
    { id: 8, name: "Hoop Earrings", image: "/images/r.2.jpg" },
    { id: 9, name: "Drop Earrings", image: "/images/r.3.jpg" },
  ],
  Bracelet: [
    { id: 10, name: "Tennis Bracelet", image: "/images/b1.jpg" },
    { id: 11, name: "Bangle Bracelet", image: "/images/b2.jpg" },
    { id: 12, name: "Charm Bracelet", image: "/images/b3.jpg" },
  ],
};

export default function Customize({
  onClose,
  selectedGem: initialGem,
  initialJewelleryType,
  onJewelleryTypeChange,
}) {
  useCart();
  const navigate = useNavigate();
  const [selectedGem, setSelectedGem] = useState(initialGem || null);
  const [jewelleryType, setJewelleryType] = useState(
    initialJewelleryType || "Ring"
  );

  useEffect(() => {
    const storedGem = window.sessionStorage.getItem("selectedGemForCustom");
    if (storedGem) {
      setSelectedGem(JSON.parse(storedGem));
    }
  }, []);
  
  // Updated ring customization state
  const [ringStyle, setRingStyle] = useState("Solitaire");
  const [ringSizeSystem, setRingSizeSystem] = useState("US");
  const [ringSize, setRingSize] = useState("6");
  const [metalType, setMetalType] = useState("Silver");
  const [goldType, setGoldType] = useState("Yellow Gold");
  const [goldPurity, setGoldPurity] = useState("18K");
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const fileInputRef = useRef(null);

  // Add state for each customization
  const [necklaceStyle, setNecklaceStyle] = useState("Pendant");
  const [necklaceLength, setNecklaceLength] = useState('16" (Choker)');
  const [earringsType, setEarringsType] = useState("Stud");
  const [earringsBacking, setEarringsBacking] = useState("Push Back");
  const [braceletStyle, setBraceletStyle] = useState("Tennis");
  const [braceletLength, setBraceletLength] = useState('6"');

  // Ring size options based on system
  const ringSizeOptions = {
    US: ["3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"],
    UK: ["F", "F.5", "G", "G.5", "H", "H.5", "I", "I.5", "J", "J.5", "K", "K.5", "L", "L.5", "M", "M.5", "N", "N.5", "O", "O.5", "P", "P.5", "Q", "Q.5", "R", "R.5", "S", "S.5", "T", "T.5", "U", "U.5", "V", "V.5", "W", "W.5", "X", "X.5", "Y", "Y.5", "Z", "Z.5", "Z+1", "Z+1.5", "Z+2", "Z+2.5", "Z+3"]
  };

  // Handle ring size system change
  const handleRingSizeSystemChange = (system) => {
    setRingSizeSystem(system);
    // Reset to first option of new system
    setRingSize(ringSizeOptions[system][0]);
  };

  // Handle metal type change
  const handleMetalTypeChange = (type) => {
    setMetalType(type);
    if (type !== "Gold") {
      setGoldType("Yellow Gold");
      setGoldPurity("18K");
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setSelectedDesign(null); // Clear selected design when uploading new image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle design selection
  const handleDesignSelect = (design) => {
    setSelectedDesign(design);
    setUploadedImage(null); // Clear uploaded image when selecting a design
  };

  // Notify parent when jewellery type changes
  const handleJewelleryTypeSelect = (type) => {
    setJewelleryType(type);
    setSelectedDesign(null);
    setUploadedImage(null);
    if (onJewelleryTypeChange) onJewelleryTypeChange(type);
  };

  // Generate combined preview image URL
  const getCombinedPreview = () => {
    if (selectedDesign) {
      return selectedDesign.image;
    }
    if (uploadedImage) {
      return uploadedImage;
    }
    if (jewelleryType) {
    return `/images/${
      jewelleryType === "Ring"
        ? "ring1.jpg"
        : jewelleryType === "Necklace"
        ? "neck1.jpg"
        : jewelleryType === "Earrings"
        ? "ear1.jpg"
        : "be1.jpg"
    }`;
  }
    // Fallback to gem image if no design selected
    return (
      selectedGem?.images?.main || selectedGem?.imageUrl || "/images/hero.jpg"
    );
  };

  // Save Design handler
  const handleSaveDesign = async () => {
    const orderData = {
      fullName: emailForm.fullName,
      address: emailForm.address,
      mobile: emailForm.mobile,
      details: emailForm.details,
      jewelleryType,
      ringStyle,
      ringSize,
      ringSizeSystem,
      metalType,
      goldType: metalType === "Gold" ? goldType : null,
      goldPurity: metalType === "Gold" ? goldPurity : null,
      selectedDesign: selectedDesign ? selectedDesign.name : null,
      uploadedImage,
      gem: selectedGem
        ? {
            id: selectedGem.id,
            name: selectedGem.name,
            specs: selectedGem.specs,
            carats: selectedGem.carats,
            color: selectedGem.color,
            clarity: selectedGem.clarity,
            origin: selectedGem.origin,
            treatment: selectedGem.treatment,
          }
        : null,
      status: "save",
    };

    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        alert("Design saved successfully!");
        if (onClose) onClose();
      } else {
        alert("Failed to save design.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error saving design.");
    }
  };

  // WhatsApp Request Quote handler
  const handleRequestQuote = async () => {
    const orderData = {
      fullName: emailForm.fullName,
      address: emailForm.address,
      mobile: emailForm.mobile,
      details: emailForm.details,
      jewelleryType,
      ringStyle,
      ringSize,
      ringSizeSystem,
      metalType,
      goldType: metalType === "Gold" ? goldType : null,
      goldPurity: metalType === "Gold" ? goldPurity : null,
      selectedDesign: selectedDesign ? selectedDesign.name : null,
      uploadedImage,
      gem: selectedGem
        ? {
            id: selectedGem.id,
            name: selectedGem.name,
            specs: selectedGem.specs,
            carats: selectedGem.carats,
            color: selectedGem.color,
            clarity: selectedGem.clarity,
            origin: selectedGem.origin,
            treatment: selectedGem.treatment,
          }
        : null,
      status: "quote",
    };

    // Send to server as before
    try {
      await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Optionally handle server error
    }

    // Prepare WhatsApp message
    const message = `
*Jewellery Quote Request*
Name: ${orderData.fullName}
Address: ${orderData.address}
Mobile: ${orderData.mobile}
Type: ${orderData.jewelleryType}
${
  orderData.jewelleryType === "Ring"
    ? `Ring Style: ${orderData.ringStyle}\nRing Size: ${orderData.ringSize} (${ringSizeSystem})\nMetal: ${orderData.metalType}${orderData.metalType === "Gold" ? `\nGold Type: ${goldType}\nGold Purity: ${goldPurity}` : ""}`
    : ""
}
${
  orderData.jewelleryType === "Necklace"
    ? `Necklace Style: ${necklaceStyle}\nNecklace Length: ${necklaceLength}`
    : ""
}
${
  orderData.jewelleryType === "Earrings"
    ? `Earrings Type: ${earringsType}\nBacking: ${earringsBacking}`
    : ""
}
${
  orderData.jewelleryType === "Bracelet"
    ? `Bracelet Style: ${braceletStyle}\nBracelet Length: ${braceletLength}`
    : ""
}
Design: ${orderData.selectedDesign || (uploadedImage ? "Custom Upload" : "")}
Gem: ${orderData.gem ? orderData.gem.name : ""}
Details: ${orderData.details}
    `.trim();

    // Replace with your WhatsApp number (country code, no + or spaces)
    const phone = "94759627589";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    fullName: "",
    address: "",
    mobile: "",
    details: "",
  });
  const [emailSent, setEmailSent] = useState(false);

  // Handle close - either call onClose prop or navigate back
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleEmailInput = (e) =>
    setEmailForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSendEmail = async () => {
    const orderData = {
      fullName: emailForm.fullName,
      address: emailForm.address,
      mobile: emailForm.mobile,
      details: emailForm.details,
      jewelleryType,
      ringStyle,
      ringSize,
      ringSizeSystem,
      metalType,
      goldType: metalType === "Gold" ? goldType : null,
      goldPurity: metalType === "Gold" ? goldPurity : null,
      selectedDesign: selectedDesign ? selectedDesign.name : null,
      uploadedImage,
      gem: selectedGem
        ? {
            id: selectedGem.id,
            name: selectedGem.name,
            specs: selectedGem.specs,
            carats: selectedGem.carats,
            color: selectedGem.color,
            clarity: selectedGem.clarity,
            origin: selectedGem.origin,
            treatment: selectedGem.treatment,
          }
        : null,
      status: "email",
    };

    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        setEmailSent(true);
        alert("Order request sent successfully!");
        setShowEmailModal(false);
      } else {
        alert("Failed to send order request.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error sending order request.");
    }

    // Prepare email content
    const subject = encodeURIComponent("Jewellery Order Request");
    const body = encodeURIComponent(
      `Name: ${orderData.fullName}
Address: ${orderData.address}
Mobile: ${orderData.mobile}
Type: ${orderData.jewelleryType}
${
  orderData.jewelleryType === "Ring"
    ? `Ring Style: ${orderData.ringStyle}\nRing Size: ${orderData.ringSize} (${ringSizeSystem})\nMetal: ${orderData.metalType}${orderData.metalType === "Gold" ? `\nGold Type: ${goldType}\nGold Purity: ${goldPurity}` : ""}`
    : ""
}
${
  orderData.jewelleryType === "Necklace"
    ? `Necklace Style: ${necklaceStyle}\nNecklace Length: ${necklaceLength}`
    : ""
}
${
  orderData.jewelleryType === "Earrings"
    ? `Earrings Type: ${earringsType}\nBacking: ${earringsBacking}`
    : ""
}
${
  orderData.jewelleryType === "Bracelet"
    ? `Bracelet Style: ${braceletStyle}\nBracelet Length: ${braceletLength}`
    : ""
}
Design: ${orderData.selectedDesign || (uploadedImage ? "Custom Upload" : "")}
Gem: ${orderData.gem ? orderData.gem.name : ""}
Details: ${orderData.details}`
    );
    // Replace with your business email
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
  };
  console.log(getImageUrl(selectedGem.images?.main || selectedGem.imageUrl));

  return (
    <div className="relative bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 max-w-6xl mx-auto my-8 md:my-12 font-[Poppins]">
      {/* Close Button - only show when accessed directly via route */}
      {!onClose && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          ×
        </button>
      )}

      {/* Main Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#bf9b30]">
        Design Your Jewellery using selected gem
      </h1>

      {/* 1. Selected Gem Display */}
      {selectedGem ? (
        <div className="mb-8 flex flex-col items-center">
          <img
            src={selectedGem.images?.main || selectedGem.imageUrl}
            alt={selectedGem.name}
            className="w-24 h-24 object-cover rounded mb-2"
          />
          <span className="text-lg font-semibold text-gray-800">
            {selectedGem.name}
          </span>
        </div>
      ) : (
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Gem Selected</span>
          </div>
          <button
            onClick={() => navigate("/gem-collection")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Select a Gem from Collection
          </button>
        </div>
      )}

      {/* 2. Jewellery Type Selection */}
      <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
        Select Jewellery Type
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        {["Ring", "Necklace", "Earrings", "Bracelet"].map((type) => (
          <div
            key={type}
            className={`border-2 rounded-xl p-4 flex flex-col items-center text-center shadow-md cursor-pointer ${
              jewelleryType === type ? "border-blue-500" : "border-gray-200"
            }`}
            onClick={() => handleJewelleryTypeSelect(type)}
          >
            <img
              src={`/images/${
                type === "Ring"
                  ? "ring1.jpg"
                  : type === "Necklace"
                  ? "neck1.jpg"
                  : type === "Earrings"
                  ? "ear1.jpg"
                 
                  : "be1.jpg"

              }`}
              alt={type}
              className="w-24 h-24 md:w-36 md:h-32 object-contain mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">{type}</h3>
            <p className="text-sm text-gray-600">
              {type === "Ring"
                ? "Engagement, Wedding, or Fashion Ring"
                : type === "Necklace"
                ? "Pendant or Statement Necklace"
                : type === "Earrings"
                ? "Stud, Drop, or Hoop Earrings"
                : "Tennis or Statement Bracelet"}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Popular Designs for Selected Jewellery */}
      <div className="mb-8">
        <label className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
          Popular {jewelleryType} Designs
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {popularDesigns[jewelleryType].map((design) => (
            <div
              key={design.id}
              className={`border-2 rounded-3xl p-3 cursor-pointer ${
                selectedDesign?.id === design.id
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
              onClick={() => handleDesignSelect(design)}
            >
              <img
                src={design.image}
                alt={design.name}
                className="w-full h-32 object-contain mb-2 rounded"
              />
              <p className="text-sm font-medium text-center">{design.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Select or Upload Your Design Section (moved up) */}
      <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 md:mb-10 shadow-inner">
        <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
          Upload Your Own Design
        </h1>
        {/* Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2"></label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            {uploadedImage ? (
              <div className="flex flex-col items-center">
                <img
                  src={uploadedImage}
                  alt="Uploaded design"
                  className="w-32 h-32 object-contain mb-2 rounded"
                />
                <span className="text-sm text-gray-600">
                  Click to change image
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload your design
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports JPG, PNG (Max 5MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Customization for Selected Jewellery Category */}
      {jewelleryType === "Ring" && (
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 md:mb-10 shadow-inner">
          <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
            Ring Customization
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="ring-style"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ring Style
              </label>
              <div className="relative">
                              <select
                id="ring-style"
                value={ringStyle}
                onChange={(e) => setRingStyle(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
              >
                <option>Solitaire</option>
                <option>Halo</option>
                <option>Vintage</option>
                <option>Three-stone</option>
                <option>Bezel</option>
                <option>Pave</option>
                <option>Channel</option>
                <option>Split Shank</option>
                <option>Tension</option>
                <option>Cathedral</option>
              </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="ring-size-system"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ring Size System
              </label>
              <div className="relative">
                <select
                  id="ring-size-system"
                  value={ringSizeSystem}
                  onChange={(e) => handleRingSizeSystemChange(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                >
                  <option>US</option>
                  <option>UK</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="ring-size"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ring Size
              </label>
              <div className="relative">
                <select
                  id="ring-size"
                  value={ringSize}
                  onChange={(e) => setRingSize(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                >
                  {ringSizeOptions[ringSizeSystem].map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="metal-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Metal Type
              </label>
              <div className="relative">
                                  <select
                    id="metal-type"
                    value={metalType}
                    onChange={(e) => handleMetalTypeChange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  >
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Titanium</option>
                    <option>Platinum</option>
                  </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            {metalType === "Gold" && (
              <div>
                <label
                  htmlFor="gold-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gold Type
                </label>
                <div className="relative">
                                     <select
                     id="gold-type"
                     value={goldType}
                     onChange={(e) => setGoldType(e.target.value)}
                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                   >
                     <option>Yellow Gold</option>
                     <option>Rose Gold</option>
                     <option>Pink Gold</option>
                     <option>Green Gold</option>
                     <option>White Gold</option>
                   </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
            )}
            {metalType === "Gold" && (
              <div>
                <label
                  htmlFor="gold-purity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gold Purity
                </label>
                <div className="relative">
                                     <select
                     id="gold-purity"
                     value={goldPurity}
                     onChange={(e) => setGoldPurity(e.target.value)}
                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                   >
                     <option>14K</option>
                     <option>15K</option>
                     <option>18K</option>
                     <option>20K</option>
                     <option>22K</option>
                     <option>23K</option>
                     <option>24K</option>
                   </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {jewelleryType === "Necklace" && (
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 md:mb-10 shadow-inner">
          <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
            Necklace Customization
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="necklace-style"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Necklace Style
              </label>
              <div className="relative">
                <select
                  id="necklace-style"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  value={necklaceStyle}
                  onChange={(e) => setNecklaceStyle(e.target.value)}
                >
                  <option>Pendant</option>
                  <option>Chain</option>
                  <option>Choker</option>
                  <option>Statement</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="necklace-length"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Necklace Length
              </label>
              <div className="relative">
                <select
                  id="necklace-length"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  value={necklaceLength}
                  onChange={(e) => setNecklaceLength(e.target.value)}
                >
                  <option>16" (Choker)</option>
                  <option>18" (Princess)</option>
                  <option>20" (Matinee)</option>
                  <option>24" (Opera)</option>
                  <option>30" (Rope)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {jewelleryType === "Earrings" && (
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 md:mb-10 shadow-inner">
          <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
            Earrings Customization
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="earrings-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Earrings Type
              </label>
              <div className="relative">
                <select
                  id="earrings-type"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  value={earringsType}
                  onChange={(e) => setEarringsType(e.target.value)}
                >
                  <option>Stud</option>
                  <option>Drop</option>
                  <option>Hoop</option>
                  <option>Chandelier</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="earrings-backing"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Backing Type
              </label>
              <div className="relative">
                <select
                  id="earrings-backing"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  value={earringsBacking}
                  onChange={(e) => setEarringsBacking(e.target.value)}
                >
                  <option>Push Back</option>
                  <option>Screw Back</option>
                  <option>Lever Back</option>
                  <option>Latch Back</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {jewelleryType === "Bracelet" && (
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 md:mb-10 shadow-inner">
          <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
            Bracelet Customization
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="bracelet-style"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bracelet Style
              </label>
              <div className="relative">
                <select
                  id="bracelet-style"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  value={braceletStyle}
                  onChange={(e) => setBraceletStyle(e.target.value)}
                >
                  <option>Tennis</option>
                  <option>Bangle</option>
                  <option>Cuff</option>
                  <option>Charm</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="bracelet-length"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bracelet Length
              </label>
              <div className="relative">
                <select
                  id="bracelet-length"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white cursor-pointer"
                  value={braceletLength}
                  onChange={(e) => setBraceletLength(e.target.value)}
                >
                  <option>6"</option>
                  <option>6.5"</option>
                  <option>7"</option>
                  <option>7.5"</option>
                  <option>8"</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Preview and Design Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6">
            Preview Your {jewelleryType}
          </h2>
          <div className="relative bg-gray-100 rounded-xl p-8 flex justify-center items-center shadow-lg">
            {selectedGem ? (
              <div className="relative">
                <img
                  src={getCombinedPreview()}
                  alt={`Custom ${jewelleryType} Preview with ${selectedGem.name}`}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
                {/* This is where you would overlay the gem on the jewelry in a real implementation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {selectedGem && (
                    <img
                      src={selectedGem.images?.main || selectedGem.imageUrl}
                      alt={getImageUrl(selectedGem.name)}
                      className="w-16 h-16 object-contain rounded-full shadow-lg border-2 border-white"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">
                  Select a gem to see your custom {jewelleryType.toLowerCase()} design
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="block text-1xl md:text-2xl  text-center text-[#bf9b30] mb-2">
            Design Specifications
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Final price may vary based on customizations and current market
            rates
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4 border-b pb-2">
              Design Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Jewelry Type:</span>
                <span className="font-medium">{jewelleryType}</span>
              </div>
              {selectedDesign && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Design:</span>
                  <span className="font-medium">{selectedDesign.name}</span>
                </div>
              )}
              {uploadedImage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Design:</span>
                  <span className="font-medium">Custom Upload</span>
                </div>
              )}
              {jewelleryType === "Ring" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ring Style:</span>
                    <span className="font-medium">{ringStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ring Size:</span>
                    <span className="font-medium">{ringSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metal Type:</span>
                    <span className="font-medium">{metalType}</span>
                  </div>
                  {metalType === "Gold" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gold Type:</span>
                        <span className="font-medium">{goldType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gold Purity:</span>
                        <span className="font-medium">{goldPurity}</span>
                      </div>
                    </>
                  )}
                </>
              )}
              {jewelleryType === "Necklace" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Necklace Style:</span>
                    <span className="font-medium">{necklaceStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Necklace Length:</span>
                    <span className="font-medium">{necklaceLength}</span>
                  </div>
                </>
              )}
              {jewelleryType === "Earrings" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Earrings Type:</span>
                    <span className="font-medium">{earringsType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backing Type:</span>
                    <span className="font-medium">{earringsBacking}</span>
                  </div>
                </>
              )}
              {jewelleryType === "Bracelet" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bracelet Style:</span>
                    <span className="font-medium">{braceletStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bracelet Length:</span>
                    <span className="font-medium">{braceletLength}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {selectedGem && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">
                Gem Specifications
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gemstone:</span>
                  <span className="font-medium">{selectedGem.name}</span>
                </div>
                {(selectedGem.specs?.caratWeight || selectedGem.carats) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carat Weight:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.caratWeight || selectedGem.carats}
                    </span>
                  </div>
                )}
                {(selectedGem.specs?.color || selectedGem.color) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.color || selectedGem.color}
                    </span>
                  </div>
                )}
                {(selectedGem.specs?.clarity || selectedGem.clarity) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clarity:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.clarity || selectedGem.clarity}
                    </span>
                  </div>
                )}
                {(selectedGem.specs?.cut || selectedGem.cut) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cut:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.cut || selectedGem.cut}
                    </span>
                  </div>
                )}
                {(selectedGem.specs?.shape || selectedGem.shape) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shape:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.shape || selectedGem.shape}
                    </span>
                  </div>
                )}
                {(selectedGem.specs?.origin || selectedGem.origin) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.origin || selectedGem.origin}
                    </span>
                  </div>
                )}
                {(selectedGem.specs?.treatment || selectedGem.treatment) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Treatment:</span>
                    <span className="font-medium">
                      {selectedGem.specs?.treatment || selectedGem.treatment}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="w-full flex flex-col items-center justify-center sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              className="w-60 md:w-40 h-10 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200"
              style={{ fontSize: '13px' }}
              onClick={handleSaveDesign}
              disabled={!selectedGem}
            >
              Save Design
            </button>
            <button
              className="w-60 md:w-40 h-10 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200"
              style={{ fontSize: '13px' }}
              onClick={handleRequestQuote}
            >
              Request Quote
            </button>
            {/* Request via Email Button */}
            <button
              className="w-60 md:w-40 h-10 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200"
              style={{ fontSize: '13px' }}
              onClick={() => setShowEmailModal(true)}
            >
              Request via Email
            </button>
          </div>
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
                  placeholder="Other Jewellery Details"
                  className="w-full text-xs mb-2 p-2 border rounded"
                  rows={3}
                />
            <div className="text-xs text-gray-500 mb-2">All gem details will be included automatically in the email.</div>
              <dev className="flex flex-col items-center justify-center mt-4">
                <button
                  className="w-40 bg-[#bf9b30] text-white text-sm py-1 px-1 rounded-full transition-colors duration-300"
                  onClick={handleSendEmail}
                >
                  Send Email
                </button>
              </dev>
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
      </div>
    </div>
  );
}
