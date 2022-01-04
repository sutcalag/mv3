import React, { useState, useRef, useEffect } from "react";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { globalHistory } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import milvusLogo from "../../images/milvus_logo.svg";
import lfLogoDark from "../../images/lf_logo_dark.svg";
import lfLogoLight from "../../images/lf_logo_light.svg";
import * as styles from "./index.module.less";
import GitHubButton from "../githubButton";
import { useWindowSize } from "../../http/hooks";

import { Link, useI18next } from "gatsby-plugin-react-i18next";

const Header = ({ darkMode = false, locale }) => {
  // const { t } = useTranslation();
  // console.log("I18NextContext", I18NextContext);
  const { languages, originalPath } = useI18next();
  const [isLightHeader, setIsLightHeader] = useState(!darkMode);
  // const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTutOpen, setIsTutOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [path, setPath] = useState("/");

  const toolRef = useRef(null);
  const tutRef = useRef(null);

  useEffect(() => {
    if (!darkMode) {
      return;
    }
    const onScroll = (e) => {
      setIsLightHeader(e.target.documentElement.scrollTop > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLightHeader]);

  const currentSize = useWindowSize();

  const isMobile = ["phone", "tablet", "desktop1024"].includes(currentSize);

  useEffect(() => {
    const { pathname } = globalHistory.location;
    const to = pathname.replace("/en/", "/").replace("/cn", "");
    console.log("to", to);
    setPath(to);
  }, []);

  const openTutorial = (open) => {
    let isOpen = open;
    if (isOpen === undefined) {
      isOpen = !isTutOpen;
    }
    setIsTutOpen(isOpen);
  };

  const openTool = (open) => {
    let isOpen = open;
    if (isOpen === undefined) {
      isOpen = !isToolOpen;
    }
    setIsToolOpen(isOpen);
  };

  const logoSection = (
    <div className={styles.logoSection}>
      <Link to="/">
        <img src={milvusLogo} alt="milvus-logo" />
      </Link>
      <span />
      <a
        href="https://lfaidata.foundation/projects/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {isLightHeader || isMobile ? (
          <img src={lfLogoLight} alt="lfai-icon" />
        ) : (
          <img src={lfLogoDark} alt="lfai-icon" />
        )}
      </a>
    </div>
  );

  const mobileHead = (
    <header className={styles.mobileHead}>
      <div className={`${styles.spaceBetween} col-4 col-8 col-12`}>
        {logoSection}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.hamburg} ${isMenuOpen ? styles.active : ""}`}
        >
          <span className={styles.top}></span>
          <span className={styles.middle}></span>
          <span className={styles.bottom}></span>
        </button>
      </div>

      <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#">Docs</a>
            </li>
            <li>
              <a href="#">Tutorials</a>
            </li>
            <li>
              <a href="#">Tools</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );

  const desktopHead = (
    <header
      className={`${styles.header} ${isLightHeader ? styles.light : ""} `}
    >
      <div className={styles.flexstart}>
        {logoSection}
        <nav>
          <ul className={`${styles.flexstart} ${styles.menu}`}>
            <li>
              <Link to="/docs" locale={locale} className={styles.menuLink}>
                Docs
              </Link>
            </li>
            <li>
              <button
                ref={tutRef}
                className={styles.menuLink}
                onClick={openTutorial}
              >
                Tutorials
              </button>
            </li>
            <li>
              <button
                ref={toolRef}
                className={styles.menuLink}
                onClick={openTool}
              >
                Tools
              </button>
            </li>
            <li>
              <Link to="/blog" locale={locale} className={styles.menuLink}>
                Blog
              </Link>
            </li>
            <li>
              <a className={styles.menuLink} href="#">
                Community
              </a>
            </li>
          </ul>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={tutRef.current}
            open={isTutOpen}
            onClose={() => {
              openTutorial(false);
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>Bootcamp</MenuItem>
            <MenuItem>Demo</MenuItem>
            <MenuItem>
              <a
                href="https://www.youtube.com/zillizchannel"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuLink}
              >
                Video
              </a>
            </MenuItem>
          </Menu>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={toolRef.current}
            open={isToolOpen}
            onClose={() => {
              openTool(false);
            }}
          >
            <MenuItem>
              <a
                href="https://github.com/zilliztech/attu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuLink}
              >
                Attu
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="https://github.com/zilliztech/milvus_cli"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuLink}
              >
                Milvus_CLI
              </a>
            </MenuItem>
            <MenuItem>Sizing Tool</MenuItem>
          </Menu>
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

        <GitHubButton type="fork" href="https://github.com/milvus-io/milvus">
          Forks
        </GitHubButton>
        <Select
          value={locale}
          lable="language"
          className={styles.langSelect}
          renderValue={(v) => (
            <>
              <FontAwesomeIcon className={styles.global} icon={faGlobe} />
              <span className={styles.globalText}>{v}</span>
            </>
          )}
        >
          {languages.map((lng) => {
            return (
              <MenuItem key={lng} value={lng}>
                <Link to={originalPath} language={lng}>
                  {lng === "en" ? "English" : "中文"}
                </Link>
              </MenuItem>
            );
          })}
        </Select>
        <button className={styles.startBtn}>Get Started</button>
      </div>
    </header>
  );

  return isMobile ? mobileHead : desktopHead;
};

export default Header;
