import { Link } from 'react-router-dom';
import { Button } from '../../../components/button';
import { deleteModel, approveModel } from '../../../services/db.service';
import { useContext } from 'react';
import { AuthContext } from '../../..';
import { getAccessToken } from '../../../util/getAccessToken';

export const ModelCards = ({ models, editAble, isAdmin, setToggle }) => {
    return (
        <div className="flex flex-col justify-center">
            {models.map(
                (model) => (editAble || model[4]) && <ModelCard key={model[0]} model={model} editAble={editAble} isAdmin={isAdmin} setToggle={setToggle} />
            )}
        </div>
    );
};

const ModelCard = ({ model, editAble, isAdmin, setToggle }) => {
    const { user } = useContext(AuthContext);
    // Extracting the values from the model array
    const modelName = model[1];
    const name = model[2];
    const desc = model[3];

    return (
        <Link
            to={`/model/${model[0]}`}
            className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-white m-4 transform transition-transform hover:scale-105 hover:shadow-xl"
        >
            <div className="p-6">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{modelName}</h2>
                        <h3 className="text-xl font-medium text-gray-600 mb-2">{name}</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        {editAble &&
                            (() => {
                                const accessToken = getAccessToken(user);
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
                                        {!model[4] && <p className="text-red-500 font-bold">Not yet approved</p>}

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
                <p className="text-gray-500">{desc}</p>
            </div>
        </Link>
    );
};
