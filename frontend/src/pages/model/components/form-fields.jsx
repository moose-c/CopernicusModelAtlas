import Multiselect from "multiselect-react-dropdown";

import { useForm } from "./form-content";
import { keywords } from "../../../util/globalVars";

export const ShortTextField = ({ label, placeholder, field }) => {
  const { formData, handleChange } = useForm(); // Automatically gets values
  return (
    <>
      <div>
        <p>{label}</p>
        <input
          className="formQAs"
          type="text"
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleChange(e, field)}
        />
      </div>
    </>
  );
};

export const LongTextField = ({ label, placeholder, field }) => {
  const { formData, handleChange } = useForm(); // Automatically gets value
  return (
    <>
      <div>
        <p>{label}</p>
        <textarea
          className="formQAl"
          type="text"
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleChange(e, field)}
        />
      </div>
    </>
  );
};

export const TwoField = ({ lgen, nb, ch, l1, f1, p1, l2, f2, p2, ladd }) => {
  const { formData, handleChange } = useForm(); // Automatically gets values
  return (
    <>
      <div>
        <p>{lgen}</p>
        {Array.from({ length: nb }, (_, i) => (
          <div
            key={`${lgen}-${i}`}
            className="flex justify-between items-center"
          >
            <div className="flex gap-16">
              <div className="flex gap-2">
                <p>{l1}</p>
                <input
                  className="formQAs"
                  type="text"
                  placeholder={p1}
                  value={formData[`${f1}${i}`]}
                  onChange={(e) => handleChange(e, `${f1}${i}`)}
                />
              </div>
              <p> | </p>
              <div className="flex gap-2">
                <p>{l2}</p>
                <input
                  className="formQAs"
                  type="text"
                  placeholder={p2}
                  value={formData[`${f2}${i}`]}
                  onChange={(e) => handleChange(e, `${f2}${i}`)}
                />
              </div>
            </div>
            {i !== 0 && (
              <button
                onClick={() => ch(false, i)}
                className="w-6 h-6 rounded-full bg-red-500 text-white cursor-pointer text-xs hover:bg-red-700"
              >
                -
              </button>
            )}
          </div>
        ))}
        <span
          className="reg underline cursor-pointer select-none"
          onClick={() => ch()}
        >
          {ladd}
        </span>
      </div>
    </>
  );
};

export const FileField = ({ label, field, allowedFileTypes, capField }) => {
  let emptyField;
  if (["methodsFile"].includes(field)) {
    emptyField = 0;
  } else {
    emptyField = "";
  }
  const { formData, handleChange } = useForm(); // Automatically gets values
  return (
    <>
      <div>
        <p>{label}</p>
        <div className="flex gap-[15px]">
          <input
            type="file"
            id={`file-upload-${field}`}
            accept=".png, .svg"
            onChange={(e) => handleChange(e, field)}
            className="hidden"
          />
          <label
            htmlFor={`file-upload-${field}`}
            className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
          >
            <p>Browse...</p>
          </label>

          <p>Allowed file types: {allowedFileTypes}</p>

          {formData[field] !== "" && formData[field] !== 0 && (
            <div className="flex items-center justify-between bg-green-100 p-2 rounded-lg">
              <p className="text-sm text-green-600">{formData[field].name}</p>
              <button
                onClick={() => handleChange(emptyField, field)}
                className="ml-4 text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        {capField && (
          <ShortTextField
            label={"Do you want the figure uploaded above to have a caption?"}
            placeholder={"Caption"}
            field={capField}
          />
        )}
      </div>
    </>
  );
};

export const KeyWordsField = () => {
  const { formData, handleChange } = useForm(); // Automatically gets values
  return (
    <>
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
          selectedValues={formData["keywords"]}
          placeholder="Select Keywords"
          className="formQAs bg-white m-0 p-0 border-0"
        />
      </div>
    </>
  );
};

export const BoxesField = ({ nbBoxes, handleChangeNbBoxes }) => {
  const { formData, handleChange } = useForm(); // Automatically gets values
  return (
    <>
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
              value={formData[`boxTitle${i}`]}
              onChange={(e) => handleChange(e, `boxTitle${i}`)}
            />
            <p>Description accompanying the figure{i == 0 && "*"}</p>
            <textarea
              className="formQAl"
              type="text"
              placeholder="Enter a Description"
              value={formData[`boxDescr${i}`]}
              onChange={(e) => handleChange(e, `boxDescr${i}`)}
            />
          </div>
          <div className="flex flex-col">
            <p>Title for output data{i == 0 && "*"}</p>
            <input
              className="formQAs"
              type="text"
              placeholder="Output Title"
              value={formData[`boxFigTitle${i}`]}
              onChange={(e) => handleChange(e, `boxFigTitle${i}`)}
            />
            <p>Upload output data here{i == 0 && "*"}</p>
            <div className="flex gap-[15px]">
              <input
                type="file"
                id={`file-upload${5 + i}`}
                accept=".png, .csv, .tif, .geojson, .nc"
                onChange={(e) => handleChange(e, `boxFile${i}`)}
                className="hidden"
              />

              {/* Label acting as the "Browse..." button */}
              <label
                htmlFor={`file-upload${5 + i}`}
                className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer"
              >
                <p>Browse...</p>
              </label>

              <p>Allowed file types: .png, .csv, .tif, .geojson, .nc</p>
            </div>
            {formData[`boxFile${i}`] !== 0 && (
              <div className="flex items-center justify-between bg-green-100 p-2 rounded-lg">
                <p className="text-sm text-green-600">
                  {formData[`boxFile${i}`].name}
                </p>
                <button
                  onClick={() => handleChange(0, `boxFile${i}`)}
                  className="ml-4 text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            )}
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
    </>
  );
};
