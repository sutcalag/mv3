import React, { useState, useRef, useEffect } from 'react';
import Header from '../header';
import * as styles from './index.module.less';

const Layout = ({ children }) => {



  return (
    <>
      <Header
      />
      {children}
      {/* <Footer footer={footer} locale={locale} className={styles.footer} /> */}
    </>
  );
};

export default Layout;
