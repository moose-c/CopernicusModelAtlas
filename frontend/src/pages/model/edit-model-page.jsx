import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // for dynamic routing

import { PageLayout } from "../../components/page-layout";
import { FormContent } from "./components/form-content";
import { ExamplePopup } from "./components/form-elements";
import { blankForm, mandFields, fieldNameMapping } from "../../util/globalVars";
import { unpackModel } from "../../util/helpFunctions";

import { editModel, getSingleModel } from "../../services/db.service";

import "../../styles/form.css";

export const EditModelPage = () => {
  const { modelId } = useParams(); // Get modelId from URL params
  const [formData, setFormData] = useState(blankForm);

  console.log(formData);
  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const { data, error } = await getSingleModel(modelId);

      if (!isMounted) {
        return;
      }

      if (data) {
        setFormData(unpackModel(data));
      }

      if (error) {
        console.log("error", error);
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  const [examplePopups, setExamplePopups] = useState(Array(6).fill(false));

  const togglePopup = (popupNb) => {
    setExamplePopups((prevState) =>
      prevState.map((val, i) => (i === popupNb ? !val : false))
    );
  };

  const performChecks = (formData, performAll = true) => {
    let check = true;
    if (performAll) {
      if (check === true) {
        // Check if all mandatory fields are filled out

        mandFields.some((mandField) => {
          const value = mandField
            .split(/[\.\[\]\'\"]/) // Split the path
            .filter(Boolean) // Remove empty strings
            .reduce((acc, key) => {
              return acc && acc[key] !== undefined ? acc[key] : undefined;
            }, formData); // Start reducing with formData as the base
          console.log(value);

          if (value === "") {
            // ideally, the alert point to the empty field, flashing it red or something.
            alert(`${fieldNameMapping[mandField]} is empty!`);
            check = false;
            return true;
          }
          // erronious value is empty string
        });
      }
    }

    // checking whether the files are in the correct format. only for the boxes, and then only .csv, .tif, .geojson
    // implement later
    if (check) {
      // console.log("you dont get here right");
    } else if (check) {
      // perform more checks
    }
    return check;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // change false -> true to actually perform
    let check = performChecks(formData, false);

    if (check) {
      const doPost = async (formData) => {
        const { data, error } = editModel(formData, modelId);
        console.log(data, error);
        // setFormData(blankForm);
      };
      doPost(formData);
      return () => {
        isMounted = false;
      };
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
      </div>
      <div>{JSON.stringify(formData, null, 2)}</div>
    </PageLayout>
  );
};
