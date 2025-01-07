import { NavBar } from "./navigation/nav-bar";
import { PageFooter } from "./page-footer";

export const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
      <PageFooter />
    </div>
  );
};
