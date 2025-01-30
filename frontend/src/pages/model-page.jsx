// ModelPage.jsx
import React, { useEffect, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom"; // for dynamic routing
import { getSingleModel } from "../services/message.service";
import { blankForm } from "../util/globalVars";
import { PageLayout } from "../components/page-layout";
import {
  Introduction,
  Theory,
  Results,
  Methods,
  Colofon,
} from "../components/model-elements";

const ModelContext = createContext();
export const useModel = () => useContext(ModelContext);

export const ModelPage = () => {
  const { modelId } = useParams(); // Get modelId from URL params
  const [modelResponse, setModelResponse] = useState([]);
  const [modelData, setModelData] = useState({});

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const { data, error } = await getSingleModel(modelId);

      if (!isMounted) {
        return;
      }

      if (data) {
        setModelResponse(new Array(data)[0]);
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

  useEffect(() => {
    setModelData(unpackModel(modelResponse));
  }, [modelResponse]);
  return (
    <>
      <ModelContext.Provider value={{ modelData }}>
        <PageLayout>
          <div className="content-layout flex gap-5 pb-[20px]">
            <Introduction />
            <Theory />
            <Results />
            <Methods />
            <Colofon />
          </div>
        </PageLayout>
      </ModelContext.Provider>
    </>
  );
};

const unpackModel = (modelResponse) => {
  // remove id
  modelResponse = modelResponse.slice(1);
  console.log(modelResponse);

  const dictKeys = Object.keys(blankForm);
  const modelData = dictKeys.reduce((acc, key, index) => {
    acc[key] = modelResponse[index]; // Assign corresponding value from modelData to each key in blankForm
    return acc;
  }, {});
  console.log(modelData);
  return modelData;
};
