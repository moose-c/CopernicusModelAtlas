import { Button } from './button';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '..';
import { useContext } from 'react';

export const NavBar = () => {
    const { user, login, logout } = useContext(AuthContext);

    return (
        <div id="navbar">
            <div className="bg-copernicusYellow w-full px-[42px] py-[18px]">
                <Link to="https://www.uu.nl/en/research/copernicus-institute-of-sustainable-development">
                    <p className="font-sans text-[40px] font-thin leading-[34px] text-black">Copernicus Institute of Sustainable Development</p>
                </Link>
            </div>
            <div className="bg-black w-full h-[56px] flex flex-row px-[27px] py-[11px]">
                <div className="flex flex-1 gap-4">
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
                <div className="flex flex-row items-center gap-4 text-white">
                    {!user && (
                        <>
                            <Button text="Log in" call={login} />
                        </>
                    )}
                    {user && (
                        <>
                            <div>
                                <NavLink to="/model/add">Add Model</NavLink>
                            </div>
                            <div>
                                <NavLink to="/profile">Profile</NavLink>
                            </div>
                            <Button text="Log out" call={logout} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
