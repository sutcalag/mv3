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
import LocalizedLink from "../localizedLink/localizedLink";
import { useWindowSize } from "../../http/hooks";

// import { useTranslation, I18NextContext } from "gatsby-plugin-react-i18next";

const Header = ({ darkMode = false, locale }) => {
  // const { t } = useTranslation();
  // console.log("I18NextContext", I18NextContext);
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

  const handleChange = (e) => {
    console.log(e.target.value);
  };

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
      <LocalizedLink to="/">
        <img src={milvusLogo} alt="milvus-logo" />
      </LocalizedLink>
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
              <LocalizedLink
                to="/docs"
                locale={locale}
                className={styles.menuLink}
              >
                Docs
              </LocalizedLink>
            </li>
            <li>
              <a
                ref={tutRef}
                className={styles.menuLink}
                href="javascript:void(0)"
                onClick={openTutorial}
              >
                Tutorials
              </a>
            </li>
            <li>
              <a
                ref={toolRef}
                className={styles.menuLink}
                href="javascript:void(0)"
                onClick={openTool}
              >
                Tools
              </a>
            </li>
            <li>
              <LocalizedLink
                to="/blog"
                locale={locale}
                className={styles.menuLink}
              >
                Blog
              </LocalizedLink>
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
              <LocalizedLink
                to="https://www.youtube.com/zillizchannel"
                className={styles.menuLink}
              >
                Video
              </LocalizedLink>
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
              <LocalizedLink
                to="https://github.com/zilliztech/attu"
                className={styles.menuLink}
              >
                Attu
              </LocalizedLink>
            </MenuItem>
            <MenuItem>
              <LocalizedLink
                to="https://github.com/zilliztech/milvus_cli"
                className={styles.menuLink}
              >
                Milvus_CLI
              </LocalizedLink>
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
          onChange={handleChange}
          lable="language"
          className={styles.langSelect}
          renderValue={(v) => {
            return (
              <>
                <FontAwesomeIcon className={styles.global} icon={faGlobe} />
                <span className={styles.globalText}>{v}</span>
              </>
            );
          }}
        >
          <MenuItem value="cn">
            <LocalizedLink locale="cn" to={path} key="cn">
              中文
            </LocalizedLink>
          </MenuItem>
          <MenuItem value="en">
            <LocalizedLink locale="en" to={path} key="en">
              English
            </LocalizedLink>
          </MenuItem>
        </Select>
        <button className={styles.startBtn}>Get Started</button>
      </div>
    </header>
  );

  return isMobile ? mobileHead : desktopHead;
};

export default Header;
