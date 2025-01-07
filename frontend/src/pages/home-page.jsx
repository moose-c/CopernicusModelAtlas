import { PageLayout } from "../components/page-layout";
import { useState, useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { getModels } from "../services/message.service";
import Multiselect from "multiselect-react-dropdown";
import { Searchbar } from "../components/searchbar";

export const HomePage = () => {
  const [models, setModels] = useState("");
  const env = import.meta.env.VITE_APP_TRIAL_ENV;

  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const { data, error } = await getModels();

      if (!isMounted) {
        return;
      }

      if (data) {
        setModels(JSON.stringify(data, null, 2));
      }

      if (error) {
        setModels(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <p className="h1">Model atlas</p>
        <Searchbar />
        <Multiselect
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onSelect={function noRefCheck() {}}
          options={options}
          placeholder="Select Keywords"
          className="dd w-fit"
        />
        <CodeSnippet title="Models" code={models} />
      </div>
    </PageLayout>
  );
};
