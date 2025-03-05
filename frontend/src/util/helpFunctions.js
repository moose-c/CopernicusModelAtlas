import { blankForm } from "./globalVars";

export const unpackModel = (modelResponse) => {
    Object.keys(blankForm).forEach((key) => {
        if (key.toLowerCase() !== key) {
            if (modelResponse.hasOwnProperty(key.toLowerCase())) {
                modelResponse[key] = modelResponse[key.toLowerCase()];  // Create new key with new name and assign value
                delete modelResponse[key.toLowerCase()];  // Delete old key
            }
        }
        if (modelResponse[key] == null) {
            // correctly assign empty strings or 0
            modelResponse[key] = blankForm[key]
        }
    });
    return modelResponse
};