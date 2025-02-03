import { blankForm } from "./globalVars";

export const unpackModel = (modelResponse) => {
    // remove id
    modelResponse = modelResponse.slice(1);
    console.log(modelResponse);

    const dictKeys = Object.keys(blankForm);
    const modelData = dictKeys.reduce((acc, key, index) => {
        acc[key] = modelResponse[index] !== undefined ? modelResponse[index] : "";
        return acc;
    }, {});

    let nbModellers = 0
    let nbButtons = 0
    let nbBoxes = 0
    for (let i = 0; i < 5; i++) {
        if (modelData[`modellerName${i}`] != '') {
            nbModellers++
        }
        if (modelData[`linkName${i}`] != '') {
            nbButtons++
        }
        if (modelData?.[`boxTitle${i}`] && modelData[`boxTitle${i}`] != '') {
            nbBoxes++
        }
    }
    modelData['nbModellers'] = nbModellers
    modelData['nbButtons'] = nbButtons
    modelData['nbBoxes'] = nbBoxes

    console.log(modelData);
    return modelData;
};
