import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { Button } from "../components/buttons/button";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <div>
          <div className="flex justify-between items-center">
            <p className="h1">Your Models</p>
            <Button text="Add Model" to="/add-model" />
          </div>
          <p className="h2">Here should go the models of this user</p>
        </div>
        <div>
          <p className="h1">User Information</p>
          <CodeSnippet
            title="Decoded ID Token"
            code={JSON.stringify(user, null, 2)}
          />
        </div>
      </div>
    </PageLayout>
  );
};
