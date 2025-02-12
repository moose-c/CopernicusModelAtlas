import React, { useEffect, useContext } from "react";
import { CodeSnippet } from "../../components/code-snippet";
import { PageLayout } from "../../components/page-layout";
import { Button } from "../../components/button";
import { AuthContext } from "../..";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <PageLayout>
      <div className="content-layout">
        <div>
          <div className="flex justify-between items-center">
            <h1>Your Models</h1>
            <Button text="Add Model" to="/model/add" />
          </div>
          <h2>Here should go the models of this user</h2>
        </div>
        <div>
          <h1>User Information</h1>
          <CodeSnippet
            title="Decoded ID Token"
            code={JSON.stringify(user, null, 2)}
          />
        </div>
      </div>
    </PageLayout>
  );
};
