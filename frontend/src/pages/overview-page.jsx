import { PageLayout } from '../components/page-layout';
import { useState, useEffect, useContext } from 'react';
import { ModelCards } from './model/components/model-cards';
import { getAllModels, getUserModels } from '../services/db.service';
import Multiselect from 'multiselect-react-dropdown';
import { Searchbar } from '../components/searchbar';
import { keywords } from '../util/globalVars';
import { AuthContext } from '..';

export const OverviewPage = ({ editAble }) => {
    const [models, setModels] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getMessage = async () => {
            let data, error;
            if (!editAble) {
                ({ data, error } = await getAllModels());
            } else {
                ({ data, error } = await getUserModels(user['profile']['sub']));
            }

            if (data) {
                setModels(new Array(data)[0]);
            }

            if (error) {
                setErrorMessage(JSON.stringify(error, null, 2));
            }
        };

        getMessage();
    }, []);

    return (
        <PageLayout>
            <div className="content-layout flex gap-5">
                <h1>Model atlas</h1>
                <div>
                    <p className="reg w-[100%]">
                        <strong>Explore the Model Atlas</strong> – a comprehensive online collection of models developed and utilized by the Copernicus
                        Institute of Sustainable Development. Each model has a dedicated page detailing its purpose, underlying theory, and real-world
                        applications. Many model pages also offer interactive features, allowing you to view and download output data. Browse through the Atlas
                        to explore the diverse modeling efforts within our institute and the available datasets!
                    </p>
                </div>

                <Searchbar />
                <Multiselect
                    isObject={false}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {}}
                    onSearch={function noRefCheck() {}}
                    onSelect={function noRefCheck() {}}
                    options={keywords}
                    placeholder="Select Keywords"
                    className="dd w-fit"
                />
                {models && <ModelCards models={models} editAble={editAble} />}
                {errorMessage && <div> {errorMessage}</div>}
            </div>
        </PageLayout>
    );
};
