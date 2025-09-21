"use client"

import React, { useState, useEffect } from "react"
import { RefreshCw, Smartphone, Monitor, ArrowRightLeft } from "lucide-react"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("LKR")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("")

  const currencies = ["USD", "LKR", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "AED"]

  // Check screen size and update mobile view state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Fetch exchange rates
  const fetchRates = async () => {
    setLoading(true)
    setError("")
    
    try {
      // Using a free API (alternative to Fixer which requires API key)
      const res = await fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
      const data = await res.json()
      
      if (data.success) {
        const rate = data.rates[toCurrency]
        if (rate) {
          const converted = amount * rate
          setResult(converted)
          setLastUpdated(new Date().toLocaleTimeString())
        } else {
          setError("Conversion rate not available")
        }
      } else {
        setError("Failed to fetch exchange rates")
      }
    } catch (err) {
      console.error("API error:", err)
      setError("Error connecting to exchange service")
    }
    
    setLoading(false)
  }

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount")
      return
    }
    
    fetchRates()
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* View Toggle - Only show on larger screens */}
      <div className="hidden md:flex justify-end mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {isMobileView ? (
            <>
              <Smartphone size={14} />
              <span>Mobile View</span>
            </>
          ) : (
            <>
              <Monitor size={14} />
              <span>Desktop View</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4 flex items-center justify-center gap-2">
          <ArrowRightLeft size={24} className="text-blue-500" />
          Currency Converter
        </h2>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Currency Selection - Different layout for mobile */}
        {isMobileView ? (
          // Mobile layout - vertical
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap button for mobile */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                title="Swap currencies"
              >
                <RefreshCw size={18} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          // Desktop layout - horizontal
          <div className="flex items-end gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap button for desktop */}
            <button
              onClick={swapCurrencies}
              className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition mb-1"
              title="Swap currencies"
            >
              <RefreshCw size={18} />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw size={18} className="animate-spin" />
              <span>Converting...</span>
            </div>
          ) : (
            "Convert"
          )}
        </button>

        {/* Result Display */}
        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          {error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : result !== null ? (
            <div className="text-center">
              <p className="text-lg font-semibold">
                {amount} {fromCurrency} ={" "}
                <span className="text-green-600">
                  {Number(result).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} {toCurrency}
                </span>
              </p>
              {lastUpdated && (
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {lastUpdated}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              Enter an amount and click convert
            </p>
          )}
        </div>

        {/* Info Note */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            💡 Rates update in real-time. For jewelry purchases, final conversion may vary based on payment processor.
          </p>
        </div>
      </div>
    </div>
  )
}