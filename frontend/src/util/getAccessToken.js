import { useContext } from "react";
import { AuthContext } from "..";

export const getAccessToken = () => {
    const { user, setUser } = useContext(AuthContext);

    const getAccessToken = async () => {
        if (!user || !user.accessToken || !user.refreshToken || !user.expiresAt) {
            console.error("Invalid user object");
            return null;
        }

        const currentTime = Date.now() / 1000; // Convert to seconds
        if (currentTime < user.expiresAt) {
            console.log('token still valid', currentTime, user.expiresAt)
            return user.accessToken; // Token is still valid
        }

        // // Token is expired, refresh it
        // try {
        //     const response = await fetch("/auth/refresh", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ refreshToken: user.refreshToken })
        //     });

        //     if (!response.ok) {
        //         throw new Error("Failed to refresh token");
        //     }

        //     const data = await response.json();

        //     // Update user state with new tokens
        //     const updatedUser = {
        //         ...user,
        //         accessToken: data.accessToken,
        //         expiresAt: Date.now() / 1000 + data.expiresIn, // Convert expiresIn to absolute time
        //     };

        //     setUser(updatedUser);

        //     return data.accessToken;
        // } catch (error) {
        //     console.error("Error refreshing token:", error);
        //     return null;
        // }
    };

    return getAccessToken;
};