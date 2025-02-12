import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from ".";
import { useContext } from "react";

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

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  console.log("proute", user);
  return user ? element : <Navigate to="/" />;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/model/add" element={<AddModelPage />} />
      <Route path="/model/:modelId" element={<ModelPage />} />
      <Route path="/model/edit/:modelId" element={<EditModelPage />} />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route path="/message/public" element={<PublicPage />} />
      <Route
        path="/message/protected"
        element={<ProtectedRoute element={<ProtectedPage />} />}
      />
      <Route
        path="/message/admin"
        element={<ProtectedRoute element={<AdminPage />} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
