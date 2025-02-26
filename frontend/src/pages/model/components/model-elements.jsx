import { useModel } from '../view-model-page';
import { Button } from '../../../components/button';
import { DataElement } from './data-vis';

export const Introduction = () => {
    const { modelData } = useModel(); // Automatically gets values
    return (
        <>
            <div id="introduction" className="flex flex-col gap-[20px]">
                <div className="flex gap-[10px] pr-[30px]">
                    <div className="flex flex-col gap-[10px] w-full ">
                        <h1>{modelData.modelName}</h1>
                        <p>{modelData.keywords && modelData.keywords.join(', ')}</p>
                        <p className="top">{modelData.longDescr}</p>
                    </div>
                    <div className="w-[270px] flex flex-col gap-[5px] items-center">
                        <img src={`data:image/png;base64,${modelData.icon}`} alt="Model Icon" className="your-tailwind-classes" />
                        {[...Array(modelData.nbModellers)].map((_, i) => {
                            const nameKey = `modellerName${i}`;
                            const urlKey = `modellerUrl${i}`;

                            return modelData[urlKey] && modelData[urlKey] !== '' ? (
                                <a key={i} href={modelData[urlKey]} target="_blank" rel="noopener noreferrer">
                                    <p>{modelData[nameKey]}</p>
                                </a>
                            ) : (
                                modelData[nameKey] && modelData[nameKey] !== '' && (
                                    <p className="reg" key={i}>
                                        {modelData[nameKey]}
                                    </p>
                                )
                            );
                        })}
                    </div>
                </div>
                <div className="items-center flex flex-col gap-[10px]">
                    <img src={`data:image/png;base64,${modelData.explanFig}`} alt="Model Icon" className="w-full max-w-[400px] h-auto object-contain" />
                    <p className="caption">{modelData.explanFigCaption}</p>
                </div>
                <div className="flex gap-[80px] justify-center">
                    {[...Array(modelData.nbLinks)].map(
                        (_, i) =>
                            modelData[`linkName${i}`] &&
                            modelData[`linkUrl${i}`] && <Button key={i} text={modelData[`linkName${i}`]} to={modelData[`linkUrl${i}`]} />
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
            <div id="theory" className="flex gap-[10px]">
                <div className="w-[80%] flex flex-col gap-[10px]">
                    <h2>Theory</h2>
                    <p className="reg">{modelData.theoryText}</p>
                </div>
                {modelData.theoryFig && (
                    <div className="items-center flex flex-col gap-[10px]">
                        <img src={`data:image/png;base64,${modelData.theoryFig}`} alt="Model Icon" className="w-full max-w-[500px] h-auto object-contain" />
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
            <div id="results" className="flex flex-col gap-[30px]">
                <div className="flex gap-[10px]">
                    <div className="w-[80%] flex flex-col gap-[10px]">
                        <h2>Results</h2>
                        <p className="reg">{modelData.resText}</p>
                    </div>
                    {modelData.resFig && (
                        <div className="items-center flex flex-col gap-[10px]">
                            <img src={`data:image/png;base64,${modelData.resFig}`} alt="Model Icon" className="w-full max-w-[500px] h-auto object-contain" />
                            <p className="caption">{modelData.resFigDesc}</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    {[...Array(modelData.nbBoxes)].map((_, i) => {
                        return (
                            <div key={i} className="border-2 border-copernicusGrey">
                                <div className="flex w-full bg-copernicusGrey px-[30px] py-[10px]">
                                    <p className="ddHeading">{modelData[`boxTitle${i}`]}</p>
                                </div>
                                <div className=" flex gap-[20px] p-5 w-full">
                                    <div className="flex flex-col gap-[20px] p-3 border-2 border-copernicusGrey items-center">
                                        <h3>{modelData[`boxFileTitle${i}`]}</h3>
                                        <div className="">
                                            <DataElement loid={modelData[`boxFile${i}`]} name={modelData[`boxFile${i}Name`]} />
                                        </div>
                                    </div>
                                    <div className="p-3 border-2 border-copernicusGrey w-full">
                                        <p>{modelData[`boxDescr${i}`]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}{' '}
                </div>
            </div>
        </>
    );
};

export const Methods = () => {
    const { modelData } = useModel();
    return (
        <>
            <div id="methods" className="flex flex-col gap-[10px]">
                <div className="w-[80%] flex flex-col gap-[10px]">
                    <h2>Methods</h2>
                    <p className="reg">{modelData.methodsDesc}</p>
                </div>
                {modelData.methodsFile != 0 && (
                    <div className="border-2 border-copernicusGrey pb-10">
                        <div className="flex w-full bg-copernicusGrey px-[30px] py-[10px]">
                            <p className="ddHeading">{modelData.methodsFileCaption}</p>
                        </div>
                        <div className="items-center flex flex-col gap-[10px]">
                            <DataElement loid={modelData.methodsFile} name={modelData.methodsFileName} />
                            <p className="caption">{modelData.methodsFileCaption}</p>
                        </div>
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
            <div id="colofon" className="flex gap-[10px]">
                <div className="w-[80%] flex flex-col gap-[10px]">
                    <h2>Colofon</h2>
                    <p className="reg font-bold">How to Cite: {modelData.colofonCite}</p>
                    <p className="reg">Model Licence: {modelData.colofonLicence}</p>
                    <p className="reg">Additional: {modelData.colofonAddition}</p>
                </div>
            </div>
        </>
    );
};
