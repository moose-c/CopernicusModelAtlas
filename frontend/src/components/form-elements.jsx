import React from "react";

export const ExamplePopup = ({ nb, topPos, togglePopup }) => {
  console.log(topPos);
  return (
    <div
      className={`overflow-hidden absolute right-4 h-fill w-[580px] p-4 bg-white border border-gray-300 rounded-lg shadow-md`}
      style={{
        top: topPos,
      }}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => togglePopup(nb)}
      >
        &times; {/* Cross icon */}
      </button>
      <figure className="mb-4 h-full w-full">
        <img
          src={`/assets/images/ExamplePopup${nb}.png`}
          alt="Placeholder"
          className="w-full h-full object-contain rounded-lg"
        />
      </figure>
    </div>
  );
};
