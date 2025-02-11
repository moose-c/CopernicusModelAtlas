import React from "react";

export const ExamplePopup = ({ nb, togglePopup, content }) => {
  return (
    <div
      className={`overflow-hidden absolute top-16 right-0 z-10 w-[580px] p-4 bg-white border border-gray-300 rounded-lg shadow-md`}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => togglePopup(nb)}
      >
        &times; {/* Cross icon */}
      </button>
      {nb != 0 && (
        <figure className="mb-4 h-full w-full">
          <img
            src={`/assets/images/ExamplePopup${nb}.png`}
            alt="Placeholder"
            className="w-full h-full object-contain rounded-lg"
          />
        </figure>
      )}
      {content && <>{content}</>}
    </div>
  );
};
