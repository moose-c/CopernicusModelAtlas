import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { FormContent } from "../components/form-content";
import { ExamplePopup } from "../components/form-elements";

import { postModel } from "../services/message.service";

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

  const handleSubmit = (event) => {
    let isMounted = true;

    event.preventDefault();

    const doPost = async (formData) => {
      const { data, error } = postModel(formData);
      console.log(data, error);
      setFormData(blankForm);
    };
    doPost(formData);
    return () => {
      isMounted = false;
    };
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
          <FormContent
            formData={formData}
            setFormData={setFormData}
            examplePopups={examplePopups}
            togglePopup={togglePopup}
          />
          <button
            type="submit"
            className="sticky bottom-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
