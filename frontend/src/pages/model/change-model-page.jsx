import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // for dynamic routing

import { PageLayout } from '../../components/page-layout';
import { FormContent } from './components/form-content';
import { ExamplePopup } from './components/examplePopup';
import { blankForm } from '../../util/globalVars';
import { unpackModel } from '../../util/helpFunctions';
import { performChecks } from '../../util/form-checks';
import { getAccessToken } from '../../util/getAccessToken';

import { editModel, getSingleModel, postModel, sendEmail } from '../../services/db.service';
import { AuthContext } from '../..';
import { SideBarChangeContent } from '../../components/side-bar';

import '../../styles/form.css';
import { Button } from '../../components/button';

export const ChangeModelPage = ({ edit = false }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const [examplePopups, setExamplePopups] = useState(Array(10).fill(false));
    const [formData, setFormData] = useState(blankForm);

    let modelSlug;
    if (edit) {
        modelSlug = useParams().modelSlug; // Get modelId from URL params
        console.log(modelSlug);
    }

    console.log(formData);

    useEffect(() => {
        // window.addEventListener('beforeunload', alertUser)
        // https://plainenglish.io/blog/how-to-alert-a-user-before-leaving-a-page-in-react

        if (!edit) {
            setFormData({ ...formData, uuUser: [user['profile']['sub']] });
        } else {
            let isMounted = true;

            const getMessage = async () => {
                const { data, error } = await getSingleModel(modelSlug);

                if (!isMounted) {
                    return;
                }

                if (data) {
                    setFormData(unpackModel(data));
                }

                if (error) {
                    console.log('error', error);
                }
            };

            getMessage();

            return () => {
                isMounted = false;
            };
        }
    }, []);

    const togglePopup = (popupNb) => {
        setExamplePopups((prevState) => prevState.map((val, i) => (i === popupNb ? !val : false)));
    };

    const handleSubmit = (event) => {
        console.log('handle submit called');
        event.preventDefault();

        // change false -> true to actually perform

        const doPost = async (formData) => {
            let check = await performChecks(formData, true);
            if (check) {
                console.log('checks passed');
                const accessToken = await getAccessToken(user, setUser);
                try {
                    if (edit) {
                        // Attempt to edit the model
                        formData['created_at'] = new Date().toUTCString();
                        await editModel(formData, modelSlug, accessToken);
                        sendEmail({
                            subject: `Someone edited a model`,
                            html: `<p>Hi Charlotte, someone edited a new model named ${formData['modelName']}, </p>`,
                        });
                        navigate('/profile');
                        if (!formData['isApproved']) {
                            if (
                                confirm(
                                    'Succesfully edited your model! Do you want to notify the moderator to review to page? Only after they have checked the page can it become visible by others.'
                                )
                            ) {
                                sendEmail({
                                    subject: `Someone requests approval`,
                                    html: `<p>Hi Charlotte, the model "${formData['modelName']}" requests approval. </p>`,
                                });
                            }
                        }
                    } else {
                        // Attempt to create a new model
                        await postModel(formData, accessToken);
                        sendEmail({
                            subject: `Someone posted a new model`,
                            html: `<p>Hi Charlotte, someone posted a new model named ${formData['modelName']}, </p>`,
                        });
                        navigate('/profile');
                        if (
                            confirm(
                                'Succesfully posted your model! Do you want to notify the moderator to review to page? Only after they have checked the page can it become visible by others.'
                            )
                        ) {
                            sendEmail({
                                subject: `Someone requests approval`,
                                html: `<p>Hi Charlotte, the model "${formData['modelName']}" requests approval. </p>`,
                            });
                        }
                    }
                } catch (error) {
                    // Catch any errors and handle them
                    console.error('Error occurred while processing the model', error);

                    // Optionally show a user-friendly error message
                    alert(`An error occurred, is the Model Name unique?`);
                }
            }
        };
        doPost(formData);

        return () => {
            isMounted = false;
        };
    };

    return (
        <PageLayout sideBarContent={<SideBarChangeContent />}>
            <div className="content-layout px-[100px] mx-auto max-w-[1000px]">
                <h1>Form to create or edit your model page</h1>
                <p>
                    {' '}
                    <span className="font-bold">Fields with an asterix (*) are manditory!</span> Other fields should be left empty (no X e.d.) if not desired.
                </p>
                <form onSubmit={handleSubmit} className="p-[20px] bg-gray-100 rounded shadow-md w-full flex flex-col gap-[20px] ">
                    <FormContent formData={formData} setFormData={setFormData} examplePopups={examplePopups} togglePopup={togglePopup} />
                    <div className="flex gap-4 items-center">
                        <Button text="Cancel" to="/profile" />
                        <button
                            type="submit"
                            className="bottom-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
};
