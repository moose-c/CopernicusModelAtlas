import { NavBar } from './nav-bar';
import { SideBar } from './side-bar';
import { PageFooter } from './page-footer';

export const PageLayout = ({ children, sideBarContent = <p>This page has an empty side Bar</p> }) => {
    return (
        <div>
            <NavBar />
            <div className="flex h-full">
                <SideBar sideBarContent={sideBarContent} />
                <div>{children}</div>
            </div>
            <PageFooter />
        </div>
    );
};
