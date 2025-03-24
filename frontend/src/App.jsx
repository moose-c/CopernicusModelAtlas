import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '.';
import { useContext } from 'react';

import { CallbackPage } from './pages/callback-page';
import { OverviewPage } from './pages/overview-page';
import { NotFoundPage } from './pages/not-found-page';

import { ProfilePage } from './pages/profile-page';

import { ChangeModelPage } from './pages/model/change-model-page';
import { ModelPage } from './pages/model/view-model-page';

const ProtectedRoute = ({ element, adminOnly = false }) => {
    const { user } = useContext(AuthContext);

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

            <Route path="/model/:modelSlug" element={<ModelPage />} />

            <Route path="/model/add" element={<ProtectedRoute element={<ChangeModelPage />} />} />
            <Route path="/model/edit/:modelSlug" element={<ProtectedRoute element={<ChangeModelPage edit={true} />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

            <Route path="/callback" element={<CallbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
