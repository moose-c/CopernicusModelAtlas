import { NavBar } from './nav-bar';
import { SideBar } from './side-bar';
import { PageFooter } from './page-footer';

export const PageLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div className="flex">
                <SideBar>
                    <p>Content for the Side Bar</p>
                </SideBar>
                <div>{children}</div>
            </div>
            <PageFooter />
        </div>
    );
};
