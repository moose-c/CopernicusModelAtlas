import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // for dynamic routing

import { PageLayout } from '../../components/page-layout';
import { FormContent } from './components/form-content';
import { ExamplePopup } from './components/examplePopup';
import { blankForm } from '../../util/globalVars';
import { unpackModel } from '../../util/helpFunctions';
import { performChecks } from '../../util/form-checks';
import { getAccessToken } from '../../util/getAccessToken';

import { editModel, getSingleModel, postModel } from '../../services/db.service';
import { AuthContext } from '../..';
import { SideBarChangeContent } from '../../components/side-bar';

import '../../styles/form.css';

export const ChangeModelPage = ({ edit = false }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const [examplePopups, setExamplePopups] = useState(Array(10).fill(false));
    const [formData, setFormData] = useState(blankForm);

    let modelId;
    if (edit) {
        modelId = useParams().modelId; // Get modelId from URL params
    }

    console.log(formData);

    useEffect(() => {
        setFormData({ ...formData, uuUser: user['profile']['sub'] });

        if (edit) {
            console.log(modelId);
            let isMounted = true;

            const getMessage = async () => {
                const { data, error } = await getSingleModel(modelId);

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
        let isMounted = true;
        event.preventDefault();

        // change false -> true to actually perform

        const doPost = async (formData) => {
            let check = await performChecks(formData, true);
            if (check) {
                console.log('checks passed');
                const accessToken = getAccessToken(user, setUser);
                if (edit) {
                    await editModel(formData, modelId, accessToken);
                } else {
                    await postModel(formData, accessToken);
                }
                navigate('/profile');
            } else {
                console.log('check not passed');
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
                    Fill out this form to create add a new model to the overview. To see an example of what the model page will look like, click{' '}
                    <span className="cursor-pointer underline select-none" onClick={() => togglePopup(0)}>
                        here
                    </span>
                    {examplePopups[0] && <ExamplePopup nb={0} topPos={300} togglePopup={togglePopup} />}
                </p>
                <form onSubmit={handleSubmit} className="p-[20px] bg-gray-100 rounded shadow-md w-full flex flex-col gap-[20px] ">
                    <FormContent formData={formData} setFormData={setFormData} examplePopups={examplePopups} togglePopup={togglePopup} />
                    <button
                        type="submit"
                        className="sticky bottom-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </PageLayout>
    );
};
