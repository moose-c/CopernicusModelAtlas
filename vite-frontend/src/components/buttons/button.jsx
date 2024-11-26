import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link, NavLink } from "react-router-dom";

// useNavigate seems to allow redirection within this site only, a problem for 0Auth?
export const Button = ({ text = "Contribute", to = "/admin", log = "" }) => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  const handleClick = () => {
    if (log.toLocaleLowerCase() === "in") {
      loginWithRedirect({
        appState: {
          returnTo: "/profile",
        },
      });
    } else if (log.toLocaleLowerCase() === "out") {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-[11px] bg-copernicusYellow pl-[20px] h-[34px] items-center group"
    >
      <span className="buttonText uppercase">{text}</span>
      <div className="w-[42px] h-[34px] flex justify-center items-center group-hover:bg-black">
        <img
          src="src/assets/buttonArrowBlack.svg"
          alt="a"
          className="group-hover:opacity-0"
        />
        <img
          src="src/assets/buttonArrowYellow.svg"
          alt="aaa"
          className="absolute opacity-0 group-hover:opacity-100 "
        />
      </div>
    </button>
  );
};
