import { NavBar } from './nav-bar';
import { SideBar } from './side-bar';
import { PageFooter } from './page-footer';

export const PageLayout = ({ children, sideBarContent = false }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-auto">
                {sideBarContent && <SideBar sideBarContent={sideBarContent} />}
                <div className="flex-1">{children}</div>
            </div>
            <PageFooter />
        </div>
    );
};
