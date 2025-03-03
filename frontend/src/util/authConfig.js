import { UserManager } from "oidc-client-ts";

const domain = import.meta.env.VITE_APP_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_APP_AUTH_CLIENT_ID;
const clientSecret = import.meta.env.VITE_APP_AUTH_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_APP_AUTH_CALLBACK_URL;
const logoutUri = import.meta.env.VITE_APP_AUTH_LOGOUT_URL;
const postLogoutUri = import.meta.env.VITE_APP_AUTH_POST_LOGOUT_URL;

const oidcConfig = {
    authority: domain,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email",
    frontchannel_logout_uri: logoutUri,
};

export const userManager = new UserManager(oidcConfig);
