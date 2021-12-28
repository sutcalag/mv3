import React, { useState } from "react";

import LocalizedLink from "../localizedLink/localizedLink";
import Menu from "../menu/index";
import * as styles from "./sidebar.module.less";
import PropTypes from "prop-types";
import Selector from "../selector";
// import { AlgoliaSearch } from '../search/algolia';

const Sidebar = (props) => {
  const {
    locale,
    showSearch = true,
    showVersions = false,
    showMenu = true,
    menuConfig,
    versionConfig,
    wrapperClass = "",
    allApiMenus,
    isVersionWithHome = false,
  } = props;

  const { versions, version, homeTitle } = versionConfig || {};
  const {
    menuList,
    activePost,
    pageType,
    formatVersion,
    isBlog = false,
  } = menuConfig || {};

  const { menuList: menus } = (menuList &&
    menuList.find((menu) => menu.lang === locale)) || {
    menuList: [],
  };

  const map = isVersionWithHome
    ? {
        en: `/docs/${version}`,
        cn: `/docs/${version}`,
      }
    : {
        en: `/docs/${version}/overview.md`,
        cn: `/docs/${version}/overview.md`,
      };
  const homePath = map[locale];

  const [mobileSidebarOpened, setMobileSidebarOpened] = useState(false);

  const onMaskClick = () => {
    setMobileSidebarOpened(false);
  };

  const toggleControl = () => {
    setMobileSidebarOpened(!mobileSidebarOpened);
  };

  // Close menu after click search icon in mobile
  const handleAsideClick = (e) => {
    if (e.target.className.includes("DocSearch")) {
      setMobileSidebarOpened(false);
    }
  };

  return (
    <>
      <aside
        className={`${wrapperClass} ${styles.wrapper} ${
          !mobileSidebarOpened ? styles.hide : ""
        }`}
        onClick={handleAsideClick}
      >
        {/* {showSearch && <AlgoliaSearch locale={locale} version={version} />} */}
        {showVersions && (
          <Selector
            className={styles.selector}
            options={versions}
            locale={locale}
            selected={version}
            isVersion={true}
          />
        )}
        <LocalizedLink className={styles.docHome} locale={locale} to={homePath}>
          {homeTitle}
        </LocalizedLink>
        {showMenu && (
          <Menu
            locale={locale}
            menuList={menus}
            activePost={activePost}
            pageType={pageType}
            formatVersion={formatVersion}
            isBlog={isBlog}
            allApiMenus={allApiMenus}
            showSearch={showSearch}
            showVersions={showVersions}
          />
        )}
      </aside>
      <button
        className={
          mobileSidebarOpened
            ? `${styles.miniControl} ${styles.miniControlOpen}`
            : styles.miniControl
        }
        onClick={toggleControl}
      >
        {""}
      </button>
      {mobileSidebarOpened && (
        <div
          className={styles.mask}
          onClick={onMaskClick}
          role="presentation"
        ></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  locale: PropTypes.string.isRequired,
  showSearch: PropTypes.bool,
  showVersions: PropTypes.bool,
  showMenu: PropTypes.bool,
  menuConfig: PropTypes.object,
  versionConfig: PropTypes.object,
  // searchConfig: PropTypes.object,
};

export default Sidebar;