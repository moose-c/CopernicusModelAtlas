// ModelPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // for dynamic routing
import { getSingleModel } from "../services/message.service";
import { blankForm } from "../util/globalVars";
import { PageLayout } from "../components/page-layout";
import { Button } from "../components/button";

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
      <PageLayout>
        <div className="content-layout flex gap-5 pb-[20px]">
          <div className="flex flex-col gap-[20px] ">
            <div className="flex gap-[10px] pr-[30px]">
              <div className="flex flex-col gap-[10px] w-full ">
                <h1>{modelData.modelName}</h1>
                <p>{modelData.keywords && modelData.keywords.join(", ")}</p>
                <p className="top">{modelData.descr}</p>
              </div>
              <div className="w-[270px] flex flex-col gap-[5px] items-center">
                <img
                  src={`data:image/png;base64,${modelData.icon}`}
                  alt="Model Icon"
                  className="your-tailwind-classes"
                />
                {[0, 1, 2, 3, 4].map((i) => {
                  const nameKey = `modellerName${i}`;
                  const urlKey = `modellerUrl${i}`;

                  return modelData[urlKey] && modelData[urlKey] !== "" ? (
                    <a
                      key={i}
                      href={modelData[urlKey]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>{modelData[nameKey]}</p>
                    </a>
                  ) : (
                    modelData[nameKey] && modelData[nameKey] !== "" && (
                      <p className="reg" key={i}>
                        {modelData[nameKey]}
                      </p>
                    )
                  );
                })}
              </div>
            </div>
            <div className="items-center flex flex-col gap-[10px]">
              <img
                src={`data:image/png;base64,${modelData.explanFig}`}
                alt="Model Icon"
                className="your-tailwind-classes"
              />
              <p className="caption">{modelData.explanFigCaption}</p>
            </div>
            <div className="flex gap-[80px] justify-center">
              {[0, 1, 2, 3, 4].map(
                (i) =>
                  modelData[`linkName${i}`] &&
                  modelData[`linkUrl${i}`] && (
                    <Button
                      key={i}
                      text={modelData[`linkName${i}`]}
                      to={modelData[`linkUrl${i}`]}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </PageLayout>
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
