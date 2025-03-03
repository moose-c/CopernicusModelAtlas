import { callExternalApi } from "./external-api.service";
import axios from "axios";

const apiServerUrl = import.meta.env.VITE_APP_API_SERVER_URL;

export const postModel = async (modelData, accessToken) => {
    // create suitable formData type (necessesary to handle file uploads)
    const formData = new FormData();
    Object.keys(modelData).forEach((key) => {
        const value = modelData[key]
        if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value))
        } else if (value instanceof File) {
            formData.append(key, value)
        } else {
            formData.append(key, value)
        }
    })

    const url = `${apiServerUrl}/api/models/post`
    axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

export const editModel = async (modelData, model_id, accessToken) => {
    // create suitable formData type (necessary to handle file uploads)
    const formData = new FormData();
    Object.keys(modelData).forEach((key) => {
        const value = modelData[key];
        if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));  // Append arrays as JSON string
        } else if (value instanceof File) {
            formData.append(key, value);  // Append files
        } else {
            formData.append(key, value);  // Append other values (strings, numbers, etc.)
        }
    });

    // Construct URL with model_id
    const url = `${apiServerUrl}/api/models/edit/${model_id}`;

    try {
        // Send the formData with a POST request
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",  // Ensure correct content type for file uploads
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Handle successful response
        console.log('Model edited successfully', response.data);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error editing model:', error);
        throw error;  // Rethrow the error if needed for further handling
    }
};


export const getAllModels = async () => {
    const config = {
        url: `${apiServerUrl}/api/models/get_all`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getUserModels = async (user_id) => {
    const config = {
        url: `${apiServerUrl}/api/models/get_user/${user_id}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getSingleModel = async (model_id) => {
    const url = `${apiServerUrl}/api/models/get_single/${model_id}`
    const config = {
        url: url,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const deleteModel = async (model_id, accessToken) => {
    const url = `${apiServerUrl}/api/models/delete/${model_id}`; // Modify the endpoint to fit your DELETE route
    const config = {
        url: url,
        method: "DELETE",  // Use DELETE method to delete the resource
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getLargeFile = async (dataLoid) => {
    const config = {
        url: `${apiServerUrl}/api/models/get_file/${dataLoid}`,
        method: "GET",
        responseType: "blob", // Ensures the response is treated as a binary file
        headers: {
            "Content-Type": "application/octet-stream",
        },
    };

    try {
        const response = await callExternalApi({ config });

        if (response.error) {
            return { data: null, error: response.error };
        }

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
