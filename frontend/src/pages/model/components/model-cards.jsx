import { Link } from 'react-router-dom';
import { Button } from '../../../components/button';
import { deleteModel, approveModel, giveEditRights } from '../../../services/db.service';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../..';
import { getAccessToken } from '../../../util/getAccessToken';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export const ModelCards = ({ models, editAble, isAdmin, setToggle }) => {
    return (
        <div className="flex flex-col justify-center w-full">
            {models.map(
                (model) => (editAble || model[8]) && <ModelCard key={model[0]} model={model} editAble={editAble} isAdmin={isAdmin} setToggle={setToggle} />
            )}
        </div>
    );
};

const ModelCard = ({ model, editAble, isAdmin, setToggle }) => {
    const { user, setUser } = useContext(AuthContext);
    // Extracting the values from the model array
    const modelName = model[1];
    const modelUrl = urlIfy(modelName);
    const keywords = model[2].join(', ');
    const name0 = model[3];
    const name1 = model[4];
    const name2 = model[5];
    const name3 = model[6];
    const name4 = model[7];
    const desc = parse(DOMPurify.sanitize(model[8]).replaceAll('<p>', '<p className="text-gray-500">'));
    const icon = model[9];
    const approved = model[10];

    const [accessToken, setAccesToken] = useState('');

    useEffect(() => {
        if (user) {
            (async function () {
                const retrievedAccessToken = await getAccessToken(user, setUser);
                setAccesToken(retrievedAccessToken);
            })();
        }
    }, []);

    const handleChangeOwner = () => {
        const userId = prompt('Enter the user id of the new owner perfectly!');
        if (userId.length == 32) {
            giveEditRights(accessToken, userId, modelName);
        } else {
            alert('A user id needs to be 32 characters, please enter a valid id');
        }
    };

    return (
        <Link
            to={`/model/${modelUrl}`}
            className="w-fill rounded-lg overflow-hidden shadow-lg bg-white m-4 transform transition-transform hover:scale-105 hover:shadow-xl"
        >
            <div className="p-6 flex justify-between">
                <div className="flex flex-col justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{modelName}</h2>
                    <h3 className="pb-2">{keywords}</h3>
                    <h3 className="text-s font-light text-gray-600 mb-2">
                        {name0 && name0}
                        {name1 && ', ' + name1}
                        {name2 && ', ' + name2}
                        {name3 && ', ' + name3}
                        {name4 && ', ' + name4}
                    </h3>

                    {desc}
                </div>

                {icon && <img src={`data:image/png;base64,${icon}`} className="max-w-[20%] pl-2 h-auto object-contain" />}
                <div className="flex flex-col gap-3">
                    {editAble &&
                        (() => {
                            return (
                                <>
                                    <div>
                                        <Button text="Edit" to={`/model/edit/${modelUrl}`} />
                                    </div>
                                    <div>
                                        <Button
                                            text="Delete"
                                            call={async () => {
                                                await deleteModel(model[0], accessToken);
                                                setToggle((prevValue) => !prevValue);
                                            }}
                                        />
                                    </div>
                                    {!approved && <p className="text-red-500 font-bold">Not yet approved</p>}

                                    {isAdmin && (
                                        <>
                                            <div>
                                                <Button
                                                    text="Toggle Approval"
                                                    call={async () => {
                                                        await approveModel(model[0], accessToken);
                                                        setToggle((prevValue) => !prevValue);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Button text="Change Owner" call={() => handleChangeOwner()} />
                                            </div>
                                        </>
                                    )}
                                </>
                            );
                        })()}
                </div>
            </div>
        </Link>
    );
};

const urlIfy = (name) => {
    return name.split(' ').join('_');
};
