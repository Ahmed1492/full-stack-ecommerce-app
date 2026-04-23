"use client";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";

export default function CustomizeProduct({ productId, variants, productOptions, stockNumber }) {
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedVariant, setSelectedVariant] = useState();

  const isVariantInStock = (choices) =>
    variants.some(
      (v) =>
        v.stock?.inStock &&
        v.stock?.quantity > 0 &&
        v.choices &&
        Object.entries(choices).every(([k, val]) => v.choices[k] === val)
    );

  useEffect(() => {
    const variant = variants.find(
      (v) =>
        v.choices &&
        Object.entries(selectedOption).every(([k, val]) => v.choices[k] === val)
    );
    setSelectedVariant(variant);
  }, [selectedOption, variants]);

  if (stockNumber < 1) {
    return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
        <span className="text-red-400 text-lg">⚠️</span>
        <p className="text-red-500 font-medium text-sm">Out of Stock</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700 text-sm">
              {option.name}
              {selectedOption[option.name] && (
                <span className="ml-2 font-normal text-gray-400">
                  — {selectedOption[option.name]}
                </span>
              )}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {option.choices.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOption,
                [option.name]: choice.description,
              });
              const selected = selectedOption[option.name] === choice.description;

              if (option.name === "Color") {
                return (
                  <button
                    key={choice.description}
                    onClick={() =>
                      !disabled &&
                      setSelectedOption((p) => ({ ...p, [option.name]: choice.description }))
                    }
                    title={choice.description}
                    className={`relative w-10 h-10 rounded-full border-2 transition flex-shrink-0 ${
                      selected ? "border-[#D02E64] scale-110 shadow-md" : "border-transparent hover:border-gray-300"
                    } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{ backgroundColor: choice.description }}
                    />
                    {disabled && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-0.5 h-8 bg-red-400 rotate-45 rounded-full absolute" />
                      </span>
                    )}
                  </button>
                );
              }

              return (
                <button
                  key={choice.description}
                  onClick={() =>
                    !disabled &&
                    setSelectedOption((p) => ({ ...p, [option.name]: choice.description }))
                  }
                  disabled={disabled}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                    selected
                      ? "border-[#D02E64] bg-[#D02E64] text-white"
                      : disabled
                      ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                      : "border-gray-200 text-gray-700 hover:border-[#D02E64] hover:text-[#D02E64]"
                  }`}
                >
                  {choice.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <AddProduct
        productId={productId}
        variantId={selectedVariant?._id || "00000000-0000-0000-0000-000000000000"}
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
}
