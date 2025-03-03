import { Button } from './button';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '..';
import { NavBarTab } from './nav-bar-tab';
import { useContext } from 'react';

export const NavBar = () => {
    const { user, login, logout } = useContext(AuthContext);

    return (
        <div id="navbar">
            <div className="bg-copernicusYellow w-full px-[42px] py-[18px]">
                <p className="font-sans text-[40px] font-thin leading-[34px] text-black">Copernicus Institute of Sustainable Development</p>
            </div>
            <div className="bg-black w-full h-[56px] flex flex-row px-[27px] py-[11px]">
                <div className="flex flex-1 gap-4">
                    <p className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="/">
                            Atlas
                        </Link>
                    </p>
                    <p className="text-white font-sans text-[16px] leading-[34px]">
                        <Link className="hover:underline" to="https://www.uu.nl/en/research/copernicus-institute-of-sustainable-development">
                            Copernicus
                        </Link>
                    </p>
                </div>
                <div className="flex flex-row gap-4 text-white">
                    {!user && (
                        <>
                            <NavBarTab path="/message/public" label="Public" />
                            <Button text="Log in" call={login} />
                        </>
                    )}
                    {user && (
                        <>
                            <NavBarTab path="/model/add" label="Add Model" />
                            <NavBarTab path="/message/public" label="Public" />
                            <NavBarTab path="/profile" label="Profile" />
                            <NavBarTab path="/message/protected" label="Private" />
                            <Button text="Log out" call={logout} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
