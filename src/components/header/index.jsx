import React, { useState, useRef, useEffect } from 'react';
import milvusLogo from '../../images/milvus_logo.svg';
import lfLogoDark from '../../images/lf_logo_dark.svg';
import lfLogoLight from '../../images/lf_logo_light.svg';
import * as styles from './index.module.less';
// import LocalizedLink from '../localizedLink/localizedLink';

const Header = () => {

  const [isLightHeader, setIsLightHeader] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const onScroll = e => {
      setIsLightHeader(e.target.documentElement.scrollTop > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLightHeader]);

  useEffect(() => {
    const onResize = () => {
      const xl = window.matchMedia("(max-width: 1441px)");
      if (xl.matches) {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  console.log("menuOpen", menuOpen);

  const logoSection = (
    <div className={styles.logoSection}>
      <a
        href="/"
      >
        <img
          src={milvusLogo}
          alt="milvus-logo"
        />
      </a>
      <span />
      <a
        href="https://lfaidata.foundation/projects/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {isLightHeader ?
          <img src={lfLogoLight} alt="lfai-icon" /> :
          <img src={lfLogoDark} alt="lfai-icon" />}
      </a>
    </div>
  );

  const mobileHead = (
    <>
      {logoSection}
      <button onClick={() => setMenuOpen(!menuOpen)} className={`${styles.hamburg} ${menuOpen ? styles.active : ""}`}>
        <span className={styles.top}></span>
        <span className={styles.middle}></span>
        <span className={styles.bottom}></span>
      </button>

      <div className={`${styles.overlay} ${menuOpen ? styles.open : ''}`}>
        <nav className="overlay-menu">
          <ul>
            <li className="overlay-li"><a href="#">portfolio</a></li>
            <li><a href="#">services</a></li>
            <li><a href="#">about</a></li>
            <li><a href="#">contact</a></li>
          </ul>
        </nav>
      </div>
    </>
  );

  const desktopHead = (
    <>
      <div>
        {logoSection}
      </div>
      <button className={styles.startBtn}>Get Started</button>
    </>
  );

  return (
    <header className={`${styles.header} ${isLightHeader ? styles.light : ''} `} >
      {isMobile ? mobileHead : desktopHead}
    </header>
  );
};

export default Header;
