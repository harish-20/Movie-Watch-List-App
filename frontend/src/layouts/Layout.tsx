import React, { PropsWithChildren } from "react";

import Sidebar from "../components/Sidebar/Sidebar";

import classes from "./Layout.module.css";

interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Sidebar />
      <div className={classes["main-content"]}>{children}</div>
    </div>
  );
};

export default Layout;
