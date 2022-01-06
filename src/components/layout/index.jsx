import React, { useState, useRef, useEffect } from "react";
import Header from "../header";
// import Footer from "../footer";
import * as styles from "./index.module.less";

const Layout = ({ darkMode, children, t }) => {
  return (
    <>
      <Header darkMode={darkMode} t={t} />
      {children}
      {/* <Footer t={t} /> */}
    </>
  );
};

export default Layout;
