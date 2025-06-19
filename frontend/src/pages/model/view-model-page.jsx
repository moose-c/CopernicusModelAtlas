// ModelPage.jsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom'; // for dynamic routing
import { getSingleModel } from '../../services/db.service';
import { unpackModel } from '../../util/helpFunctions';
import { PageLayout } from '../../components/page-layout';
import { Introduction, Background, Results, Methods, MoreInformation } from './components/model-elements';
import { SideBarModelContent } from '../../components/side-bar';
import { Button } from '../../components/button';
import { AuthContext } from '../..';
import { sendEmail } from '../../services/db.service';
import { Helmet } from 'react-helmet-async';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';

const modEmail = import.meta.env.VITE_APP_MODERATOR_EMAIL;

const ModelContext = createContext();
export const useModel = () => useContext(ModelContext);

export const ModelPage = () => {
    const { modelSlug } = useParams();
    const [modelData, setModelData] = useState({});
    const [editModal1, setEditModal1] = useState(false);
    const [editModal2, setEditModal2] = useState(false);
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

    return (
        <>
            {(modelData['isApproved'] || user) && (
                <>
                    <Helmet>
                        <title>
                            {`${modelData.modelName} Copernicus Model Atlas UU Utrecht University` || 'Model Page Copernicus Model Atlas UU Utrecht University'}
                        </title>
                        <meta name="description" content={modelData.shortDescr || 'Details about this model.'} />
                        <meta name="keywords" content={modelData.keywords || ''} />
                    </Helmet>
                    {user && (
                        <>
                            <Dialog open={editModal1} call={() => setEditModal1(false)}>
                                <p className="px-4 pt-4">
                                    <span className="font-bold">Are you sure you want to request edit access?</span> <br /> Multiple people can have edit
                                    rights, you can revoke your own edit rights in profile {'->'}
                                    "Revoke edit rights".
                                </p>
                                <DialogActions>
                                    <Button call={() => setEditModal1(false)} text="No" />
                                    <Button
                                        call={() => {
                                            setEditModal1(false);
                                            sendEmail({
                                                subject: `Someone requested edit access to ${modelData['modelName']}`,
                                                html: `<p>Hi Charlotte, the user with id ${user['profile']['sub']} requested edit access to ${modelData['modelName']}.</p>
                                        <p>They have been instructed to email you also with their id, and the model they want access to.</p>`,
                                            });
                                            setEditModal2(true);
                                        }}
                                        text="Yes"
                                    />
                                </DialogActions>
                            </Dialog>
                            <Dialog open={editModal2} call={() => setEditModal2(false)}>
                                <p className="px-4 pt-4">
                                    <span className="font-bold">Edit rights requested</span> <br />
                                    To verify your identity with the moderator, please email the following details: <br />
                                    Model Name: {modelData['modelName']} <br />
                                    Your ID: {user['profile']['sub']}. <br />
                                    Send this information to the moderator at: {modEmail}
                                </p>
                                <DialogActions>
                                    <Button call={() => setEditModal2(false)} text="Close">
                                        Close{' '}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}

                    <ModelContext.Provider value={{ modelData }}>
                        <PageLayout sideBarContent={<SideBarModelContent />}>
                            <div className="content-layout gap-5 pb-[20px]">
                                <Introduction />
                                <Background />
                                <Results />
                                {modelData['methodsDesc'] && <Methods />}
                                <MoreInformation />
                                {user && (
                                    <div>
                                        <Button text="Request page edit rights" call={() => setEditModal1(true)} />
                                    </div>
                                )}
                            </div>
                        </PageLayout>
                    </ModelContext.Provider>
                </>
            )}
        </>
    );
};
