import { Link } from 'react-router-dom';
import { adminInfo } from '../App';

export const PageFooter = () => {
    return (
        <>
            <div id="footer" className="bg-black w-full h-[56px] flex gap-4 justify-between flex-row px-[27px] py-[11px] z-50">
                <div className="flex flex-row gap-4">
                    <div className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="/">
                            Overview
                        </Link>
                    </div>
                    <div className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="https://www.uu.nl/en/research/copernicus-institute-of-sustainable-development">
                            Copernicus
                        </Link>
                    </div>
                </div>

                {adminInfo && (
                    <div className="text-white font-sans text-[16px] leading-[34px]">
                        For questions or comments, please contact{' '}
                        <a className="underline" href={adminInfo[1]}>
                            {adminInfo[1]}
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};
