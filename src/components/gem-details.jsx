import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useParams, useLocation } from "react-router-dom"
import Customize from "./customize"
import { useCart } from "./cart-context"
import { fetchGems, getImageUrl } from "./GemCollection/gems-data"

export default function GemDetails() {
  const params = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  
  // ALL HOOKS MUST BE AT THE TOP - BEFORE ANY CONDITIONAL RETURNS
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [gemData, setGemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    fullName: '',
    address: '',
    mobile: '',
    details: '',
  });
  const [emailSent, setEmailSent] = useState(false);

  // Load gem data
  useEffect(() => {
    const loadGemData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, try to use gem from navigation state
        if (location.state?.gem) {
          setGemData(location.state.gem);
          setLoading(false);
          return;
        }

        // If no gem in state, fetch from API and find by ID
        const gems = await fetchGems();
        const foundGem = gems.find(g => (g.id || g._id) === params.id);
        
        if (foundGem) {
          setGemData(foundGem);
        } else {
          setError('Gem not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGemData();
  }, [params.id, location.state]);

  // Helper function to get proper image URL
  const getGemImageUrl = (imagePath) => {
    return getImageUrl(imagePath);
  };

  // Helper function to get gem images array
  const getGemImages = (gem) => {
    if (!gem) return ["/placeholder.svg"];
    
    let images = [];
    
    if (gem.images) {
      if (typeof gem.images === 'string') {
        images = [gem.images];
      } else if (gem.images.thumbnails && Array.isArray(gem.images.thumbnails)) {
        images = gem.images.thumbnails;
      } else if (gem.images.main) {
        images = [gem.images.main];
      } else if (Array.isArray(gem.images)) {
        images = gem.images;
      }
    } else if (gem.imageUrl) {
      images = [gem.imageUrl];
    }
    
    return images.length > 0 ? images.map(img => getGemImageUrl(img)) : ["/placeholder.svg"];
  };

  // Helper function to get gem specs
  const getGemSpecs = (gem) => {
    if (!gem) return {};
    
    return {
      caratWeight: gem.caratWeight || gem.specs?.caratWeight || '0ct',
      clarity: gem.clarity || gem.specs?.clarity || 'N/A',
      color: gem.color || gem.specs?.color || 'N/A',
      origin: gem.origin || gem.specs?.origin || 'N/A',
      cut: gem.cut || gem.specs?.cut || 'N/A',
      treatment: gem.treatment || gem.specs?.treatment || 'N/A'
    };
  };

  // Event handlers
  const handleCustomizeNow = () => {
    setShowCustomizePopup(true);
  };

  const handleCloseCustomize = () => {
    setShowCustomizePopup(false);
  };

  const handleAddToCart = () => {
    if (gemData) {
      const images = getGemImages(gemData);
      addToCart({
        id: gemData.id || gemData._id,
        name: gemData.name,
        image: images[currentImageIdx],
        price: gemData.price || 0,
        type: "gem",
      });
    }
  };

  const handlePrevImage = () => {
    const images = getGemImages(gemData);
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    const images = getGemImages(gemData);
    setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectImage = (idx) => {
    setCurrentImageIdx(idx);
  };

  const handleEmailInput = (e) => {
    setEmailForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSendEmail = async () => {
    if (gemData) {
      const specs = getGemSpecs(gemData);
      const body = `Gem Inquiry\n\nFull Name: ${emailForm.fullName}\nShipping Address: ${emailForm.address}\nMobile Number: ${emailForm.mobile}\nName: ${gemData.name}\nPrice: Rs. ${(gemData.price || 0).toLocaleString()}\nCarat Weight: ${specs.caratWeight}\nColor: ${specs.color}\nOrigin: ${specs.origin}\nCut: ${specs.cut}\nClarity: ${specs.clarity}\nTreatment: ${specs.treatment}\nOther Details: ${emailForm.details}`;
      window.location.href = `mailto:gangulr30@gmail.com?subject=Gem Inquiry&body=${encodeURIComponent(body)}`;
      setEmailSent(true);
    }
  };

  // NOW CONDITIONAL RETURNS CAN HAPPEN AFTER ALL HOOKS
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading gem details...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600 mb-4">Error loading gem</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => window.history.back()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If no gem data, show not found
  if (!gemData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600 mb-4">Gem not found</div>
          <button 
            onClick={() => window.history.back()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Main component render
  const images = getGemImages(gemData);
  const specs = getGemSpecs(gemData);

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in this gem:\n\n` +
    `Name: ${gemData.name}\n` +
    `Price: Rs. ${(gemData.price || 0).toLocaleString()}\n` +
    `Carat Weight: ${specs.caratWeight}\n` +
    `Color: ${specs.color}\n` +
    `Origin: ${specs.origin}\n` +
    `Image: ${images[currentImageIdx]}\n` + // This will be a clickable link in WhatsApp
    `\nClick the link above to view the image.`
  );
  const whatsappUrl = `https://wa.me/94759627589?text=${whatsappMessage}`;

  return (
    <div className="font-sans antialiased text-gray-800 font-[Poppins]">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="relative">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg">
              <img
                src={images[currentImageIdx]}
                alt={gemData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
              {/* Carousel Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-6 w-6 text-gray-600" />
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 flex space-x-3 overflow-x-auto pb-2">
              {images.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                    index === currentImageIdx ? 'border-2 border-blue-500' : 'border border-gray-300 hover:border-blue-500'
                  }`}
                  onClick={() => handleSelectImage(index)}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#bf9b30]">{gemData.name}</h2>
            <p className="text-gray-700 leading-relaxed">{gemData.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">Carat Weight</span>
                <span className="text-blue-700 italic">{specs.caratWeight}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">Clarity</span>
                <span className="text-blue-700 italic">{specs.clarity}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">Color</span>
                <span className="text-blue-700 italic">{specs.color}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">Origin</span>
                <span className="text-blue-700 italic">{specs.origin}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">Cut</span>
                <span className="text-blue-700 italic">{specs.cut}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
                <span className="font-semibold text-gray-700">Treatment</span>
                <span className="text-blue-700 italic">{specs.treatment}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="flex-1 bg-[#bf9b30] text-white py-3 px-6 rounded-md font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <a
                className="flex-1 border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Contact Via WhatsApp
              </a>
              <button
                className="flex-1 bg-[#bf9b30]  text-white py-3 px-6 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 text-sm md:text-base"
                onClick={() => setShowEmailModal(true)}
              >
                Contact Via Email
              </button>
              {/* Customize Button */}
              <button
                className="flex-1 bg-white text-black py-3 px-6 rounded-md font-semibold border border-black focus:outline-black focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm md:text-base"

                onClick={handleCustomizeNow}
              >
                Customize
              </button>
            </div>

            {/* Email Modal */}
            {showEmailModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowEmailModal(false)}>&#10005;</button>
                  <h3 className="text-lg font-bold mb-4">Contact Via Email</h3>
                  <input name="fullName" value={emailForm.fullName} onChange={handleEmailInput} placeholder="Full Name" className="w-full mb-2 p-2 border rounded" />
                  <input name="address" value={emailForm.address} onChange={handleEmailInput} placeholder="Shipping Address" className="w-full mb-2 p-2 border rounded" />
                  <input name="mobile" value={emailForm.mobile} onChange={handleEmailInput} placeholder="Mobile Number" className="w-full mb-2 p-2 border rounded" />
                  <textarea name="details" value={emailForm.details} onChange={handleEmailInput} placeholder="Other Gem Details (optional)" className="w-full mb-2 p-2 border rounded" rows={3} />
                  <div className="text-xs text-gray-500 mb-2">All gem details will be included automatically in the email.</div>
                  <button className="w-full bg-[#bf9b30] hover:bg-[#a88928] text-white font-semibold rounded px-6 py-2 mt-2" onClick={handleSendEmail}>Send Email</button>
                  {emailSent && <div className="text-green-600 mt-2">Email client opened. Please send the email to complete your request.</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Customize Popup */}
      {showCustomizePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={handleCloseCustomize}
            >
              ×
            </button>
            <Customize selectedGem={gemData} onClose={handleCloseCustomize} />
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="fixed left-6 bottom-6 z-20">
        <a
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
