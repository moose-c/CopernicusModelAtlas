import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { deleteModel } from "../../../services/db.service";

export const ModelCards = ({ models, setRenewModel }) => {
  return (
    <div className="flex flex-col justify-center">
      {models.map((model) => (
        <ModelCard key={model[0]} model={model} setRenewModel={setRenewModel} />
      ))}
    </div>
  );
};

const ModelCard = ({ model, setRenewModel }) => {
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {modelName}
            </h2>
            <h3 className="text-xl font-medium text-gray-600 mb-2">{name}</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Button text="Edit" to={`model/edit/${model[0]}`} />
            </div>
            <Button
              text="delete"
              call={() => {
                deleteModel(model[0]);
                setRenewModel(true);
              }}
            />
          </div>
        </div>
        <p className="text-gray-500">{desc}</p>
      </div>
    </Link>
  );
};
