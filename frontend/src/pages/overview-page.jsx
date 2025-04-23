import { PageLayout } from '../components/page-layout';
import { useState, useEffect, useContext } from 'react';
import { ModelCards } from './model/components/model-cards';
import { getAllModels, getKeywordModels, getSearchModels } from '../services/db.service';
import Multiselect from 'multiselect-react-dropdown';
import { Searchbar } from '../components/searchbar';
import { keywords } from '../util/globalVars';

export const OverviewPage = ({ editAble }) => {
    const [models, setModels] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchText, setSearchText] = useState(null);
    const [userSelectedKeywords, setUserSelectedKeywords] = useState(null);
    let data, error;

    useEffect(() => {
        const getModels = async () => {
            ({ data, error } = await getAllModels(true));

            if (data) {
                setModels(new Array(data)[0]);
            }

            if (error) {
                setErrorMessage(JSON.stringify(error, null, 2));
            }
        };

        getModels();
    }, []);

    useEffect(() => {
        // get models with keywords
        console.log(userSelectedKeywords);

        const getModels = async () => {
            ({ data, error } = await getKeywordModels(userSelectedKeywords));

            if (data) {
                setModels(new Array(data)[0]);
            }

            if (error) {
                console.log(error);
                setErrorMessage(JSON.stringify(error, null, 2));
            }
        };
        if (userSelectedKeywords != null) {
            getModels();
        }
    }, [userSelectedKeywords]);

    useEffect(() => {
        // get models with searchtext
        console.log(searchText);

        const getModels = async () => {
            ({ data, error } = await getSearchModels(searchText));

            if (data) {
                setModels(new Array(data)[0]);
            }

            if (error) {
                setErrorMessage(JSON.stringify(error, null, 2));
            }
        };

        if (searchText != null) {
            getModels();
        }
    }, [searchText]);

    return (
        <>
            <Helmet>
                <title>
                    {`${modelData.modelName} Copernicus Model Atlas UU Utrecht University` || 'Model Page Copernicus Model Atlas UU Utrecht University'}
                </title>
                <meta name="description" content={modelData.shortDescr || 'Details about this model.'} />
                <meta name="keywords" content={modelData.keywords || ''} />
            </Helmet>
            <PageLayout>
                <div className="content-layout flex gap-5">
                    <h1>Model Atlas</h1>
                    <div>
                        <p className="reg w-[100%]">
                            <strong>Explore the Model Atlas</strong> – a comprehensive online collection of models developed and utilized by the Copernicus
                            Institute of Sustainable Development. Each model has a dedicated page detailing its purpose, underlying theory, and real-world
                            applications. Many model pages also offer interactive features, allowing you to view and download output data. Browse through the
                            Atlas to explore the diverse modeling efforts within our institute and the available datasets!
                        </p>
                    </div>

                    <Searchbar searchText={searchText} setSearchText={setSearchText} />
                    <Multiselect
                        isObject={false}
                        onRemove={(e) => setUserSelectedKeywords(e)}
                        onSelect={(e) => setUserSelectedKeywords(e)}
                        options={keywords}
                        selectedValues={userSelectedKeywords}
                        placeholder="Select Keywords"
                        className="dd w-fit"
                    />
                    {models && <ModelCards models={models} editAble={editAble} />}
                    {errorMessage && <div> {errorMessage}</div>}
                </div>
            </PageLayout>
        </>
    );
};
