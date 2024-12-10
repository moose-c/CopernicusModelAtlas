import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getAdminResource } from "../services/message.service";

export const AdminPage = () => {
  const [message, setMessage] = useState("");

  const { user, getAccessTokenSilently } = useAuth0();
  const isAdmin = user?.["https://namespace.com/roles"]?.includes("admin");

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getAdminResource(accessToken);

      console.log(accessToken);
      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
      {!isAdmin && (
        <p className="text-2xl">
          Current user does not have Admin rights, if you believe this is
          incorrect, please contact: INSERT CONTACT EMAIL
        </p>
      )}
      {isAdmin && (
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Admin Page
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>
                This page retrieves an <strong>admin message</strong> from an
                external API.
              </span>
              <span>
                <strong>
                  Only authenticated users with the{" "}
                  <code>read:admin-messages</code> permission should access this
                  page.
                </strong>
              </span>
            </p>
            <CodeSnippet title="Admin Message" code={message} />
          </div>
        </div>
      )}
    </PageLayout>
  );
};
