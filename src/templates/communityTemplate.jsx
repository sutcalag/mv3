import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { useWindowSize } from "../http/hooks";
import "./communityTemplate.less";
import LeftNav from "../components/docLeftNavigation";
import TocTreeView from "../components/treeView/TocTreeView";

export default function Template({ data, pageContext }) {
  const {
    locale,
    fileAbsolutePath,
    html,
    headings,
    menuList,
    activePost,
    editPath,
    isCommunity,
  } = pageContext;

  // console.log(pageContext);

  const currentWindowSize = useWindowSize();
  const isMobile = ["phone", "tablet"].includes(currentWindowSize);
  const isPhone = ["phone"].includes(currentWindowSize);
  const desktop1024 = ["desktop1024"].includes(currentWindowSize);
  const { language, t } = useI18next();

  const isHomePage = activePost === "home.md";
  const leftNavMenus =
    menuList?.find((menu) => menu.lang === locale)?.menuList || [];

  return (
    <Layout t={t}>
      <div
        className={clsx("community-container", {
          [`is-desktop1024`]: desktop1024,
          [`is-mobile`]: isMobile,
          [`is-phone`]: isPhone,
          [`home`]: isHomePage,
        })}
      >
        <LeftNav
          // homeUrl={`/community`}
          // homeLabel={t("v3trans.docs.homeTitle")}
          menus={leftNavMenus}
          apiMenus={[]}
          pageType="community"
          currentVersion={""}
          locale={locale}
          docVersions={[]}
          mdId={isHomePage ? "community" : activePost}
          isMobile={isMobile}
          language={language}
          trans={t}
        />
        <div
          className={clsx("community-content-container", {
            docHome: isHomePage,
            [`is-mobile`]: isMobile,
          })}
        >
          <div
            className={clsx({
              [`community-home-html-Wrapper`]: isHomePage,
              [`doc-post-content`]: !isHomePage,
            })}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        {!isPhone && !!headings?.length && (
          <TocTreeView
            items={headings}
            title={t("v3trans.docs.tocTitle")}
            className="doc-toc-container"
          />
        )}
      </div>
    </Layout>
  );
}
