import { createContext, useContext, useState } from "react";

import { ExamplePopup } from "../components/form-elements";
import {
  ShortTextField,
  LongTextField,
  FileField,
  TwoField,
  BoxesField,
  KeyWordsField,
} from "./form-fields";

const FormContext = createContext();
export const useForm = () => useContext(FormContext);

export const FormContent = ({
  formData,
  setFormData,
  examplePopups,
  togglePopup,
}) => {
  const [nbModellers, setNbModellers] = useState(1);
  const [nbLinks, setNbLinks] = useState(1);
  const [nbBoxes, setNbBoxes] = useState(1);

  const handleChange = (e, q) => {
    if (q === "keywords") {
      setFormData((prevState) => ({
        ...prevState,
        keywords: e,
      }));
    } else if (
      ["icon", "explanFig", "theoryFig", "resFig", "methodsFile"].includes(q) ||
      q.includes("boxfig")
    ) {
      if (e === "") {
        setFormData((prevState) => ({
          ...prevState,
          [q]: "",
        }));
      } else {
        const file = e.target.files[0];
        setFormData((prevState) => ({
          ...prevState,
          [q]: file,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [q]: e.target.value,
      }));
    }
  };

  const handleChangeNbModellers = (add = true, i = undefined) => {
    if (add) {
      if (nbModellers < 5) {
        setNbModellers((prevState) => prevState + 1); // Increment the number of modellers
      } else {
        alert("Only 5 modellers allowed!"); // Show a popup when trying to exceed the limit
      }
    } else {
      setNbModellers((prevState) => prevState - 1); // Increment the number of modellers
      setFormData((prevState) => {
        const updatedState = { ...prevState };

        // Shift modellerName and modellerUrl for all indices j > i up to 5
        for (let j = i + 1; j <= 4; j++) {
          updatedState[`modellerName${j - 1}`] =
            prevState[`modellerName${j}`] || "";
          updatedState[`modellerUrl${j - 1}`] =
            prevState[`modellerUrl${j}`] || "";
        }

        // Clear the last modellerName and modellerUrl after the shift
        updatedState[`modellerName4`] = "";
        updatedState[`modellerUrl4`] = "";

        return updatedState;
      });
    }
  };

  const handleChangeNbButtons = (add = true, i = undefined) => {
    if (add) {
      if (nbLinks < 5) {
        setNbLinks((prevState) => prevState + 1); // Increment the number of modellers
      } else {
        alert("Only 5 links allowed!"); // Show a popup when trying to exceed the limit
      }
    } else {
      setNbLinks((prevState) => prevState - 1); // Increment the number of modellers
      setFormData((prevState) => {
        const updatedState = { ...prevState };

        // Shift linkName and linkUrl for all indices j > i up to 5
        for (let j = i + 1; j <= 4; j++) {
          updatedState[`linkName${j - 1}`] = prevState[`linkName${j}`] || "";
          updatedState[`linkUrl${j - 1}`] = prevState[`linkUrl${j}`] || "";
        }

        // Clear the last linkName and linkUrl after the shift
        updatedState[`linkName4`] = "";
        updatedState[`linkUrl4`] = "";

        return updatedState;
      });
    }
  };

  const handleChangeNbBoxes = (add = true, i = undefined) => {
    if (add) {
      if (nbBoxes < 4) {
        setNbBoxes((prevState) => prevState + 1); // Increment the number of modellers
      } else {
        alert("Only 4 boxes allowed!"); // Show a popup when trying to exceed the limit
      }
    } else {
      setNbBoxes((prevState) => prevState - 1); // Increment the number of modellers
      setFormData((prevState) => {
        const updatedState = { ...prevState };

        // Shift boxTitle, boxFigTitle, boxfig, and boxDescr for all indices j > i up to 5
        for (let j = i + 1; j <= 3; j++) {
          updatedState[`boxTitle${j - 1}`] = prevState[`boxTitle${j}`] || "";
          updatedState[`boxFigTitle${j - 1}`] =
            prevState[`boxFigTitle${j}`] || "";
          updatedState[`boxfig${j - 1}`] = prevState[`boxfig${j}`] || "";
          updatedState[`boxDescr${j - 1}`] = prevState[`boxDescr${j}`] || "";
        }

        // Clear the last boxTitle, boxFigTitle, boxfig, and boxDescr after the shift
        updatedState[`boxTitle3`] = "";
        updatedState[`boxFigTitle3`] = "";
        updatedState[`boxfig3`] = "";
        updatedState[`boxDescr3`] = "";

        return updatedState;
      });
    }
  };

  return (
    <>
      <FormContext.Provider value={{ formData, handleChange }}>
        <div className="flex flex-col gap-[25px]">
          <div className="relative">
            <h2>Section 1: Introduction to the Model</h2>
            <p
              className="underline cursor-pointer select-none"
              onClick={() => togglePopup(1)}
            >
              Show Example
            </p>
            {examplePopups[1] && (
              <ExamplePopup nb={1} topPos={350} togglePopup={togglePopup} />
            )}
          </div>
          <ShortTextField
            label={"Enter the name of your model*"}
            placeholder={"Enter Model Name"}
            field={"modelName"}
          />
          <KeyWordsField />
          <TwoField
            lgen={"Who worked on this model?"}
            nb={nbModellers}
            ch={handleChangeNbModellers}
            l1={"Full name: *"}
            f1={"modellerName"}
            p1={"Firstname Lastname"}
            l2={"URL to personal page: "}
            f2={"modellerUrl"}
            p2={"www.firstname-lastname.org"}
            ladd={"Click here to add another name"}
          />
          <FileField
            label={"Do you have a picture/icon for your model?"}
            field={"icon"}
            allowedFileTypes={".png, .svg"}
          />
          <LongTextField
            label={"Enter a description of your model*"}
            placeholder={"Model Description"}
            field={"descr"}
          />
          <FileField
            label={"Upload an explanatory or output figure for your model*"}
            field={"explanFig"}
            allowedFileTypes={".png, .svg"}
            capField={"explanFigCaption"}
          />
          <TwoField
            lgen={
              "Do you want to link to other sites or files? (eg. github, dataverse, own page"
            }
            nb={nbLinks}
            ch={handleChangeNbButtons}
            l1={"Button text: "}
            f1={"linkName"}
            p1={"eg. Github"}
            l2={"URL"}
            f2={"linkUrl"}
            p2={"e.g. www.github.com/this-model"}
            ladd={"Click here to add another button"}
          />
        </div>

        <div className="flex flex-col gap-[25px]">
          <div className="relative">
            <h2>Section 2: Theory behind the model</h2>
            <p
              className="underline cursor-pointer select-none"
              onClick={() => togglePopup(2)}
            >
              Show Example
            </p>
            {examplePopups[2] && (
              <ExamplePopup nb={2} topPos={1300} togglePopup={togglePopup} />
            )}
          </div>
          <LongTextField
            label={"Enter some theory or applications of your model*"}
            placeholder={"Model theory or applications"}
            field={"theoryText"}
          />
          <FileField
            label={"Do you want to show a supporting figure for this section?"}
            field={"theoryFig"}
            allowedFileTypes={".png"}
            capField={"theoryFigDesc"}
          />
        </div>

        <div className="flex flex-col gap-[25px]">
          <div className="relative">
            <h2>Section 3: Results from this model</h2>
            <p
              className="underline cursor-pointer select-none"
              onClick={() => togglePopup(3)}
            >
              Show Example
            </p>
            {examplePopups[3] && (
              <ExamplePopup nb={3} topPos={1800} togglePopup={togglePopup} />
            )}
          </div>
          <LongTextField
            label={"Enter a description of the result(s) created by the model*"}
            placeholder={"Result description"}
            field={"resText"}
          />
          <FileField
            label={"Do you want to show a supporting figure for this section?"}
            field={"resFig"}
            allowedFileTypes={".png"}
            capField={"resFigDesc"}
          />
          <div className="flex flex-col gap-[25px]">
            <h3>Output boxes</h3>
            <div>
              <p>
                This section gathers information for the boxes showcasing model
                output. Output data can be shown in the following formats:
                <b>Insuffusiently explained</b>
              </p>
              <ul className="reg">
                <li key={0}>Figure (.png, ...)</li>
                <li key={1}>Timeseries (.csv)</li>
                <li key={2}>Raster map (.tif)</li>
                <li key={3}>Vector map (.geojson)</li>
              </ul>
              <BoxesField
                nbBoxes={nbBoxes}
                handleChangeNbBoxes={handleChangeNbBoxes}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[25px]">
            <div className="relative">
              <h2>Section 4: Methods behind this model</h2>
              <p
                className="underline cursor-pointer select-none"
                onClick={() => togglePopup(4)}
              >
                Show Example
              </p>
              {examplePopups[4] && (
                <ExamplePopup nb={4} topPos={2300} togglePopup={togglePopup} />
              )}
            </div>
            <LongTextField
              label={"Description of the model itself"}
              placeholder={"Enter a description"}
              field={"methodsDesc"}
            />
            <FileField
              label={"Upload output data here"}
              field={"methodsFile"}
              allowedFileTypes={".csv, .tif, .geojson"}
            />
          </div>
          <div className="flex flex-col gap-[25px]">
            <div className="relative">
              <h2>Section 5: Colofon</h2>
              <p
                className="underline cursor-pointer select-none"
                onClick={() => togglePopup(5)}
              >
                Show Example
              </p>
              {examplePopups[5] && (
                <ExamplePopup nb={5} topPos={2500} togglePopup={togglePopup} />
              )}
            </div>
            <ShortTextField
              label={"How should people cite this model?*"}
              placeholder={"How to cite"}
              field={"colofonCite"}
            />
            <ShortTextField
              label={
                "Enter a licence* <b>Explain but what does this even mean?</b>"
              }
              placeholder={"Enter licence"}
              field={"colofonLicence"}
            />
            <LongTextField
              label={
                "Do you want to include additional information in the Colofon?"
              }
              placeholder={"Enter additional Colofon info"}
              field={"colofonAddition"}
            />
          </div>
        </div>
      </FormContext.Provider>
    </>
  );
};
