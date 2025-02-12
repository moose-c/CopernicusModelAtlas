import { PageLayout } from "../components/page-layout";
import { useState, useEffect } from "react";
import { ModelCards } from "./model/components/model-cards";
import { getAllModels } from "../services/db.service";
import Multiselect from "multiselect-react-dropdown";
import { Searchbar } from "../components/searchbar";
import { keywords } from "../util/globalVars";

export const HomePage = () => {
  const [models, setModels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [renewModel, setRenewModel] = useState(false);

  useEffect(() => {
    setRenewModel(false);
    const getMessage = async () => {
      const { data, error } = await getAllModels();

      if (data) {
        setModels(new Array(data)[0]);
        const modelIds = [];
        data.forEach((model) => {
          modelIds.push(model[0]);
        });
        console.log(modelIds);
      }

      if (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();
  }, [renewModel]);

  return (
    <PageLayout>
      <div className="content-layout flex gap-5">
        <h1>Model atlas</h1>
        <Searchbar />
        <Multiselect
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onSelect={function noRefCheck() {}}
          options={keywords}
          placeholder="Select Keywords"
          className="dd w-fit"
        />
        {models && <ModelCards models={models} setRenewModel={setRenewModel} />}
        {errorMessage && <div> {errorMessage}</div>}
      </div>
    </PageLayout>
  );
};
