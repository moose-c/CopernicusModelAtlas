import { callExternalApi } from "./external-api.service";
import axios from "axios";

const apiServerUrl = import.meta.env.VITE_APP_API_SERVER_URL;

export const postModel = async (modelData) => {
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
        },
    })
}

export const editModel = async (modelData) => {
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

    const url = `${apiServerUrl}/api/models/edit/${model_id}`
    axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

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

export const getSingleModel = async (model_id) => {
    const url = `${apiServerUrl}/api/models/get_single/${model_id}`
    console.log(url)
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