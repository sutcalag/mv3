import React, { useState, useRef, useEffect } from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import milvusLogo from '../../images/milvus_logo.svg';
import lfLogoDark from '../../images/lf_logo_dark.svg';
import lfLogoLight from '../../images/lf_logo_light.svg';
import * as styles from './index.module.less';
import GitHubButton from '../githubButton';
import LocalizedLink from '../localizedLink/localizedLink';

const Header = ({ darkMode = false, locale }) => {
  const [isLightHeader, setIsLightHeader] = useState(!darkMode);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!darkMode) {
      return;
    }
    const onScroll = e => {
      setIsLightHeader(e.target.documentElement.scrollTop > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLightHeader]);

  useEffect(() => {
    const onResize = () => {
      const xl = window.matchMedia("(max-width: 1440px)");
      if (xl.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  useEffect(() => {
    const xl = window.matchMedia("(max-width: 1440px)");
    if (xl.matches) {
      setIsMobile(true);
    }
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const logoSection = (
    <div className={styles.logoSection}>
      <LocalizedLink
        to="/"
      >
        <img
          src={milvusLogo}
          alt="milvus-logo"
        />
      </LocalizedLink>
      <span />
      <a
        href="https://lfaidata.foundation/projects/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {isLightHeader || isMobile ?
          <img src={lfLogoLight} alt="lfai-icon" /> :
          <img src={lfLogoDark} alt="lfai-icon" />}
      </a>
    </div>
  );

  const mobileHead = (
    <header className={styles.mobileHead}>
      <div className={`${styles.spaceBetween} col-4 col-8 col-12`}>
        {logoSection}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${styles.hamburg} ${isMenuOpen ? styles.active : ""}`}>
          <span className={styles.top}></span>
          <span className={styles.middle}></span>
          <span className={styles.bottom}></span>
        </button>
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          <ul>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Tools</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );


  const desktopHead = (
    <header className={`${styles.header} ${isLightHeader ? styles.light : ''} `} >
      <div className={styles.flexstart}>
        {logoSection}
        <nav>
          <ul className={`${styles.flexstart} ${styles.menu}`}>
            <li><a className={styles.menuLink} href="#">Docs</a></li>
            <li><a className={styles.menuLink} href="#">Tutorials</a></li>
            <li><a className={styles.menuLink} href="#">Tools</a></li>
            <li><a className={styles.menuLink} href="#">Blog</a></li>
            <li><a className={styles.menuLink} href="#">Community</a></li>
          </ul>
        </nav>
      </div>
      <div className={styles.actionBar}>
        <GitHubButton
          type="star"
          // className="star-btn"
          href="https://github.com/milvus-io/milvus"
        >
          Star
        </GitHubButton>

        <GitHubButton
          type="fork"
          href="https://github.com/milvus-io/milvus"
        >
          Forks
        </GitHubButton>
        <Select
          defaultValue="en"
          onChange={handleChange}
          lable="language"
          IconComponent={null}
          className={styles.langSelect}
          renderValue={v => {
            return (
              <>
                <FontAwesomeIcon className={styles.global} icon={faGlobe} />
                <span>{v}</span>
              </>
            )

          }}
        >
          <MenuItem value="cn">
            中文
          </MenuItem>
          <MenuItem value="en">
            English
          </MenuItem>
        </Select>
        <button className={styles.startBtn}>Get Started</button>
      </div>

    </header >
  );

  return isMobile ? mobileHead : desktopHead;
};

export default Header;
