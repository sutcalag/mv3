import React, { useState, useRef, useEffect } from 'react';
import milvusLogo from '../../images/milvus_logo.svg';
import lfLogoDark from '../../images/lf_logo_dark.svg';
import lfLogoLight from '../../images/lf_logo_light.svg';
import * as styles from './index.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'


// import LocalizedLink from '../localizedLink/localizedLink';

const Header = () => {
  const [isLightHeader, setIsLightHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
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
            <li className="overlay-li"><a href="#">Docs</a></li>
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
        {/* <nav>
          <ul className={styles.flexstart}>
            <li className="overlay-li"><a href="#">Docs</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Tools</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </nav> */}
      </div>
      <div className={styles.flexend}>
        {/* <div >
          <a href="https://github.com/milvus-io/milvus" >
            <div class="index-module--iconWrapper--3t3Fb">
              <i class="fab fa-github"></i>
            </div>
            <span>Star</span>
          </a>
          <a href="https://github.com/milvus-io/milvus/stargazers" >
            <span>9051</span>
          </a>
        </div>
        <div >
          <a href="https://github.com/milvus-io/milvus/fork" >
            <div >
              <i class="fas fa-code-branch"></i>
            </div>
            <span>Forks</span>
          </a>
          <a href="https://github.com/milvus-io/milvus/network/members" >
            <span>1378</span>
          </a>
        </div>
        <FontAwesomeIcon className={styles.global} icon={faGlobe} /> */}
        <button className={styles.startBtn}>Get Started</button>
      </div>

    </header>
  );

  return isMobile ? mobileHead : desktopHead;
};

export default Header;
