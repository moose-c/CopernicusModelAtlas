import { Link } from 'react-router-dom';
import { Button } from '../../../components/button';
import { deleteModel, approveModel } from '../../../services/db.service';
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
    const name0 = model[2];
    const name1 = model[3];
    const name2 = model[4];
    const name3 = model[5];
    const name4 = model[6];
    const desc = parse(DOMPurify.sanitize(model[7]).replaceAll('<p>', '<p className="text-gray-500">'));
    const icon = model[8];
    const approved = model[9];

    const [accessToken, setAccesToken] = useState('');

    useEffect(() => {
        if (user) {
            (async function () {
                const retrievedAccessToken = await getAccessToken(user, setUser);
                setAccesToken(retrievedAccessToken);
            })();
        }
    }, []);

    return (
        <Link
            to={`/model/${model[0]}`}
            className="w-full rounded-lg overflow-hidden shadow-lg bg-white m-4 transform transition-transform hover:scale-105 hover:shadow-xl"
        >
            <div className="p-6 flex justify-between">
                <div className="flex flex-col justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{modelName}</h2>
                    <h3 className="text-xl font-medium text-gray-600 mb-2">
                        {name0 && name0}
                        {name1 && ', ' + name1}
                        {name2 && ', ' + name2}
                        {name3 && ', ' + name3}
                        {name4 && ', ' + name4}
                    </h3>
                    {desc}
                </div>

                {icon && <img src={`data:image/svg;base64,${icon}`} className="max-w-[20%] h-auto object-contain" />}
                <div className="flex flex-col gap-3">
                    {editAble &&
                        (() => {
                            return (
                                <>
                                    <div>
                                        <Button text="Edit" to={`/model/edit/${model[0]}`} />
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
                                        <div>
                                            <Button
                                                text="Toggle Approval"
                                                call={async () => {
                                                    await approveModel(model[0], accessToken);
                                                    setToggle((prevValue) => !prevValue);
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                </div>
            </div>
        </Link>
    );
};
