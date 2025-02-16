"use client";

import { useState } from "react";

export default function CustomizeProduct({
  productId,
  variants,
  productOptions,
}) {
  // console.log(productOptions);
  const [selectedOption, setSelectedOption] = useState({});
  const handleOptionSelect = (optionType, choice, disable) => {
    if (!disable) {
      setSelectedOption((prev) => ({ ...prev, [optionType]: choice }));

      console.log("selectedOption ", selectedOption);
      console.log("choice ", choice);
    }
  };
  // console.log(variants);
  const isVariantsInStock = (choices) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant?.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* COLORS */}
      <div className="flex flex-col gap-5">
        {productOptions.map((option, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <h3 className="font-medium text-xl">Choose a {option.name} </h3>
            <div className="flex gap-2">
              {option?.choices.map((choice, index) => {
                const disable = !isVariantsInStock({
                  ...selectedOption,
                  [option.name]: choice.description,
                });
                const selected =
                  selectedOption[option.name] === choice.description;
                return option.name == "Color" ? (
                  <div
                    onClick={() =>
                      handleOptionSelect(
                        option.name,
                        choice.description,
                        disable
                      )
                    }
                    key={index}
                    className="flex mt-2 gap-2"
                  >
                    <div
                      className={` border ${
                        selected ? "ring-2 ring-blue-400 " : ""
                      }   flex justify-center cursor-pointer items-center rounded-full w-11 h-11 relative`}
                    >
                      <span
                        style={{
                          backgroundColor: choice.description,
                          cursor: disable ? "not-allowed" : "pointer",
                        }}
                        className=" w-9 h-9  rounded-full"
                      ></span>
                      {disable && (
                        <span className="w-1 h-14 absolute rounded-2xl bg-red-400  -rotate-45" />
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      handleOptionSelect(
                        option.name,
                        choice.description,
                        disable
                      )
                    }
                    key={index}
                    className="flex  items-center gap-3"
                  >
                    <button
                      className={` px-[10px] border w-24 text-center font-medium py-[8px] text-white rounded-xl`}
                      style={{
                        backgroundColor: selected
                          ? "#f35c7a"
                          : disable
                          ? "#FBCFE8"
                          : "white",
                        color: selected || disable ? "white" : "#f35c7a",
                        cursor: disable ? "not-allowed" : "pointer",
                      }}
                    >
                      {choice.value}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* COLORS / */}

      {/* SIZES */}
      {/* <h3 className="font-medium text-xl">Choose a Size </h3>
 
        <button className=" border border-red-600 px-[10px] w-24 text-center font-medium py-[8px] text-red-700 rounded-xl">
          Medium
        </button>
        <button className="bg-[#EB306F] px-[10px] w-24 text-center font-medium py-[8px] text-white rounded-xl">
          Small
        </button>
      </div> */}
    </div>
  );
}
