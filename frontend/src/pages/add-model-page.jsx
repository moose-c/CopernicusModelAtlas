import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { ExamplePopup } from "../components/form-elements";

import { postModel } from "../services/message.service";

import Multiselect from "multiselect-react-dropdown";

import { keywords } from "../util/globalVars";

import "../styles/components/form.css";

export const AddModelPage = () => {
  const [examplePopups, setExamplePopups] = useState(Array(6).fill(false));

  const togglePopup = (popupNb) => {
    setExamplePopups((prevState) =>
      prevState.map((val, i) => (i === popupNb ? !val : false))
    );
  };

  const blankBox = {
    title: "",
    figTitle: "",
    fig: "",
    descTitle: "",
    desc: "",
  };

  const blankForm = {
    modelName: "",
    keywords: [],
    modellers: [{ name: "", url: "" }],
    icon: "",
    description: "",
    explanFig: "",
    links: [{ buttonText: "", url: "" }],
    theoryText: "",
    theoryFig: "",
    theoryFigDesc: "",
    resText: "",
    resFig: "",
    resFigDesc: "",
    boxes: [blankBox],
    methodsDesc: "",
    methodsFile: "",
    colofonCite: "",
    colofonLicence: "",
    colofonAddition: "",
  };
  const [formData, setFormData] = useState(blankForm);

  const [nbModellers, setNbModellers] = useState(1);
  const [nbLinks, setNbLinks] = useState(1);
  const [nbBoxes, setNbBoxes] = useState(1);

  const handleSubmit = (event) => {
    let isMounted = true;

    event.preventDefault();

    const modellerInfo = {
      name: name,
      model: model,
    };

    const doPost = async (modellerInfo) => {
      const { data, error } = postModel(modellerInfo);
      setFormData(blankForm);
    };

    doPost(modellerInfo);

    return () => {
      isMounted = false;
    };
  };

  const handleChange = (e, q, addVar1 = undefined, addVar2 = undefined) => {
    if (
      [
        "modelName",
        "description",
        "theoryText",
        "theoryFigDesc",
        "resText",
        "resFigDesc",
      ].includes(q)
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [q]: e.target.value,
      }));
    } else if (q === "keywords") {
      setFormData((prevState) => ({
        ...prevState,
        keywords: e,
      }));
    } else if (["modellers", "links"].includes(q)) {
      setFormData((prevState) => ({
        ...prevState,
        [q]: prevState[q].map((entry, index) =>
          index === addVar1 ? { ...entry, [addVar2]: e.target.value } : entry
        ),
      }));
    } else if (["icon", "explanFig", "theoryFig", "resFig"].includes(q)) {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        [q]: file,
      }));
    }
  };

  const handleChangeNbModellers = (add = true, i = undefined) => {
    if (add) {
      if (nbModellers < 5) {
        setNbModellers((prevState) => prevState + 1); // Increment the number of modellers
        setFormData((prevState) => ({
          ...prevState,
          modellers: [...prevState.modellers, { name: "", url: "" }],
        }));
      } else {
        alert("Only 5 modellers allowed!"); // Show a popup when trying to exceed the limit
      }
    } else {
      setNbModellers((prevState) => prevState - 1); // Increment the number of modellers
      setFormData((prevState) => ({
        ...prevState,
        modellers: prevState.modellers.filter((_, index) => index !== i),
      }));
    }
  };

  const handleChangeNbButtons = (add = true, i = undefined) => {
    if (add) {
      if (nbLinks < 5) {
        setNbLinks((prevState) => prevState + 1); // Increment the number of modellers
        setFormData((prevState) => ({
          ...prevState,
          links: [...prevState.links, { buttonText: "", url: "" }],
        }));
      } else {
        alert("Only 5 links allowed!"); // Show a popup when trying to exceed the limit
      }
    } else {
      setNbLinks((prevState) => prevState - 1); // Increment the number of modellers
      setFormData((prevState) => ({
        ...prevState,
        links: prevState.links.filter((_, index) => index !== i),
      }));
    }
  };

  return (
    <PageLayout>
      <div className="content-layout px-[100px]">
        <h1>Form to create new model page</h1>
        <p>
          Fill out this form to create add a new model to the overview. To see
          an example of what the model page will look like, click{" "}
          <span
            className="cursor-pointer underline select-none"
            onClick={() => togglePopup(0)}
          >
            here
          </span>
          {examplePopups[0] && (
            <ExamplePopup nb={0} topPos={300} togglePopup={togglePopup} />
          )}
        </p>
        <form
          onSubmit={handleSubmit}
          className="p-[20px] bg-gray-100 rounded shadow-md w-full flex flex-col gap-[20px] "
        >
          <div className="flex flex-col gap-[25px]">
            <div>
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
            <div>
              <p>Enter the name of your model*</p>
              <input
                className="formQAs"
                type="text"
                placeholder="Name of Model"
                value={formData.modelName}
                onChange={(e) => handleChange(e, "modelName")}
              />
            </div>
            <div>
              <p>Choose relevant keywords from dropdown</p>
              <Multiselect
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onRemove={(e) => {
                  function noRefCheck() {}
                  handleChange(e, "keywords");
                }}
                onSearch={function noRefCheck() {}}
                onSelect={(e) => {
                  function noRefCheck() {}
                  handleChange(e, "keywords");
                }}
                options={keywords}
                placeholder="Select Keywords"
                className="formQAs bg-white m-0 p-0 border-0"
              />
            </div>
            <div>
              <p>Who worked on this model?</p>
              {Array.from({ length: nbModellers }, (_, i) => (
                <div className="flex justify-between items-center">
                  <p>Full name*</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="Firstname Lastname"
                    value={formData.modellers[i].name}
                    onChange={(e) => handleChange(e, "modellers", i, "name")}
                  />
                  <p> | </p>
                  <p>Optional URL to personal page</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="www.firstname-lastname.org"
                    value={formData.modellers[i].url}
                    onChange={(e) => handleChange(e, "modellers", i, "url")}
                  />
                  {i !== 0 && (
                    <button
                      onClick={() => handleChangeNbModellers(false, i)}
                      className="w-6 h-6 rounded-full bg-red-500 text-white cursor-pointer text-xs hover:bg-red-700"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <p
                className="underline cursor-pointer"
                onClick={() => handleChangeNbModellers()}
              >
                Click here to add another name
              </p>
            </div>
            <div>
              <p>Do you have a picture/icon for your model?</p>
              <div className="flex gap-[15px]">
                <input
                  type="file"
                  id="file-upload"
                  accept=".png, .svg"
                  onChange={(e) => handleChange(e, "icon")}
                  className="hidden"
                />

                {/* Label acting as the "Browse..." button */}
                <label
                  htmlFor="file-upload"
                  className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
                >
                  <p>Browse...</p>
                </label>

                <p>Allowed file types: .png, .svg</p>
              </div>
            </div>
            <div>
              <p>Enter a description of your model*</p>
              <textarea
                className="formQAl"
                type="text"
                placeholder="Model Description"
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
              />
            </div>
            <div>
              <p>Upload an explanatory or output figure for your model*</p>
              <div className="flex gap-[15px]">
                <input
                  type="file"
                  id="file-upload2"
                  accept=".png, .svg"
                  onChange={(e) => handleChange(e, "explanFig")}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload2"
                  className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
                >
                  <p>Browse...</p>
                </label>

                <p>Allowed file types: .png, .svg</p>
              </div>
            </div>
            <div>
              <p>
                Do you want to links to other sites or files? (eg. github,
                dataverse, own page)
              </p>
              {Array.from({ length: nbLinks }, (_, i) => (
                <div className="flex justify-between items-center">
                  <p>Button text</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="eg. Github"
                    value={formData.links[i].buttonText}
                    onChange={(e) => handleChange(e, "links", i, "buttonText")}
                  />
                  <p> | </p>
                  <p>URL</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="www.github.com/this-model"
                    value={formData.links[i].url}
                    onChange={(e) => handleChange(e, "links", i, "url")}
                  />
                  {i !== 0 && (
                    <button
                      onClick={() => handleChangeNbButtons(false, i)}
                      className="w-6 h-6 rounded-full bg-red-500 text-white cursor-pointer text-xs hover:bg-red-700"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <p
                className="underline cursor-pointer"
                onClick={() => handleChangeNbButtons()}
              >
                Click here to add another button
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[25px]">
            <div>
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
            <div>
              <p>Enter some theory or applications of your model*</p>
              <textarea
                className="formQAl"
                type="text"
                placeholder="Model theory or applications"
                value={formData.theoryText}
                onChange={(e) => handleChange(e, "theoryText")}
              />
            </div>
            <div>
              <p>Do you want to show a supporting figure for this section?</p>
              <div className="flex gap-[15px]">
                <input
                  type="file"
                  id="file-upload3"
                  accept=".png"
                  onChange={(e) => handleChange(e, "theoryFig")}
                  className="hidden"
                />

                {/* Label acting as the "Browse..." button */}
                <label
                  htmlFor="file-upload3"
                  className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
                >
                  <p>Browse...</p>
                </label>

                <p>Allowed file types: .png</p>
              </div>
            </div>
            <div>
              <p>Do you want the figure uploaded above to have a caption?</p>
              <input
                className="formQAs"
                type="text"
                placeholder="Caption"
                value={formData.theoryFigDesc}
                onChange={(e) => handleChange(e, "theoryFigDesc")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[25px]">
            <div>
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
            <div>
              <p>Enter a description of the result(s) created by the model*</p>
              <textarea
                className="formQAl"
                type="text"
                placeholder="Result description"
                value={formData.resText}
                onChange={(e) => handleChange(e, "resText")}
              />
            </div>
            <div>
              <p>Do you want to show a supporting figure for this section?</p>
              <div className="flex gap-[15px]">
                <input
                  type="file"
                  id="file-upload4"
                  accept=".png"
                  onChange={(e) => handleChange(e, "resFig")}
                  className="hidden"
                />

                {/* Label acting as the "Browse..." button */}
                <label
                  htmlFor="file-upload4"
                  className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
                >
                  <p>Browse...</p>
                </label>

                <p>Allowed file types: .png</p>
              </div>
            </div>
            <div>
              <p>Do you want the figure uploaded above to have a caption?</p>
              <input
                className="formQAs"
                type="text"
                placeholder="Caption"
                value={formData.resFigDesc}
                onChange={(e) => handleChange(e, "resFigDesc")}
              />
            </div>
            <div className="flex flex-col gap-[25px]">
              <h3>Output boxes</h3>
            </div>
            <div className="flex flex-col gap-[25px]">
              <div>
                <h2>Section 4: Methods behind this model</h2>
                <p
                  className="underline cursor-pointer select-none"
                  onClick={() => togglePopup(4)}
                >
                  Show Example
                </p>
                {examplePopups[4] && (
                  <ExamplePopup
                    nb={4}
                    topPos={2300}
                    togglePopup={togglePopup}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[25px]">
              <div>
                <h2>Section 5: Colofon</h2>
                <p
                  className="underline cursor-pointer select-none"
                  onClick={() => togglePopup(5)}
                >
                  Show Example
                </p>
                {examplePopups[5] && (
                  <ExamplePopup
                    nb={5}
                    topPos={2500}
                    togglePopup={togglePopup}
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
        <CodeSnippet
          title="form data"
          code={JSON.stringify(formData, null, 2)}
        />
        {formData.icon && (
          <div>
            <h2>Preview Icon</h2>
            <p>File ready to be uploaded: {formData.icon.name}</p>
            <p>File Type: {formData.icon.type}</p>
            <p>File Size: {formData.icon.size} bytes</p>

            {/* Display image preview */}
            <img
              src={URL.createObjectURL(formData.icon)} // Create a temporary URL for the uploaded file
              alt="Preview"
              width="100" // Set the desired preview size
              height="100" // Set the desired preview size
            />
          </div>
        )}
        {formData.explanFig && (
          <div>
            {/* Display image preview */}
            <img
              src={URL.createObjectURL(formData.explanFig)} // Create a temporary URL for the uploaded file
              alt="Preview"
              width="100" // Set the desired preview size
              height="100" // Set the desired preview size
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};
