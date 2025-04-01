// ModelPage.jsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom'; // for dynamic routing
import { getSingleModel } from '../../services/db.service';
import { unpackModel } from '../../util/helpFunctions';
import { PageLayout } from '../../components/page-layout';
import { Introduction, Background, Results, Methods, Colofon } from './components/model-elements';
import { SideBarModelContent } from '../../components/side-bar';
import { Button } from '../../components/button';
import { AuthContext } from '../..';
import { sendEmail } from '../../services/db.service';
const modEmail = import.meta.env.VITE_APP_MODERATOR_EMAIL;

const ModelContext = createContext();
export const useModel = () => useContext(ModelContext);

export const ModelPage = () => {
    const { modelSlug } = useParams();
    const [modelData, setModelData] = useState({});
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
            const { data, error } = await getSingleModel(modelSlug);

            if (!isMounted) {
                return;
            }

            if (data) {
                setModelData(unpackModel(data));
            }

            if (error) {
                console.log('error', error);
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleRequestEditRights = () => {
        if (
            confirm(
                'Are you sure you want to request edit access? Only one person can have this at a given time so this will revoke the edit access for the other user.'
            ) == true
        ) {
            sendEmail({
                subject: `Someone requested edit access to ${modelData['modelName']}`,
                html: `<p>Hi Charlotte, the user with id ${user['profile']['sub']} requested edit access to ${modelData['modelName']}.</p>
                <p>They have been instructed to email you also with their id, and the model they want access to.</p>`,
            });
            alert(
                `Edit rights requested. To verify your identity with the moderator, please email the following details:
Model Name: "${modelData['modelName']}"
Your ID: "${user['profile']['sub']}"
Send this information to the moderator at: "${modEmail}"`
            );
        }
    };
    return (
        <>
            <ModelContext.Provider value={{ modelData }}>
                <PageLayout sideBarContent={<SideBarModelContent />}>
                    <div className="content-layout flex gap-5 pb-[20px]">
                        <Introduction />
                        <Background />
                        <Results />
                        {modelData['methodsDesc'] && <Methods />}
                        <Colofon />
                        {user && (
                            <div>
                                <Button
                                    text="Request page edit rights"
                                    call={() => {
                                        handleRequestEditRights();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </PageLayout>
            </ModelContext.Provider>
        </>
    );
};
