// ModelPage.jsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom'; // for dynamic routing
import { getSingleModel } from '../../services/db.service';
import { unpackModel } from '../../util/helpFunctions';
import { PageLayout } from '../../components/page-layout';
import { Introduction, Theory, Results, Methods, Colofon } from './components/model-elements';
import { SideBarModelContent } from '../../components/side-bar';
import { Button } from '../../components/button';
import { AuthContext } from '../..';
import { requestEditRights } from '../../services/db.service';

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
            requestEditRights(user, setUser, modelData['modelName']);
            alert('Edit rights requested, wait for the Moderator to grant these.');
        }
    };
    return (
        <>
            <ModelContext.Provider value={{ modelData }}>
                <PageLayout sideBarContent={<SideBarModelContent />}>
                    <div className="content-layout flex gap-5 pb-[20px]">
                        <Introduction />
                        <Theory />
                        <Results />
                        {modelData['methodsDesc'] && <Methods />}
                        <Colofon />
                        {user && (
                            <div>
                                <Button text="Request page edit rights" call={() => handleRequestEditRights()} />
                            </div>
                        )}
                    </div>
                </PageLayout>
            </ModelContext.Provider>
        </>
    );
};
