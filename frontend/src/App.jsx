import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '.';
import { useContext, useEffect } from 'react';

import { CallbackPage } from './pages/callback-page';
import { OverviewPage } from './pages/overview-page';
import { NotFoundPage } from './pages/not-found-page';

import { ProfilePage } from './pages/profile-page';
import { AboutPage } from './pages/about-page';

import { ChangeModelPage } from './pages/model/change-model-page';
import { ModelPage } from './pages/model/view-model-page';
import { getAdminInfo } from './services/db.service';

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" />;
    }

    return element;
};

export var adminInfo;

export const App = () => {
    useEffect(() => {
        const obtainAdminInfo = async () => {
            const intermValue = await getAdminInfo();
            adminInfo = intermValue['data'][0];
        };
        obtainAdminInfo();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/about" element={<AboutPage />} />
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
