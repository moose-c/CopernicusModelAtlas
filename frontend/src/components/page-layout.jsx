import { NavBar } from './nav-bar';
import { SideBar } from './side-bar';
import { PageFooter } from './page-footer';

export const PageLayout = ({ children, sideBarContent = false }) => {
    return (
        <div>
            <NavBar />
            <div className="flex h-full">
                {sideBarContent && <SideBar sideBarContent={sideBarContent} />}
                <div>{children}</div>
            </div>
            <PageFooter />
        </div>
    );
};
