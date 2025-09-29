import React from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "./cart-context";

export default function CartModal({ open, onClose }) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    total,
    selectedCurrency,
    setSelectedCurrency,
    convertCurrency,
    getAllCurrencyTotals  } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close cart"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id + item.type}
                className="flex items-center gap-4 border-b pb-3 last:border-b-0"
              >
                <img
                  src={item.image || "/images/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.svg";
                  }}
                />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    Qty:
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.type,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      className="w-12 ml-1 border rounded px-1 py-0.5 text-center"
                    />
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {(() => {
                      const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                      if (typeof price === "number" && !isNaN(price)) {
                        return `${selectedCurrency === 'LKR' ? 'Rs. ' : ''}${convertCurrency(price, selectedCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedCurrency}`;
                      }
                      return item.price || 'Price not available';
                    })()}
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id, item.type)}
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 border-t pt-4">
          {/* Currency Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency:</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="LKR">LKR (Sri Lankan Rupees)</option>
              <option value="USD">USD (US Dollars)</option>
              <option value="AED">AED (UAE Dirham)</option>
              <option value="AUR">AUR (Australian Dollars)</option>
              <option value="YEN">YEN (Japanese Yen)</option>
              <option value="RMD">RMD (Chinese Yuan)</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-xl">
              {selectedCurrency === 'LKR' ? 'Rs. ' : ''}{total.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedCurrency}
            </span>
          </div>

          <div className="flex justify-center mt-8">
          <button
            className="w-60 md:w-60 h-10 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200"
            disabled={cartItems.length === 0}
            onClick={() => {
              // Get all currency totals
              const allTotals = getAllCurrencyTotals();
              
              // Build the structured message
              let message = "Hello, I would like to request the following custom jewellery:\n\n";
              
              // Add each item with details
              cartItems.forEach((item, index) => {
                const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                const itemPrice = typeof price === "number" && !isNaN(price) ? convertCurrency(price, selectedCurrency) : 0;
                const priceDisplay = selectedCurrency === 'LKR' ? `Rs. ${itemPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `${itemPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedCurrency}`;
                
                message += `${index + 1}. ${item.name}\n`;
                message += `   Qty: ${item.quantity}\n`;
                message += `   Price: ${priceDisplay}\n`;
                
                // Add optional details if available
                if (item.metal) message += `   Metal: ${item.metal}\n`;
                if (item.gem) message += `   Gem: ${item.gem}\n`;
                if (item.size) message += `   Size: ${item.size}\n`;
                
                message += "\n";
              });
              
              // Add total in selected currency
              const totalDisplay = selectedCurrency === 'LKR' ? `Rs. ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `${total.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedCurrency}`;
              message += `Total: ${totalDisplay}`;
              
              // Add all currency totals
              message += "\n\nTotal in other currencies:\n";
              Object.entries(allTotals).forEach(([currency, amount]) => {
                if (currency !== selectedCurrency) {
                  const display = currency === 'LKR' ? `Rs. ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`;
                  message += `${currency}: ${display}\n`;
                }
              });
              
              message += "\nPlease let me know the next steps. Thank you!";
              
              // Debug: Log the message to check for any issues
              console.log("WhatsApp message:", message);
              console.log("Message length:", message.length);
              
              const phoneNumber = "94759627589"; // Sri Lanka country code + phone number without leading 0
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              
              console.log("WhatsApp URL:", whatsappUrl);
              
              // Check if message is too long (WhatsApp limit is around 4096 characters)
              if (message.length > 4000) {
                alert("Message is too long for WhatsApp. Please reduce the number of items in your cart.");
                return;
              }
              
              try {
                window.open(whatsappUrl, "_blank");
              } catch (error) {
                console.error("Error opening WhatsApp:", error);
                // Fallback: copy message to clipboard and show instructions
                navigator.clipboard.writeText(message).then(() => {
                  alert("WhatsApp couldn't be opened. The message has been copied to your clipboard. Please paste it in WhatsApp manually.");
                }).catch(() => {
                  alert("WhatsApp couldn't be opened. Please copy the message manually and send it via WhatsApp.");
                });
              }
            }}
          >
            Request via WhatsApp
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="w-60 md:w-40 h-10 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-semibold flex items-center justify-center gap-1 transition-all duration-200"
            disabled={cartItems.length === 0}
            onClick={() => {
              // Get all currency totals
              const allTotals = getAllCurrencyTotals();
              
              // Build the structured message
              let message = "Hello, I would like to request the following custom jewellery:\n\n";
              
              // Add each item with details
              cartItems.forEach((item, index) => {
                const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                const itemPrice = typeof price === "number" && !isNaN(price) ? convertCurrency(price, selectedCurrency) : 0;
                const priceDisplay = selectedCurrency === 'LKR' ? `Rs. ${itemPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `${itemPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedCurrency}`;
                
                message += `${index + 1}. ${item.name}\n`;
                message += `   Qty: ${item.quantity}\n`;
                message += `   Price: ${priceDisplay}\n`;
                
                // Add optional details if available
                if (item.metal) message += `   Metal: ${item.metal}\n`;
                if (item.gem) message += `   Gem: ${item.gem}\n`;
                if (item.size) message += `   Size: ${item.size}\n`;
                
                message += "\n";
              });
              
              // Add total in selected currency
              const totalDisplay = selectedCurrency === 'LKR' ? `Rs. ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `${total.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedCurrency}`;
              message += `Total: ${totalDisplay}`;
              
              // Add all currency totals
              message += "\n\nTotal in other currencies:\n";
              Object.entries(allTotals).forEach(([currency, amount]) => {
                if (currency !== selectedCurrency) {
                  const display = currency === 'LKR' ? `Rs. ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`;
                  message += `${currency}: ${display}\n`;
                }
              });
              
              message += "\nPlease let me know the next steps. Thank you!";
              
              window.open(`mailto:contact@luxirisgems.com?subject=Custom Jewellery Request&body=${encodeURIComponent(message)}`);
            }}
          >
            Order Via Email
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
