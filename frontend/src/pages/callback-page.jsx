import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "../util/authConfig";
import { AuthContext } from "..";

import { PageLayout } from "../components/page-layout";

export const CallbackPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the authentication response
    userManager.signinRedirectCallback().then(() => {
      userManager.getUser().then((loggedInUser) => {
        setUser(loggedInUser);
      });
      navigate("/profile"); // Redirect to the protected page
    });
  }, [navigate]);

  return (
    <PageLayout>
      <p>Logging in...</p>
    </PageLayout>
  );
};
