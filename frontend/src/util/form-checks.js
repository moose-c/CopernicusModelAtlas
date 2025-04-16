import { mandFields, fieldNameMapping, fileFields } from "./globalVars";
import { getJsDateFromExcel } from "excel-date-to-js";
import * as XLSX from "xlsx"

export const performChecks = async (formData, performAll = true) => {
    let check = true;
    if (performAll) {
        if (check) {
            for (let fileField of fileFields) {
                const file = formData[fileField]
                const name = formData[`${fileField}Name`]
                if (file instanceof File) {
                    check = await checkUploadedFile(file, name)
                    if (!check) {
                        break;
                    }
                }
            }
        }
        if (check) {
            check = checkName(formData)
        }
        if (check) {
            check = checkLength(formData)
        }
        if (check) {
            check = checkMandatoryFields(formData)
        }

    }
    return check;
};

const checkName = (formData) => {
    // _, /, & or #
    const modelName = formData["modelName"]
    if (modelName.includes("_") || modelName.includes("/") || modelName.includes("&") || modelName.includes("#")) {
        alert('Model Name includes invalid Characters!')
        return false
    }
    return true
}

const checkLength = (formData) => {
    let check = true
    const wordsLengthDict = {
        shortDescr: 65
    }
    const charLengthDict = {
        modelName: 75
    }
    for (const [key, value] of Object.entries(wordsLengthDict)) {
        if (formData[key].split(' ').length > value) {
            alert(`${fieldNameMapping[key]} field is too long!`);
            return false;
        }
    }
    for (const [key, value] of Object.entries(charLengthDict)) {
        if (formData[key].split('').length > value) {
            alert(`${fieldNameMapping[key]} field is too long!`);
            return false
        }
    }
    return check
}

// Check if all mandatory fields are filled out
const checkMandatoryFields = (formData) => {
    let check = true
    mandFields.some((mandField) => {
        const value = mandField
            .split(/[\.\[\]\'\"]/) // Split the path
            .filter(Boolean) // Remove empty strings
            .reduce((acc, key) => {
                return acc && acc[key] !== undefined ? acc[key] : undefined;
            }, formData); // Start reducing with formData as the base

        if (value === "") {
            // ideally, the alert point to the empty field, flashing it red or something.
            alert(`${fieldNameMapping[mandField]} field is empty! If you wish continue later with this field, please fill out a intermediate value like 'X'.`);
            check = false;
            return true;
        }
    });
    return check
}

const checkUploadedFile = async (file, name) => {
    let result = false

    if (file.size / (1024 * 1024) > 1) {
        alert(`${name} is too big! 1MB is maximal`)
        return false
    }

    const type = name.split('.')[1]
    if (['csv', 'xlsx'].includes(type)) {
        result = await checkSheet(file)
    } else if (['png'].includes(type)) {
        result = true
    } else if (['geojson', 'json'].includes(type)) {
        return await checkGeojson(file)
    }
    if (!result) {
        alert('Uploaded file not correct!')
    }
    return result
}

function isValidGeoJSON(json) {
    if (typeof json !== "object" || json === null) return false;

    const validGeometryTypes = [
        "Point", "MultiPoint", "LineString", "MultiLineString",
        "Polygon", "MultiPolygon", "GeometryCollection"
    ];

    if (json.type === "FeatureCollection") {
        return Array.isArray(json.features) && json.features.every(isValidFeature);
    }
    if (json.type === "Feature") {
        return isValidFeature(json);
    }
    if (validGeometryTypes.includes(json.type)) {
        return isValidGeometry(json);
    }

    return false;
}

function isValidFeature(feature) {
    return feature.type === "Feature" &&
        typeof feature.properties === "object" &&
        isValidGeometry(feature.geometry);
}

function isValidGeometry(geometry) {
    const validGeometryTypes = [
        "Point", "MultiPoint", "LineString", "MultiLineString",
        "Polygon", "MultiPolygon", "GeometryCollection"
    ];
    return geometry && validGeometryTypes.includes(geometry.type) &&
        Array.isArray(geometry.coordinates);
}

// Function to read file and validate GeoJSON
async function checkGeojson(file) {
    try {
        const text = await file.text();
        const json = JSON.parse(text);
        return isValidGeoJSON(json);
    } catch (error) {
        console.error("Invalid JSON:", error);
        return false;
    }
}


const checkSheet = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "array", sheetRows: 4 });
            const sheetName = workbook.SheetNames[0]; // Read the first sheet
            const sheetValue = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheetValue)
            const unitRow = jsonData[0]

            // first column needs to be titled time
            if (!(['time', 'Time'].includes(sheetValue?.['A1'].v))) {
                alert('first column needs to be titled "time" or "Time"');
                return resolve(false)
            }

            console.log(sheetValue)
            // check if time values can be interpreted correctly
            try {
                const dateValue = sheetValue['A4'].v
                if (typeof dateValue == 'number') {
                    getJsDateFromExcel(dateValue)
                } else if (typeof dateValue == 'string') {
                    if (isNaN(Date.parse(dateValue))) {
                        throw new Error('Invalid date-time format');
                    }
                }

            } catch (error) {
                alert('time column contains incorrect values')
                console.log(error)
                return resolve(false)
            }

            // check if second row indeed contains units
            const allStrings = Object.values(unitRow).every(value => typeof value === 'string');
            if (!allStrings) {
                alert('unit row contains non-strings')
                return resolve(false)
            }

            // check if third row contains default values
            const filteredKeys = Object.keys(sheetValue).filter(key => /[a-zA-Z]3$/.test(key));

            for (const key of filteredKeys) {
                if (!(['A3', 'B3', 'C3'].includes(key)) &&
                    !(typeof sheetValue[key].v === 'boolean' || sheetValue[key].v == 'true' || sheetValue[key].v == 'false')) {

                    console.log(key, sheetValue[key])
                    alert('default value row not correct')
                    return resolve(false)
                }
            }

            return resolve(true)
        }

        reader.readAsArrayBuffer(file);  // Start reading the file
    })
}