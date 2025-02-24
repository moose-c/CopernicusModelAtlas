import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '.';
import { useContext } from 'react';

import { CallbackPage } from './pages/callback-page';
import { OverviewPage } from './pages/overview-page';
import { NotFoundPage } from './pages/not-found-page';

import { ProfilePage } from './pages/message/profile-page';
import { ProtectedPage } from './pages/message/protected-page';
import { PublicPage } from './pages/message/public-page';
import { AdminPage } from './pages/message/admin-page';

import { AddModelPage } from './pages/model/add-model-page';
import { EditModelPage } from './pages/model/edit-model-page';
import { ModelPage } from './pages/model/model-page';

const ProtectedRoute = ({ element, adminOnly = false }) => {
    const { user } = useContext(AuthContext);

    console.log(user);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (adminOnly && user.profile['https://namespace.com/roles'][0] !== 'admin') {
        return <Navigate to="/" />; // Redirect to an "Unauthorized" page
    }

    return element;
};

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/callback" element={<CallbackPage />} />

            <Route path="/message/public" element={<PublicPage />} />
            <Route path="/model/:modelId" element={<ModelPage />} />

            <Route path="/model/add" element={<ProtectedRoute element={<AddModelPage />} />} />
            <Route path="/model/edit/:modelId" element={<ProtectedRoute element={<EditModelPage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/message/protected" element={<ProtectedRoute element={<ProtectedPage />} />} />

            <Route path="/model/admin" element={<ProtectedRoute element={<OverviewPage editAble={true} />} adminOnly={true} />} />
            <Route path="/message/admin" element={<ProtectedRoute element={<AdminPage />} adminOnly={true} />} />

            <Route path="/callback" element={<CallbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
