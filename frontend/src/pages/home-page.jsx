import { PageLayout } from "../components/page-layout";
import { useState, useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { getModels } from "../services/message.service";

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
      <div className="hero-banner hero-banner--pink-yellow">
        <p className="font-sans text-[70px] font-thin leading-[340px] text-yellow-500">
          Hello, {env}!
        </p>
        <p className="h1">Models</p>
        <p>Here the retrieved models will be displayed. fetch or something</p>
        <CodeSnippet code={models} />
      </div>
    </PageLayout>
  );
};
