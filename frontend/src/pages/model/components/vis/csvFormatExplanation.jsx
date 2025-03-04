import { useState } from 'react';

export const CSVFormatExplanation = () => {
    // Define state to track the active tab
    const [activeTab, setActiveTab] = useState('text');

    // Handle tab switch
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="p-2">
            <h1>CSV Format Explanation</h1>

            {/* Tabs */}
            <div className="flex mb-0">
                <button
                    className={`px-4 rounded-tl-lg rounded-tr-lg text-sm font-medium ${
                        activeTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => handleTabChange('text')}
                >
                    Text
                </button>
                <button
                    className={`px-4 py-2 rounded-tl-lg rounded-tr-lg text-sm font-medium ml-2 ${
                        activeTab === 'example' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => handleTabChange('example')}
                >
                    Example
                </button>
                {/* Add more tabs as needed */}
            </div>

            {/* Tab content */}
            <div className="border border-t-0 rounded-b-lg p-4 bg-gray-50">
                {activeTab === 'text' && (
                    <div className="max-h-[60vh] overflow-auto">
                        <p>The first row contains the names of input and output variables in the following way:</p>
                        <ul className="list-disc pl-5">
                            <li>
                                The first column is the first input variable and is titled <strong>"time"</strong>.
                            </li>
                            <li>
                                The second column can contain a second input variable (e.g., <em>"region"</em>) or is left empty.
                            </li>
                            <li>
                                The third column can contain a third input variable (e.g., <em>"scenario"</em>) or is left empty.
                            </li>
                            <li>After the first three columns, each subsequent column title represents the name of an output variable.</li>
                        </ul>
                        <br />
                        <p>
                            The second row contains units for each variable including the brackets such as [mg/l]. The first 'time' column doesn't need a unit
                            and can be left empty.
                        </p>
                        <br />
                        <p>
                            From the third row onwards, each row contains values of input and corresponding output variables. These can be numbers or strings as
                            you see fit, except for the cells in the 'time' column which need to be instances of an Excel Date or in a{' '}
                            <a className="underline text-blue-500" href="https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format">
                                date-time string format
                            </a>
                            .
                        </p>
                    </div>
                )}

                {activeTab === 'example' && (
                    <>
                        <h2 className="text-xl font-semibold mb-2">Example</h2>
                        <p>Here is an example of what the CSV format might look like with two input variables:</p>
                        <pre className="bg-gray-200 p-4 rounded-lg mt-2 font-mono">
                            {`Time ,Region ,,Temp  ,CO2 emission, CH4 emission
     ,       ,,[°C]  , [Mt]       , [Mt]
2023 ,Europe ,,10.5  , 3500       , 22
2023 ,Asia   ,,12.3  , 17000      , 110`}
                            {/*      ,       ,,false , true       , true */}
                        </pre>
                    </>
                )}
                {/* Add more tab content sections as needed */}
            </div>
        </div>
    );
};
