import React, { useState, useRef, useEffect } from "react";
import Header from "../header";
import * as styles from "./index.module.less";

const Layout = ({ darkMode, children }) => {
  return (
    <>
      <Header darkMode={darkMode} />
      {children}
      {/* <Footer footer={footer} locale={locale} className={styles.footer} /> */}
    </>
  );
};

export default Layout;
