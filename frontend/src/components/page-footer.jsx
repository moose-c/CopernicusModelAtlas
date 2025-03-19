import { Link } from 'react-router-dom';

export const PageFooter = () => {
    return (
        <>
            <div id="footer" className="bg-black w-full h-[56px] flex flex-row px-[27px] py-[11px] z-50">
                <div className="flex flex-1 gap-4">
                    <p className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="/">
                            Overview
                        </Link>
                    </p>
                    <p className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="https://www.uu.nl/en/research/copernicus-institute-of-sustainable-development">
                            Copernicus
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
