import React, { useEffect, useContext, useState } from 'react';
import { PageLayout } from '../components/page-layout';
import { Button } from '../components/button';
import { AuthContext } from '..';
import { getAllModels, getUserModels } from '../services/db.service';
import { ModelCards } from './model/components/model-cards';
import { useLocation } from 'react-router-dom';

const adminUser = import.meta.env.VITE_APP_ADMIN_USER;

export const ProfilePage = () => {
    const location = useLocation();
    const [toggle, setToggle] = useState(true);
    const [models, setModels] = useState([]);
    const { user } = useContext(AuthContext);
    const isAdmin = user?.profile?.sub == adminUser;

    useEffect(() => {
        if (user && typeof user === 'object') {
            const getModels = async () => {
                let data, error;
                if (isAdmin) {
                    ({ data, error } = await getAllModels(false));
                } else {
                    ({ data, error } = await getUserModels(user['profile']['sub']));
                }
                if (data) {
                    setModels(new Array(data)[0]);
                }
            };
            getModels();
        }
    }, [toggle, location.pathname]);
    return (
        <PageLayout>
            <div className="content-layout">
                <div>
                    <div className="flex justify-between items-center">
                        <h1>Your Models</h1>
                        <Button text="Add Model" to="/model/add" />
                    </div>
                    {models && <ModelCards models={models} editAble={true} isAdmin={isAdmin} setToggle={setToggle} />}
                </div>
                {/* <div>
                    <h1>User Information</h1>
                    <CodeSnippet title="Decoded ID Token" code={JSON.stringify(user, null, 2)} />
                </div> */}
            </div>
        </PageLayout>
    );
};
