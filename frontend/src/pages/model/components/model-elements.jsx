import { useModel } from '../view-model-page';
import { Button } from '../../../components/button';
import { DataElement } from './vis/data-vis';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { ClickableFigure } from './vis/image';

export const Introduction = () => {
    const { modelData } = useModel(); // Automatically gets values
    return (
        <>
            <div id="introduction" className="flex flex-col gap-[20px]">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-[10px] max-w-[79%] ">
                        <h1>{modelData.modelName}</h1>
                        <p>{modelData.keywords && modelData.keywords.join(', ')}</p>
                        {parse(DOMPurify.sanitize(modelData.shortDescr).replaceAll('<p>', '<p class="top">'))}
                        <div className="flex flex-col items-center">
                            <ClickableFigure fileBin={modelData.explanFig} loc="large" caption={modelData.explanFigCaption} />
                        </div>
                    </div>
                    <div className="max-w-[19%] flex flex-col gap-[5px] items-center">
                        <img src={`data:image/png;base64,${modelData.icon}`} alt="" />
                        <h3>Contact Person(s)</h3>
                        {[...Array(modelData.nbModellers)].map((_, i) => {
                            const nameKey = `modellerName${i}`;
                            const urlKey = `modellerUrl${i}`;

                            return modelData[urlKey] && modelData[urlKey] !== '' ? (
                                <a key={i} href={modelData[urlKey]} target="_blank" rel="noopener noreferrer">
                                    <p className="underline">{modelData[nameKey]}</p>
                                </a>
                            ) : (
                                modelData[nameKey] && modelData[nameKey] !== '' && (
                                    <p className="reg" key={i}>
                                        {modelData[nameKey]}
                                    </p>
                                )
                            );
                        })}
                        <div className="flex flex-col gap-[20px]  pt-4">
                            {[...Array(modelData.nbLinks)].map(
                                (_, i) =>
                                    modelData[`linkName${i}`] &&
                                    modelData[`linkUrl${i}`] && (
                                        <div>
                                            <Button key={i} text={modelData[`linkName${i}`]} to={modelData[`linkUrl${i}`]} />
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Background = () => {
    const { modelData } = useModel(); // Automatically gets values
    return (
        <>
            <h2>Background</h2>
            <div id="theory" className="flex gap-[10px]">
                <div className="w-[80%] flex flex-col gap-[10px]">
                    {parse(DOMPurify.sanitize(modelData.theoryText).replaceAll('<p>', '<p class="reg">'))}
                    {modelData.theoryFig && (
                        <div className="md:hidden flex items-center flex-col gap-[10px]">
                            <ClickableFigure fileBin={modelData.theoryFig} caption={modelData.theoryFigDesc} />
                        </div>
                    )}
                </div>
                {modelData.theoryFig && (
                    <div className="hidden md:flex items-center flex-col gap-[10px]">
                        <ClickableFigure fileBin={modelData.theoryFig} caption={modelData.theoryFigDesc} />
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
            <h2>Explanatory Results</h2>
            <div id="results" className="flex flex-col gap-[30px]">
                <div className="flex gap-[10px]">
                    <div className="w-[80%] flex flex-col gap-[10px]">
                        {parse(DOMPurify.sanitize(modelData.resText).replaceAll('<p>', '<p class="reg">'))}
                        {modelData.resFig && (
                            <div className="md:hidden items-center flex flex-col gap-[10px]">
                                <ClickableFigure fileBin={modelData.resFig} caption={modelData.resFigDesc} />
                            </div>
                        )}
                    </div>
                    {modelData.resFig && (
                        <div className="hidden items-center md:flex flex-col gap-[10px]">
                            <ClickableFigure fileBin={modelData.resFig} caption={modelData.resFigDesc} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    {[...Array(modelData.nbBoxes)].map((_, i) => {
                        if (i % 2 == 0) {
                            return (
                                <div key={i} className="border-2 border-copernicusGrey">
                                    <div className="w-full bg-copernicusGrey px-[30px] py-[10px]">
                                        <p className="ddHeading">{modelData[`boxTitle${i}`]}</p>
                                    </div>
                                    <div className=" flex gap-[20px] p-5 w-full">
                                        <div className="flex flex-col gap-[20px] p-3 border-2 border-copernicusGrey items-center">
                                            <h3>{modelData[`boxFileTitle${i}`]}</h3>
                                            <div className="">
                                                <DataElement
                                                    loid={modelData[`boxFile${i}`]}
                                                    name={modelData[`boxFile${i}Name`]}
                                                    isBar={modelData[`boxFile${i}Bar`]}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-3 hidden lg:block border-2 border-copernicusGrey w-full">
                                            {parse(DOMPurify.sanitize(modelData[`boxDescr${i}`]).replaceAll('<p>', '<p class="reg">'))}
                                        </div>
                                    </div>
                                    <div className="p-3 border-2 block lg:hidden border-copernicusGrey w-full">
                                        {parse(DOMPurify.sanitize(modelData[`boxDescr${i}`]).replaceAll('<p>', '<p class="reg">'))}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={i} className="border-2 border-copernicusGrey">
                                    <div className="flex w-full bg-copernicusGrey px-[30px] py-[10px]">
                                        <p className="ddHeading">{modelData[`boxTitle${i}`]}</p>
                                    </div>
                                    <div className=" flex gap-[20px] p-5 w-full">
                                        <div className="p-3 hidden lg:block border-2 border-copernicusGrey w-full">
                                            {parse(DOMPurify.sanitize(modelData[`boxDescr${i}`]).replaceAll('<p>', '<p class="reg">'))}
                                        </div>
                                        <div className="flex flex-col gap-[20px] p-3 border-2 border-copernicusGrey items-center">
                                            <h3>{modelData[`boxFileTitle${i}`]}</h3>
                                            <div className="">
                                                <DataElement
                                                    loid={modelData[`boxFile${i}`]}
                                                    name={modelData[`boxFile${i}Name`]}
                                                    isBar={modelData[`boxFile${i}Bar`]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 border-2 block lg:hidden border-copernicusGrey w-full">
                                        {parse(DOMPurify.sanitize(modelData[`boxDescr${i}`]).replaceAll('<p>', '<p class="reg">'))}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
};

export const Methods = () => {
    const { modelData } = useModel();
    return (
        <>
            {modelData.methodsDesc && (
                <>
                    <h2>Methods</h2>
                    <div id="methods" className="flex flex-col gap-[10px]">
                        <div className="w-[80%] flex flex-col gap-[10px]">
                            {parse(DOMPurify.sanitize(modelData.methodsDesc).replaceAll('<p>', '<p class="reg">'))}
                        </div>
                        {modelData.methodsFile != 0 && (
                            <div className="flex flex-col items-center">
                                <ClickableFigure fileBin={modelData.methodsFile} loc="large" caption={modelData.methodsFileCaption} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export const MoreInformation = () => {
    const { modelData } = useModel(); // Automatically gets values
    return (
        <>
            {(modelData.colofonCite || modelData.colofonAddition || modelData.colofonLicence) && (
                <>
                    <div id="colofon" className="flex gap-[10px]">
                        <div className="w-[80%] flex flex-col gap-[10px]">
                            <h2>More Information</h2>
                            <p className="reg font-bold">References: </p>{' '}
                            {parse(DOMPurify.sanitize(modelData.colofonCite).replaceAll('<p>', '<p class="reg font-bold">'))}
                            <p className="reg">Model Licence: {modelData.colofonLicence}</p>
                            {parse(DOMPurify.sanitize(modelData.colofonAddition).replaceAll('<p>', '<p class="reg">'))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
