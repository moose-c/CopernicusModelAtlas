import { useContext } from "react";
import { AuthContext } from "..";

export const getAccessToken = () => {
    const { user, setUser } = useContext(AuthContext);

    const getAccessToken = async () => {
        if (!user || !user.access_token || !user.refresh_token || !user.expires_at) {
            console.error("Invalid user object");
            return null;
        }

        const currentTime = Date.now() / 1000; // Convert to seconds
        if (currentTime < user.expires_at) {
            console.log('token still valid', currentTime, user.expires_at)
            return user.access_token; // Token is still valid
        }

        // // Token is expired, refresh it
        // try {
        //     const response = await fetch("/auth/refresh", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ refresh_token: user.refresh_token })
        //     });

        //     if (!response.ok) {
        //         throw new Error("Failed to refresh token");
        //     }

        //     const data = await response.json();

        //     // Update user state with new tokens
        //     const updatedUser = {
        //         ...user,
        //         access_token: data.access_token,
        //         expires_at: Date.now() / 1000 + data.expiresIn, // Convert expiresIn to absolute time
        //     };

        //     setUser(updatedUser);

        //     return data.access_token;
        // } catch (error) {
        //     console.error("Error refreshing token:", error);
        //     return null;
        // }
    };

    return getAccessToken;
};