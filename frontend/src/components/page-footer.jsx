import { Link } from 'react-router-dom';
import { adminInfo } from '../App';

export const PageFooter = () => {
    return (
        <>
            <div id="footer" className="bg-black w-full flex gap-4 justify-between flex-row px-[27px] py-[11px] z-50">
                <div className="flex flex-row gap-4">
                    <div className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="/">
                            Home
                        </Link>
                    </div>
                    <div className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="/about">
                            About
                        </Link>
                    </div>
                </div>

                <div className="text-white font-sans text-[16px] leading-[34px]">
                    For questions or comments, please contact{' '}
                    <a className="underline" href={'copernicus-model-atlas@uu.nl'}>
                        copernicus-model-atlas@uu.nl
                    </a>
                </div>
            </div>
        </>
    );
};
