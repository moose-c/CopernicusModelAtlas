import { useState } from 'react';

export const SideBarChangeContent = () => {
    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <ul className="list-none">
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('navbar')}>
                    Top
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('introduction')}>
                    1. Introduction
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('theory')}>
                    2. Theory
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('results')}>
                    3. Results
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('methods')}>
                    4. Methods
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('colofon')}>
                    5. Colofon
                </li>
                <li className="cursor-pointer p-2 reg list-none" onClick={() => handleScroll('footer')}>
                    Bottom
                </li>
            </ul>
        </>
    );
};

export const SideBarModelContent = () => {
    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <ul className="list-none">
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('navbar')}>
                    Top
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('introduction')}>
                    1. Introduction
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('theory')}>
                    2. Theory
                </li>
                <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('results')}>
                    3. Results
                </li>
                {document.getElementById('methods') && (
                    <>
                        <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('methods')}>
                            4. Methods
                        </li>
                        <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('colofon')}>
                            5. Colofon
                        </li>
                    </>
                )}
                {!document.getElementById('methods') && (
                    <>
                        <li className="cursor-pointer p-2 reg" onClick={() => handleScroll('colofon')}>
                            4. Colofon
                        </li>
                    </>
                )}

                <li className="cursor-pointer p-2 reg list-none" onClick={() => handleScroll('footer')}>
                    Bottom
                </li>
            </ul>
        </>
    );
};

export const SideBar = ({ sideBarContent }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Sidebar wrapper */}
            <div className="relative">
                {/* Hamburger icon, always visible, sticky at the top of the page */}
                <div className="sticky top-0 left-2 z-50 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <div className="bg-copernicusGrey hover:bg-gray-300 p-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-800"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>

                {/* Sidebar content that appears when sidebar is open */}
                {sidebarOpen && (
                    <div className="bg-copernicusGrey min-w-[300px] max-w-[300px] h-full">
                        {/* The sidebar content */}
                        <div className="sticky top-12">{sideBarContent}</div>
                    </div>
                )}
            </div>
        </>
    );
};
