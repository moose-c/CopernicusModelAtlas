const refreshDomain = import.meta.env.VITE_APP_AUTH_REFRESH_URL;
const clientId = import.meta.env.VITE_APP_AUTH_CLIENT_ID;
const clientSecret = import.meta.env.VITE_APP_AUTH_CLIENT_SECRET;

export const getAccessToken = async (user, setUser) => {

    if (!user || !user.access_token || !user.refresh_token || !user.expires_at) {
        console.log(user)
        // console.error("Invalid user object");
        return null;
    }

    // const currentTime = Date.now() / 1000; // Convert to seconds
    // if (currentTime < user.expires_at) {
    //     return user.access_token; // Token is still valid
    // }
    alert('token expired, please log out and in again.')
    // Token is expired, refresh it
    try {
        const response = await fetch(refreshDomain, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",  // Required for refresh token flow
                refresh_token: user.refresh_token,
                client_id: clientId,
                client_secret: clientSecret
            })
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        console.log('user', user)
        console.log('response data', data)
        // Update user state with new tokens
        const updatedUser = {
            ...user,
            access_token: data.access_token,
            expires_at: Date.now() / 1000 + data.expires_in, // Convert expiresIn to absolute time
        };

        setUser(updatedUser);

        return data.access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};