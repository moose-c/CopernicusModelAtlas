import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

import { keywords } from "../util/globalVars";
import { ExamplePopup } from "../components/form-elements";

export const FormContent = ({
  formData,
  setFormData,
  examplePopups,
  togglePopup,
}) => {
  const [nbModellers, setNbModellers] = useState(1);
  const [nbLinks, setNbLinks] = useState(1);
  const [nbBoxes, setNbBoxes] = useState(1);

  const blankBox = {
    title: "",
    figTitle: "",
    fig: "",
    desc: "",
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
        "methodsDesc",
        "colofonCite",
        "colofonLicence",
        "colofonAddition",
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
    } else if (["modellers", "links", "boxes"].includes(q)) {
      const newValue = addVar2 === "fig" ? e.target.files[0] : e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        [q]: prevState[q].map((entry, index) =>
          index === addVar1 ? { ...entry, [addVar2]: newValue } : entry
        ),
      }));
    } else if (
      ["icon", "explanFig", "theoryFig", "resFig", "methodsFile"].includes(q)
    ) {
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

  const handleChangeNbBoxes = (add = true, i = undefined) => {
    if (add) {
      if (nbBoxes < 5) {
        setNbBoxes((prevState) => prevState + 1); // Increment the number of modellers
        setFormData((prevState) => ({
          ...prevState,
          boxes: [...prevState.boxes, { ...blankBox }],
        }));
      } else {
        alert("Only 4 boxes allowed!"); // Show a popup when trying to exceed the limit
      }
    } else {
      setNbBoxes((prevState) => prevState - 1); // Increment the number of modellers
      setFormData((prevState) => ({
        ...prevState,
        boxes: prevState.boxes.filter((_, index) => index !== i),
      }));
    }
  };
  return (
    <>
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
            <div
              key={`modeller-${i}`}
              className="flex justify-between items-center"
            >
              <div className="flex gap-16">
                <div className="flex gap-2">
                  <p>Full name: *</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="Firstname Lastname"
                    value={formData.modellers[i].name}
                    onChange={(e) => handleChange(e, "modellers", i, "name")}
                  />
                </div>
                <p> | </p>
                <div className="flex gap-2">
                  <p>URL to personal page: </p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="www.firstname-lastname.org"
                    value={formData.modellers[i].url}
                    onChange={(e) => handleChange(e, "modellers", i, "url")}
                  />
                </div>
              </div>
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
          <span
            className="reg underline cursor-pointer select-none"
            onClick={() => handleChangeNbModellers()}
          >
            Click here to add another name
          </span>
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
            Do you want to link to other sites or files? (eg. github, dataverse,
            own page)
          </p>
          {Array.from({ length: nbLinks }, (_, i) => (
            <div
              key={`link-${i}`}
              className="flex justify-between items-center"
            >
              <div className="flex gap-16">
                <div className="flex gap-2">
                  <p>Button text: </p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="eg. Github"
                    value={formData.links[i].buttonText}
                    onChange={(e) => handleChange(e, "links", i, "buttonText")}
                  />
                </div>

                <p> | </p>
                <div className="flex gap-2">
                  <p>URL: </p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="www.github.com/this-model"
                    value={formData.links[i].url}
                    onChange={(e) => handleChange(e, "links", i, "url")}
                  />
                </div>
              </div>
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
          <span
            className="underline cursor-pointer select-none reg"
            onClick={() => handleChangeNbButtons()}
          >
            Click here to add another button
          </span>
        </div>
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
          <div>
            <p>
              This section gathers information for the boxes showcasing model
              output. Output data can be shown in the following formats:
              <b>Insuffusiently explained</b>
            </p>
            <ul className="reg">
              <li key={0}>Figure (.png, ...)</li>
              <li key={1}>Timeseries (.csv)</li>
              <li key={3}>Raster map (.tif)</li>
              <li key={4}>Vector map (.geojson)</li>
            </ul>

            {Array.from({ length: nbBoxes }, (_, i) => (
              <div
                key={`box-${i}`}
                className="flex justify-between border-y border-black pb-2 gap-2"
              >
                <div className="flex flex-col">
                  <p>Title of the Output Box{i == 0 && "*"}</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="Box Title"
                    value={formData.boxes[i].title}
                    onChange={(e) => handleChange(e, "boxes", i, "title")}
                  />
                  <p>Description accompanying the figure{i == 0 && "*"}</p>
                  <textarea
                    className="formQAl"
                    type="text"
                    placeholder="Enter a Description"
                    value={formData.boxes[i].desc}
                    onChange={(e) => handleChange(e, "boxes", i, "desc")}
                  />
                </div>
                <div className="flex flex-col">
                  <p>Title for output data{i == 0 && "*"}</p>
                  <input
                    className="formQAs"
                    type="text"
                    placeholder="Output Title"
                    value={formData.boxes[i].figTitle}
                    onChange={(e) => handleChange(e, "boxes", i, "figTitle")}
                  />
                  <p>Upload output data here{i == 0 && "*"}</p>
                  <div className="flex gap-[15px]">
                    <input
                      type="file"
                      id={`file-upload${5 + i}`}
                      accept=".png, .csv, .tif, .geojson"
                      onChange={(e) => handleChange(e, "boxes", i, "fig")}
                      className="hidden"
                    />

                    {/* Label acting as the "Browse..." button */}
                    <label
                      htmlFor={`file-upload${5 + i}`}
                      className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
                    >
                      <p>Browse...</p>
                    </label>

                    <p>Allowed file types: .png, .csv, .tif, .geojson</p>
                  </div>
                  <p>
                    n.b. Only data matching the requirements stated above can be
                    shown!
                  </p>
                </div>

                {i !== 0 && (
                  <button
                    onClick={() => handleChangeNbBoxes(false, i)}
                    className="w-6 h-6 rounded-full bg-red-500 text-white cursor-pointer text-xs hover:bg-red-700 m-1"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <span
              className="reg underline cursor-pointer select-none"
              onClick={() => handleChangeNbBoxes()}
            >
              Click here to add another output box
            </span>
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
          <div>
            <p>Description of the model itself</p>
            <textarea
              className="formQAl"
              type="text"
              placeholder="Enter a description"
              value={formData.methodsDesc}
              onChange={(e) => handleChange(e, "methodsDesc")}
            />
          </div>
          <div>
            <p>Upload output data here</p>
            <div className="flex gap-[15px]">
              <input
                type="file"
                id={`methods-file-upload`}
                accept=".csv, .tif, .geojson"
                onChange={(e) => handleChange(e, "methodsFile")}
                className="hidden"
              />

              {/* Label acting as the "Browse..." button */}
              <label
                htmlFor={`methods-file-upload`}
                className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
              >
                <p>Browse...</p>
              </label>

              <p>Allowed file types: .csv, .tif, .geojson</p>
            </div>
          </div>
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
          <div>
            <p>How should people cite this model?*</p>
            <input
              className="formQAs"
              type="text"
              placeholder="How to cite"
              value={formData.colofonCite}
              onChange={(e) => handleChange(e, "colofonCite")}
            />
          </div>
          <div>
            <p>
              Enter a licence* <b>Explain but what does this even mean?</b>
            </p>
            <input
              className="formQAs"
              type="text"
              placeholder="Enter licence"
              value={formData.colofonLicence}
              onChange={(e) => handleChange(e, "colofonLicence")}
            />
          </div>
          <div>
            <p>Do you want to include additional information in the Colofon?</p>
            <textarea
              className="formQAl"
              type="text"
              placeholder="Model Description"
              value={formData.colofonAddition}
              onChange={(e) => handleChange(e, "colofonAddition")}
            />
          </div>
        </div>
      </div>
    </>
  );
};
