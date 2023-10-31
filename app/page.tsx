"use client";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [hexColor, setHexColor] = React.useState("");
  const [rgba, setRgba] = React.useState("");
  const [inputError, setInputError] = React.useState<String | null>("");

  function validateInput(input: string) {
    setInputError(null);
    const regex = /^\((.+)\)$|^\[(.+)\]$/;
    const match = input.match(regex);

    if (match) {
      const values = match[1] || match[2];
      const result = values.split(",").map((val) => {
        const num = Number(val.trim());
        if (isNaN(num)) {
          setInputError(`Value '${val.trim()}' is not a number.`);
        }
        return num;
      });
      return result;
    } else {
      setInputError(
        "Input format is not valid. Please use [a, b, c] or (a, b, c)."
      );
    }
  }

  function rgbtohex(decimal: number) {
    let hex = "";
    while (decimal > 0) {
      let remainder = decimal % 16;
      if (remainder < 10) {
        hex = remainder + hex;
      } else {
        hex = String.fromCharCode(remainder + 55) + hex;
      }
      decimal = Math.floor(decimal / 16);
    }
    return hex || "0";
  }

  const convert = async () => {
    let hex = "#";
    const validated = await validateInput(rgba);
    if (validated) {
      for (const i in validated) {
        const response = await rgbtohex(validated[i]);
        console.log(response);
        hex += response;
      }
      setHexColor(hex);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 mx-auto">
      <div className="max-w-[800px mx-auto">
        <h2 className="font-montserrat text-[36px] font-bold mb-10">
          RGB to HEX Converter
        </h2>
        <div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rgb-input" className="font-semibold">
              RGB Value
            </label>
            <input
              type="text"
              placeholder="(R, G, B) or [R, G, B]"
              className={`border border-solid ${
                inputError ? "border-[crimson] border-[2px]" : "border-black/75"
              } rounded-[8px] px-4 py-2 focus:outline-none focus-visible:outline-none focus:border-[2px] focus:border-[#F28123] w-full lg:w-[500px] transition-all duration-300 ease-in`}
              value={rgba}
              onChange={(e) => setRgba(e.target.value)}
            />
            {inputError && (
              <p className="font-montserrat text-[13px] font-light text-[crimson]">
                {inputError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="border-none bg-[#38726C] px-8 py-3 font-semibold text-white my-10"
            onClick={convert}>
            Convert
          </button>
          {hexColor && (
            <div className="w-[500px] h-[50px] flex justify-between items-center bg-white px-6 font-semibold">
              <p>{hexColor}</p>
              <div
                className={`w-[24px] h-[24px]`}
                style={{ backgroundColor: hexColor }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
