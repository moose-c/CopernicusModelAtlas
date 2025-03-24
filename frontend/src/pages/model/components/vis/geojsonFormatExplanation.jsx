import { useState } from 'react';

export const GeoJsonFormatExplanation = () => {
    const geojsonExample = {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [102.0, 0.5] }, properties: { popupInformation: 'A name' } },
            {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [102.0, 0.0],
                        [103.0, 1.0],
                        [104.0, 0.0],
                        [105.0, 1.0],
                    ],
                },
                properties: {
                    popupInformation: 'A name',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [100.0, 0.0],
                            [101.0, 0.0],
                            [101.0, 1.0],
                            [100.0, 1.0],
                            [100.0, 0.0],
                        ],
                    ],
                },
                properties: {
                    popupInformation: 'A name',
                },
            },
        ],
    };
    // Define state to track the active tab
    const [activeTab, setActiveTab] = useState('text');

    return (
        <div className="p-2">
            <h1>GeoJson Format Explanation</h1>

            {/* Tabs */}
            <div className="flex mb-0">
                <button
                    type="button"
                    className={`px-4 rounded-tl-lg rounded-tr-lg text-sm font-medium ${
                        activeTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('text')}
                >
                    Text
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-tl-lg rounded-tr-lg text-sm font-medium ml-2 ${
                        activeTab === 'example' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('example')}
                >
                    Example
                </button>
                {/* Add more tabs as needed */}
            </div>

            {/* Tab content */}
            <div className="border border-t-0 rounded-b-lg p-4 bg-gray-50">
                {activeTab === 'text' && (
                    <div className="max-h-[60vh] overflow-auto">
                        <p>Any valid geojson file will be displayed as an interactible map. </p>
                        <p>To allow users to click on features, information needs to be included in the "popupInformation" property.</p>
                    </div>
                )}

                {activeTab === 'example' && (
                    <>
                        <div className="overflow-auto max-h-[60vh]">
                            <h2 className="text-xl font-semibold mb-2">Example</h2>
                            <p>Here is an example of what a Geojson might look like:</p>
                            <pre className="bg-gray-200 text-sm p-4 rounded-lg overflow-x-auto font-mono text-gray-800">
                                <code>{JSON.stringify(geojsonExample, null, 2)}</code>
                            </pre>
                        </div>
                    </>
                )}
                {/* Add more tab content sections as needed */}
            </div>
        </div>
    );
};
