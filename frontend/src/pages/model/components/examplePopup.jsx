import React from 'react';

export const ExamplePopup = ({ nb, togglePopup, content, width = 'w-[580px]' }) => {
    return (
        <div className={`overflow-hidden fixed top-4 right-1 p-4 z-10 ${width} bg-white border border-gray-300 shadow-md`}>
            <button className="absolute top-2 right-2 text-gray-500 hove2:text-gray-800" onClick={() => togglePopup(nb)}>
                &times; {/* Cross icon */}
            </button>
            {nb != 0 && nb < 6 && (
                <figure className="mb-4 h-full w-full">
                    <img src={`/assets/images/ExamplePopup${nb}.png`} loading="lazy" alt="Placeholder" className="w-full h-full object-contain rounded-lg" />
                </figure>
            )}
            {content && <>{content}</>}
        </div>
    );
};
