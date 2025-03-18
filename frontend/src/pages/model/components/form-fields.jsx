import Multiselect from 'multiselect-react-dropdown';

import { useForm } from './form-content';
import { keywords } from '../../../util/globalVars';
import { ExamplePopup } from './examplePopup';
import { CSVFormatExplanation } from './vis/csvFormatExplanation';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
                    onChange={(e) => handleChange(e.target.value, field)}
                />
            </div>
        </>
    );
};

export const LongTextField = ({ label, field, width, maxWords }) => {
    const { formData, handleChange } = useForm(); // Automatically gets value
    return (
        <>
            <div>
                <p>{label}</p>
                <ReactQuill className={`formQAl ${width}`} value={formData[field]} onChange={(content) => handleChange(content, field)} />
                {maxWords > 0 && formData[field].split(' ').length / maxWords <= 1 && <p>{`Currently: ${formData[field].split(' ').length}/${maxWords}`}</p>}
                {maxWords > 0 && formData[field].split(' ').length / maxWords > 1 && (
                    <p className="text-red-500 font-bold">{`Currently: ${formData[field].split(' ').length}/${maxWords}`}</p>
                )}
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
                    <div key={`${lgen}-${i}`} className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 border-r pr-4 my-2 border-r-black">
                                <p>{l1}</p>
                                <input
                                    className="formQAs"
                                    type="text"
                                    placeholder={p1}
                                    value={formData[`${f1}${i}`]}
                                    onChange={(e) => handleChange(e.target.value, `${f1}${i}`)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>{l2}</p>
                                <input
                                    className="formQAs"
                                    type="text"
                                    placeholder={p2}
                                    value={formData[`${f2}${i}`]}
                                    onChange={(e) => handleChange(e.target.value, `${f2}${i}`)}
                                />
                            </div>
                        </div>
                        {i !== 0 && (
                            <button onClick={() => ch(false, i)} className="w-6 h-6 rounded-full bg-red-500 text-white cursor-pointer text-xs hover:bg-red-700">
                                -
                            </button>
                        )}
                    </div>
                ))}
                <span className="reg underline cursor-pointer select-none" onClick={() => ch()}>
                    {ladd}
                </span>
            </div>
        </>
    );
};

export const FileField = ({ label, field, allowedFileTypes, capField, capText }) => {
    let emptyField;
    if (['methodsFile'].includes(field)) {
        emptyField = 0;
    } else {
        emptyField = '';
    }
    const { formData, handleChange } = useForm(); // Automatically gets values
    return (
        <>
            <div>
                <p>{label}</p>
                <div>
                    <div className="flex gap-[15px]">
                        <input type="file" id={`file-upload-${field}`} accept={allowedFileTypes} onChange={(e) => handleChange(e, field)} className="hidden" />
                        <label htmlFor={`file-upload-${field}`} className="border-2 border-[#D7D7D7] px-2 rounded-lg hover:bg-[#DBDBD8] cursor-pointer">
                            <p>Browse...</p>
                        </label>

                        <p>Allowed file types: {allowedFileTypes}</p>
                    </div>
                    {formData[field] !== '' && formData[field] !== 0 && (
                        <div className="flex items-center justify-between bg-green-100 p-2 rounded-lg">
                            <p className="text-sm text-green-600">{formData[`${field}Name`]}</p>
                            <button onClick={() => handleChange(emptyField, field)} className="ml-4 text-red-600 hover:underline text-sm">
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {['xlsx', 'csv'].includes(formData[`${field}Name`].split('.')[1]) && (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData[`${field}Bar`]}
                                    onChange={(e) => {
                                        handleChange(e.target.checked, `${field}Bar`);
                                    }}
                                />
                            }
                            label="Plot as Bar (empty gives Line)"
                        />
                    </FormGroup>
                )}
                {capField && (
                    <ShortTextField label={capText || 'Do you want the figure uploaded above to have a caption?'} placeholder={'Caption'} field={capField} />
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
                        handleChange(e.target.value, 'keywords');
                    }}
                    onSearch={function noRefCheck() {}}
                    onSelect={(e) => {
                        function noRefCheck() {}
                        handleChange(e.target.value, 'keywords');
                    }}
                    options={keywords}
                    selectedValues={formData['keywords']}
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
        <div>
            {Array.from({ length: nbBoxes }, (_, i) => (
                <div className="border-y border-black pb-2">
                    <div key={`box-${i}`} className="flex justify-between gap-4">
                        <div className="flex flex-col gap-4">
                            <ShortTextField label={`Title of the output box${i === 0 ? '*' : ''}`} placeholder={'Box Title'} field={`boxTitle${i}`} />
                            <ShortTextField label={`Title for output data${i === 0 ? '*' : ''}`} placeholder={'Output Title'} field={`boxFileTitle${i}`} />
                            <FileField label={`Upload output data here${i === 0 ? '*' : ''}`} field={`boxFile${i}`} allowedFileTypes={'.png, .csv, .xlsx'} />

                            <p className="font-bold">n.b. Data needs to match the requirements stated above!</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <LongTextField width="w-[400px]" label={`Description accompanying the figure${i === 0 ? '*' : ''}`} field={`boxDescr${i}`} />
                            </div>
                        </div>
                    </div>
                    <span className="reg underline cursor-pointer select-none" onClick={() => handleChangeNbBoxes()}>
                        Click here to add another output box
                    </span>
                </div>
            ))}
        </div>
    );
};

export const BoxesExplanation = ({ examplePopups, togglePopup }) => {
    return (
        <>
            <p>
                This section gathers information for the boxes showcasing model output. Output data can be shown in the following file types, please click on
                each type to learn the exact format required for that type.
            </p>
            <ul className="reg relative">
                <li key={0}>Figure (.png)</li>
                <li key={1} className="cursor-pointer hover:underline" onClick={() => togglePopup(6)}>
                    Timeseries (.csv, .xlsx)
                </li>
                {examplePopups[6] && <ExamplePopup nb={6} togglePopup={togglePopup} content={<CSVFormatExplanation />} width="w-[600px]" />}
                {/* <li key={2} className="cursor-pointer hover:underline" onClick={() => togglePopup(7)}>
                    Raster map (.tif, .tiff)
                </li>
                {examplePopups[7] && <ExamplePopup nb={7} togglePopup={togglePopup} />}
                <li key={3} className="cursor-pointer hover:underline" onClick={() => togglePopup(8)}>
                    Vector map (.geojson)
                </li> */}
                {/* {examplePopups[8] && <ExamplePopup nb={8} togglePopup={togglePopup} />} */}
            </ul>
        </>
    );
};
