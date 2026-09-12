"use client";

import React, { useState } from "react";

const billRanges = [
  { label: "Under $150/month", value: 150, savings: "2,000-3,500", system: "6.6kW" },
  { label: "$150 - $300/month", value: 250, savings: "3,500-5,500", system: "10kW" },
  { label: "$300 - $500/month", value: 400, savings: "5,500-9,000", system: "13.2kW" },
  { label: "Over $500/month", value: 600, savings: "9,000-15,000", system: "20kW+" },
];

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string>("");
  const [calculated, setCalculated] = useState(false);

  const selectedRange = billRanges.find((r) => r.value === monthlyBill);

  const handleCalculate = () => {
    if (monthlyBill && propertyType) {
      setCalculated(true);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#002244] to-[#272E7D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-orange-400 uppercase tracking-widest text-sm font-semibold mb-2">
            Free Tool
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Much Could You Save?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Enter your average monthly electricity bill to see your estimated
            solar savings.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {!calculated ? (
              <>
                {/* Property Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Property Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Home", "Business", "Farm"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-all text-sm ${
                          propertyType === type
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-200 text-gray-600 hover:border-orange-300"
                        }`}
                      >
                        {type === "Home" ? "🏠" : type === "Business" ? "🏢" : "🌾"}{" "}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bill Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Average Monthly Electricity Bill
                  </label>
                  <div className="space-y-3">
                    {billRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setMonthlyBill(range.value)}
                        className={`w-full text-left py-3 px-5 rounded-lg border-2 font-medium transition-all ${
                          monthlyBill === range.value
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-200 text-gray-600 hover:border-orange-300"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!monthlyBill || !propertyType}
                  className="w-full py-4 bg-[#FF660D] text-white font-bold text-lg rounded-xl
                    hover:bg-[#E5520A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Calculate My Savings →
                </button>
              </>
            ) : (
              /* Results */
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">☀️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Estimated Annual Savings
                </h3>
                <div className="text-5xl font-black text-[#FF660D] my-4">
                  ${selectedRange?.savings}
                </div>
                <p className="text-gray-600 mb-2">
                  Based on your bill, we recommend a{" "}
                  <strong>{selectedRange?.system}</strong> solar system for
                  your {propertyType.toLowerCase()}.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  * Estimates based on average Victoria solar irradiance and
                  electricity rates. Actual savings may vary.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/get-a-free-quote/"
                    className="flex-1 py-3 bg-[#FF660D] text-white font-bold rounded-xl
                      hover:bg-[#E5520A] transition-colors text-center"
                  >
                    Get My Free Quote
                  </a>
                  <button
                    onClick={() => {
                      setCalculated(false);
                      setMonthlyBill(null);
                      setPropertyType("");
                    }}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-600 font-semibold
                      rounded-xl hover:border-gray-400 transition-colors"
                  >
                    Recalculate
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Trust bar */}
          <div className="bg-gray-50 px-8 py-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span>✅ Free No-Obligation Quote</span>
            <span>✅ CEC Approved Installer</span>
            <span>✅ 1000+ Installations</span>
            <span>✅ Industry-Leading Warranties</span>
          </div>
        </div>
      </div>
    </section>
  );
}
