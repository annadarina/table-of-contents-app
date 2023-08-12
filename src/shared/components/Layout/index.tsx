import React from "react";
import "./Layout.css";

interface Props {
  sidebarComponent: React.ReactElement;
  mainComponent: React.ReactElement;
}

const Layout = ({ sidebarComponent, mainComponent }: Props) => {
  return (
    <div className="app">
      <div className="app__main">
        <aside className="app__aside">{sidebarComponent}</aside>
        <div className="app__content">{mainComponent}</div>
      </div>
    </div>
  );
};

export default Layout;
