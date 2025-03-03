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
                console.log(data);
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
