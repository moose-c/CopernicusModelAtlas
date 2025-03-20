import { createContext, useContext } from 'react';

import { ExamplePopup } from './examplePopup';
import { ShortTextField, LongTextField, FileField, TwoField, BoxesField, KeyWordsField, BoxesExplanation } from './form-fields';

const FormContext = createContext();
export const useForm = () => useContext(FormContext);

export const FormContent = ({ formData, setFormData, examplePopups, togglePopup }) => {
    const handleChange = (e, q) => {
        if (['icon', 'explanFig', 'theoryFig', 'resFig'].includes(q)) {
            if (e == '') {
                setFormData((prevState) => {
                    const updatedState = {
                        ...prevState,
                        [q]: '',
                        [`${q}Name`]: '',
                    };

                    return updatedState;
                });
            } else {
                // obtain bytea ready content
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1]; // Strip metadata
                    setFormData((prevState) => ({
                        ...prevState,
                        [q]: base64String, // Send pure Base64 string
                        [`${q}Name`]: file.name,
                    }));
                };
            }
        } else if (['methodsFile'].includes(q) || q.slice(0, -1) === 'boxFile') {
            if (['', 0].includes(e)) {
                setFormData((prevState) => {
                    const updatedState = {
                        ...prevState,
                        [q]: e, // Always set q to an empty string or 0
                        [`${q}Name`]: '',
                    };

                    return updatedState;
                });
            } else {
                console.log(q);
                const file = e.target.files[0];
                setFormData((prevState) => {
                    const updatedState = {
                        ...prevState,
                        [q]: file, // Always set q to an empty string
                        [`${q}Name`]: file.name,
                    };

                    return updatedState;
                });
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [q]: e,
            }));
        }
    };

    const handleChangeNbModellers = (add = true, i = undefined) => {
        if (add) {
            if (formData['nbModellers'] < 5) {
                setFormData((prevState) => ({
                    ...prevState,
                    ['nbModellers']: prevState['nbModellers'] + 1,
                }));
            } else {
                alert('Only 5 modellers allowed!'); // Show a popup when trying to exceed the limit
            }
        } else {
            setFormData((prevState) => {
                const updatedState = { ...prevState };

                // Shift modellerName and modellerUrl for all indices j > i up to 5
                for (let j = i + 1; j <= 4; j++) {
                    updatedState[`modellerName${j - 1}`] = prevState[`modellerName${j}`] || '';
                    updatedState[`modellerUrl${j - 1}`] = prevState[`modellerUrl${j}`] || '';
                }

                // Clear the last modellerName and modellerUrl after the shift
                updatedState[`modellerName4`] = '';
                updatedState[`modellerUrl4`] = '';

                updatedState[`nbModellers`] = prevState[`nbModellers`] - 1;
                return updatedState;
            });
        }
    };

    const handleChangeNbButtons = (add = true, i = undefined) => {
        if (add) {
            if (formData['nbLinks'] < 5) {
                setFormData((prevState) => ({
                    ...prevState,
                    ['nbLinks']: prevState['nbLinks'] + 1,
                }));
            } else {
                alert('Only 5 links allowed!'); // Show a popup when trying to exceed the limit
            }
        } else {
            setFormData((prevState) => {
                const updatedState = { ...prevState };

                // Shift linkName and linkUrl for all indices j > i up to 5
                for (let j = i + 1; j <= 4; j++) {
                    updatedState[`linkName${j - 1}`] = prevState[`linkName${j}`] || '';
                    updatedState[`linkUrl${j - 1}`] = prevState[`linkUrl${j}`] || '';
                }

                // Clear the last linkName and linkUrl after the shift
                updatedState[`linkName4`] = '';
                updatedState[`linkUrl4`] = '';

                updatedState[`nbLinks`] = prevState[`nbLinks`] - 1;

                return updatedState;
            });
        }
    };

    const handleChangeNbBoxes = (add = true, i = undefined) => {
        if (add) {
            if (formData['nbBoxes'] < 8) {
                setFormData((prevState) => ({
                    ...prevState,
                    ['nbBoxes']: prevState['nbBoxes'] + 1,
                }));
            } else {
                alert('Only 8 boxes allowed!'); // Show a popup when trying to exceed the limit
            }
        } else {
            setFormData((prevState) => {
                const updatedState = { ...prevState };

                // Shift boxTitle, boxFigTitle, boxfig, and boxDescr for all indices j > i up to 8
                for (let j = i + 1; j < 8; j++) {
                    updatedState[`boxTitle${j - 1}`] = prevState[`boxTitle${j}`] || '';
                    updatedState[`boxFileTitle${j - 1}`] = prevState[`boxFileTitle${j}`] || '';
                    updatedState[`boxDescr${j - 1}`] = prevState[`boxDescr${j}`] || '';
                    updatedState[`boxFile${j - 1}`] = prevState[`boxFile${j}`] || 0;
                    updatedState[`boxFile${j - 1}Name`] = prevState[`boxFile${j}Name`] || '';
                    updatedState[`boxFile${j - 1}Bar`] = prevState[`boxFile${j}Bar`] || false;
                }

                // Clear the last boxTitle, boxFigTitle, boxfig, and boxDescr after the shift
                updatedState[`boxTitle7`] = '';
                updatedState[`boxFileTitle7`] = '';
                updatedState[`boxDescr7`] = '';
                updatedState[`boxFile7`] = 0;
                updatedState[`boxFile7Name`] = '';
                updatedState[`boxFile7Bar`] = false;

                updatedState[`nbBoxes`] = prevState[`nbBoxes`] - 1;

                return updatedState;
            });
        }
    };

    return (
        <>
            <FormContext.Provider value={{ formData, handleChange }}>
                <div className="flex flex-col gap-[25px]">
                    <div className="relative">
                        <h2 id="introduction">Section 1: Introduction to the Model</h2>
                        <p className="underline cursor-pointer select-none" onClick={() => togglePopup(1)}>
                            Show Example
                        </p>
                        {examplePopups[1] && <ExamplePopup nb={1} togglePopup={togglePopup} />}
                    </div>
                    <ShortTextField label={"Enter the name of your model.* Don't use _, /, & or #."} placeholder={'Enter Model Name'} field={'modelName'} />
                    <KeyWordsField />
                    <TwoField
                        lgen={'Contact person(s)'}
                        nb={formData['nbModellers']}
                        ch={handleChangeNbModellers}
                        l1={'Full name: *'}
                        f1={'modellerName'}
                        p1={'Firstname Lastname'}
                        l2={'URL to personal page: '}
                        f2={'modellerUrl'}
                        p2={'www.firstname-lastname.org'}
                        ladd={'Click here to add another name'}
                    />
                    <LongTextField field={'shortDescr'} maxWords={65}>
                        Enter a short description of your model to display on the home page* (max 100 words){' '}
                    </LongTextField>
                    <FileField label={'Do you have a picture/icon for your model?'} field={'icon'} allowedFileTypes={'.png'} />
                    <LongTextField field={'longDescr'}>
                        {' '}
                        Enter a longer description of your model. (If left empty defaults to the short description entered above)
                    </LongTextField>
                    <FileField
                        label={'Upload an explanatory or output figure for your model*'}
                        field={'explanFig'}
                        allowedFileTypes={'.pngg'}
                        capField={'explanFigCaption'}
                    />
                    <TwoField
                        lgen={'Do you want to link to other sites or files? (eg. github, dataverse, own page'}
                        nb={formData['nbLinks']}
                        ch={handleChangeNbButtons}
                        l1={'Button text: '}
                        f1={'linkName'}
                        p1={'eg. Github'}
                        l2={'URL'}
                        f2={'linkUrl'}
                        p2={'e.g. www.github.com/this-model'}
                        ladd={'Click here to add another button'}
                    />
                </div>

                <div className="flex flex-col gap-[25px]">
                    <div className="relative">
                        <h2 id="theory">Section 2: Theory behind the model</h2>
                        <p className="underline cursor-pointer select-none" onClick={() => togglePopup(2)}>
                            Show Example
                        </p>
                        {examplePopups[2] && <ExamplePopup nb={2} togglePopup={togglePopup} />}
                    </div>
                    <LongTextField field={'theoryText'}>Enter some theory or applications of your model* </LongTextField>
                    <FileField
                        label={'Do you want to show a supporting figure for this section?'}
                        field={'theoryFig'}
                        allowedFileTypes={'.png'}
                        capField={'theoryFigDesc'}
                    />
                </div>
                <div className="flex flex-col gap-[25px]">
                    <div className="relative">
                        <h2 id="results">Section 3: Results from this model</h2>
                        <p className="underline cursor-pointer select-none" onClick={() => togglePopup(3)}>
                            Show Example
                        </p>
                        {examplePopups[3] && <ExamplePopup nb={3} togglePopup={togglePopup} />}
                    </div>
                    <LongTextField field={'resText'}>Enter a description of the result(s) created by the model* </LongTextField>
                    <FileField
                        label={'Do you want to show a supporting figure for this section?'}
                        field={'resFig'}
                        allowedFileTypes={'.png'}
                        capField={'resFigDesc'}
                    />
                    <div className="flex flex-col gap-[25px]">
                        <h3>Output boxes</h3>
                        <BoxesExplanation examplePopups={examplePopups} togglePopup={togglePopup} />
                        <BoxesField nbBoxes={formData['nbBoxes']} handleChangeNbBoxes={handleChangeNbBoxes} />
                    </div>
                    <div className="flex flex-col gap-[25px]">
                        <div className="relative">
                            <h2 id="methods">Section 4: Methods behind this model</h2>
                            <p className="underline cursor-pointer select-none" onClick={() => togglePopup(4)}>
                                Show Example
                            </p>
                            {examplePopups[4] && <ExamplePopup nb={4} togglePopup={togglePopup} />}
                        </div>
                        <LongTextField field={'methodsDesc'}>Description of the model itself</LongTextField>
                        <FileField
                            label={'Upload methods data here'}
                            field={'methodsFile'}
                            allowedFileTypes={'.png, .csv, .xlsx'}
                            capField={'methodsFileCaption'}
                            capText={'Enter a title for this data field'}
                        />
                    </div>
                    <div className="flex flex-col gap-[25px]">
                        <div className="relative">
                            <h2 id="colofon">Section 5: Colofon</h2>
                            <p className="underline cursor-pointer select-none" onClick={() => togglePopup(5)}>
                                Show Example
                            </p>
                            {examplePopups[5] && <ExamplePopup nb={5} togglePopup={togglePopup} />}
                        </div>
                        <ShortTextField label={'Do you want to add references?'} placeholder={'How to cite'} field={'colofonCite'} />
                        <ShortTextField label={'Do want to add a model licence?'} placeholder={'Enter licence'} field={'colofonLicence'} />
                        <LongTextField field={'colofonAddition'}>Do you want to include additional information in the Colofon? </LongTextField>
                    </div>
                </div>
            </FormContext.Provider>
        </>
    );
};
