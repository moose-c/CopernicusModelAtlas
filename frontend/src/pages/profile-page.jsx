import React, { useEffect, useContext, useState } from 'react';
import { PageLayout } from '../components/page-layout';
import { Button } from '../components/button';
import { AuthContext } from '..';
import { getAllModels, getUserModels, changeModerators, changeModeratorEmail } from '../services/db.service';
import { ModelCards } from './model/components/model-cards';
import { useLocation } from 'react-router-dom';
import { adminInfo } from '../App';
import { getAccessToken } from '../util/getAccessToken';

export const ProfilePage = () => {
    const location = useLocation();
    const [toggle, setToggle] = useState(true);
    const [models, setModels] = useState([]);
    const { user, setUser } = useContext(AuthContext);
    const isAdmin = adminInfo[0].includes(user?.profile?.sub);

    const handleEditModerators = async () => {
        const accessToken = await getAccessToken(user, setUser);
        const moderatorId = prompt(
            `
            Add/remove a moderator.
            Enter the user id of a new or existing moderator.
            If the id already belongs to a moderator, this moderator will be removed. 
            If the id doesnt belong to a moderator, this moderator will be added`
        );
        console.log('TD handle edit');
        changeModerators(accessToken, moderatorId);
    };

    const handleEditModeratorEmail = async () => {
        const accessToken = await getAccessToken(user, setUser);
        const moderatorEmail = prompt('Enter the email adress of the new main moderator');
        changeModeratorEmail(accessToken, moderatorEmail);
    };

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
                    <div className="flex">
                        {models && <ModelCards models={models} editAble={true} isAdmin={isAdmin} setToggle={setToggle} />}
                        {isAdmin && (
                            <div className="flex flex-col gap-2 items-center">
                                <h2>Moderator fuctionality</h2>
                                <div>
                                    <Button text="Add/Remove moderators" call={() => handleEditModerators()} />
                                </div>
                                <div>
                                    <Button text="Change moderator email" call={() => handleEditModeratorEmail()} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <div>
                    <h1>User Information</h1>
                    <CodeSnippet title="Decoded ID Token" code={JSON.stringify(user, null, 2)} />
                </div> */}
            </div>
        </PageLayout>
    );
};
