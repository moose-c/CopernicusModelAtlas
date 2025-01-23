import { PageLayout } from "../components/page-layout";
import { useState, useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { getModels } from "../services/message.service";
import Multiselect from "multiselect-react-dropdown";
import { Searchbar } from "../components/searchbar";
import { keywords } from "../util/globalVars";

export const HomePage = () => {
  const [models, setModels] = useState("");
  const env = import.meta.env.VITE_APP_TRIAL_ENV;

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
        <h1>Model atlas changd</h1>
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
        <CodeSnippet title="Models" code={models} />
      </div>
    </PageLayout>
  );
};
