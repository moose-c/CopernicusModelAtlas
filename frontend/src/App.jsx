import { useAuth0 } from "@auth0/auth0-react";

import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";

import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";

import { ProfilePage } from "./pages/message/profile-page";
import { ProtectedPage } from "./pages/message/protected-page";
import { PublicPage } from "./pages/message/public-page";
import { AdminPage } from "./pages/message/admin-page";

import { AddModelPage } from "./pages/model/add-model-page";
import { EditModelPage } from "./pages/model/edit-model-page";
import { ModelPage } from "./pages/model/model-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/model/add" element={<AddModelPage />} />
      <Route path="/model/:modelId" element={<ModelPage />} />
      <Route path="/model/edit/:modelId" element={<EditModelPage />} />
      <Route
        path="/message/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route path="/message/public" element={<PublicPage />} />
      <Route
        path="/message/protected"
        element={<AuthenticationGuard component={ProtectedPage} />}
      />
      <Route
        path="/message/admin"
        element={<AuthenticationGuard component={AdminPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
