import { useModel } from "../pages/model-page";
import { Button } from "./button";

export const Introduction = () => {
  const { modelData } = useModel(); // Automatically gets values
  return (
    <>
      <div className="flex flex-col gap-[20px]">
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
    </>
  );
};

export const Theory = () => {
  const { modelData } = useModel(); // Automatically gets values
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="w-[80%] flex gap-[10px]">
          <h2>Theory</h2>
          <p className="reg">{modelData.theoryText}</p>
        </div>
        {modelData.theoryFig && (
          <div className="items-center flex flex-col gap-[10px]">
            <img
              src={`data:image/png;base64,${modelData.theoryFig}`}
              alt="Model Icon"
              className="your-tailwind-classes"
            />
            <p className="caption">{modelData.theoryFigDesc}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const Results = () => {
  const { modelData } = useModel(); // Automatically gets values
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="w-[80%] flex gap-[10px]">
          <h2>Theory</h2>
          <p className="reg">{modelData.theoryText}</p>
        </div>
        {modelData.theoryFig && (
          <div className="items-center flex flex-col gap-[10px]">
            <img
              src={`data:image/png;base64,${modelData.theoryFig}`}
              alt="Model Icon"
              className="your-tailwind-classes"
            />
            <p className="caption">{modelData.theoryFigDesc}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const Methods = () => {
  const { modelData } = useModel(); // Automatically gets values
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="w-[80%] flex gap-[10px]">
          <h2>Theory</h2>
          <p className="reg">{modelData.theoryText}</p>
        </div>
        {modelData.theoryFig && (
          <div className="items-center flex flex-col gap-[10px]">
            <img
              src={`data:image/png;base64,${modelData.theoryFig}`}
              alt="Model Icon"
              className="your-tailwind-classes"
            />
            <p className="caption">{modelData.theoryFigDesc}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const Colofon = () => {
  const { modelData } = useModel(); // Automatically gets values
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="w-[80%] flex gap-[10px]">
          <h2>Theory</h2>
          <p className="reg">{modelData.theoryText}</p>
        </div>
        {modelData.theoryFig && (
          <div className="items-center flex flex-col gap-[10px]">
            <img
              src={`data:image/png;base64,${modelData.theoryFig}`}
              alt="Model Icon"
              className="your-tailwind-classes"
            />
            <p className="caption">{modelData.theoryFigDesc}</p>
          </div>
        )}
      </div>
    </>
  );
};
