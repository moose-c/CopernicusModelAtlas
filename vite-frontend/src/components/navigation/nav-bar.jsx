import React from "react";
import { Button } from "../buttons/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBarTab } from "./desktop/nav-bar-tab";

export const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();
  const isAdmin = user?.["https://namespace.com/roles"]?.includes("admin");

  return (
    <>
      <div className="bg-copernicusYellow w-full h-[76px] px-[42px] py-[18px]">
        <p className="font-sans text-[40px] font-thin leading-[34px]">
          Copernicus Institute of Sustainable Development
        </p>
      </div>
      <div className="bg-black w-full h-[56px] flex flex-row px-[27px] py-[11px]">
        <div className="flex flex-1 gap-4">
          <p className="text-white font-sans text-[16px] leading-[34px]">
            <Link className="hover:underline" to="/">
              Atlas
            </Link>
          </p>
          <p className="text-white font-sans text-[16px] leading-[34px]">
            <Link
              className="hover:underline"
              to="https://www.uu.nl/en/research/copernicus-institute-of-sustainable-development"
            >
              Copernicus
            </Link>
          </p>
        </div>
        <div className="flex flex-row gap-4 text-white">
          {!isAuthenticated && (
            <>
              <NavBarTab path="/public" label="Public" />
              <Button text="Log in" log="in" />
            </>
          )}
          {isAuthenticated && (
            <>
              <NavBarTab path="/public" label="Public" />
              <NavBarTab path="/profile" label="Profile" />
              <NavBarTab path="/protected" label="Private" />
              {isAdmin && <NavBarTab path="/admin" label="Admin" />}
              <Button text="Log out" log="out" />
            </>
          )}
        </div>
      </div>
    </>
  );
};
