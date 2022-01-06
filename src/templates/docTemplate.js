import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../components/layout";
import LeftNav from "../components/leftNavigation";
import HorizontalBlogCard from "../components/card/HorizontalBlogCard";
import { graphql } from "gatsby";
import "highlight.js/styles/stackoverflow-light.css";
import "./docTemplate.less";
import "./commonDocTemplate.less";
import Typography from "@mui/material/Typography";
import { useGithubCommits } from "../http/hooks";
import RelatedQuestion from "../components/relatedQuestion";
import ScoredFeedback from "../components/scoredFeedback";
import TocTreeView from "../components/treeView/TocTreeView";
import clsx from "clsx";
import { useWindowSize } from "../http/hooks";

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          data
          language
          ns
        }
      }
    }
  }
`;

export default function Template({ data, pageContext }) {
  const {
    locale,
    version,
    versions,
    headings = [],
    allMenus,
    isBlog,
    isBenchmark = false,
    editPath,
    newHtml: mdHtml,
    homeData,
    allApiMenus,
    newestVersion,
    relatedKey,
    old: mdId,
    summary,
    newestBlog,
    homePath,
  } = pageContext;

  const currentWindowSize = useWindowSize();
  const isMobile = ["phone", "tablet"].includes(currentWindowSize);
  const isPhone = ["phone"].includes(currentWindowSize);
  const desktop1024 = ["desktop1024"].includes(currentWindowSize);
  const { language, t } = useI18next();

  const menuList = allMenus.find(
    (v) =>
      v.absolutePath.includes(version) &&
      isBlog === v.isBlog &&
      locale === v.lang
  );
  const id = "home";
  const menuConfig = menuList && {
    menuList: [
      {
        lang: menuList.lang,
        menuList: menuList.menuList,
      },
    ],
    activePost: id.split("-")[0],
    isBlog: menuList.isBlog,
    formatVersion: version === "master" ? newestVersion : version,
  };
  const versionConfig = {
    homeTitle: "Docs Home",
    version,
    // filter master version
    versions: versions.filter((v) => v !== "master"),
  };
  const leftNavMenus =
    menuConfig?.menuList?.find((menu) => menu.lang === locale)?.menuList || [];
  const leftNavHomeUrl =
    version === `v0.x` ? `/docs/v0.x/overview.md` : `/docs/${version}`;

  const commitPath = useMemo(() => {
    return locale === "en" ? `site/en/${editPath}` : `site/zh-CN/${editPath}`;
  }, [locale, editPath]);
  const isDoc = !(isBlog || isBenchmark);
  // const commitInfo = useGithubCommits({
  //   commitPath,
  //   version,
  //   isDoc,
  // });
  //! TO REMOVE
  const commitInfo = {
    commitUrl:
      "https://github.com/milvus-io/milvus-docs/commit/f0e455fd80e4585d7bacdf30e35c3938a8e8ba49",
    date: "2021-12-24 07:31:25",
    source:
      "https://github.com/milvus-io/milvus-docs/blob/v2.0.0/site/en/about/overview.md",
    message: "Update overview.md",
  };

  return (
    <Layout t={t}>
      <div
        className={clsx("doc-temp-container", {
          [`is-desktop1024`]: desktop1024,
          [`is-mobile`]: isMobile,
          [`is-phone`]: isPhone,
          [`home`]: homeData,
        })}
      >
        <LeftNav
          homeUrl={leftNavHomeUrl}
          homeLabel={t("v3trans.docs.homeTitle")}
          menus={leftNavMenus}
          apiMenus={allApiMenus}
          pageType="doc"
          currentVersion={version}
          locale={locale}
          docVersions={versionConfig.versions}
          mdId={mdId}
          isMobile={isMobile}
          language={language}
          trans={t}
        />
        <div
          className={clsx("doc-content-container", {
            [`doc-home`]: homeData,
            [`is-mobile`]: isMobile,
          })}
        >
          {homeData ? (
            <HomeContent
              homeData={homeData}
              newestBlog={newestBlog}
              trans={t}
            />
          ) : (
            <DocContent
              htmlContent={mdHtml}
              commitInfo={commitInfo}
              mdId={mdId}
              relatedKey={relatedKey}
              isMobile={isMobile}
              trans={t}
            />
          )}
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

const HomeContent = (props) => {
  const { homeData, newestBlog = [], trans } = props;
  return (
    <>
      <div
        className="doc-home-html-Wrapper"
        dangerouslySetInnerHTML={{ __html: homeData }}
      />
      <Typography component="section" className="doc-home-blog">
        <Typography variant="h2" component="h2">
          {trans("v3trans.docs.blogTitle")}
        </Typography>
        <HorizontalBlogCard blogData={newestBlog[0]} />
      </Typography>
    </>
  );
};

const GitCommitInfo = (props) => {
  const { commitInfo = {}, mdId, commitTrans = "was last updated at" } = props;
  return (
    <div className="commit-info-wrapper">
      <a target="_blank" rel="noreferrer" href={commitInfo.source}>
        {mdId}
      </a>
      <span>{` ${commitTrans} ${commitInfo.date}: `}</span>
      <a target="_blank" rel="noreferrer" href={commitInfo.commitUrl}>
        {commitInfo.message}
      </a>
    </div>
  );
};

const DocContent = (props) => {
  const { htmlContent, commitInfo, mdId, faq, relatedKey, isMobile, trans } =
    props;
  //! TO REMOVE
  const faqMock = {
    contact: {
      slack: {
        label: "Discuss on Slack",
        link: "https://slack.milvus.io/",
      },
      github: {
        label: "Discuss on GitHub",
        link: "https://github.com/milvus-io/milvus/issues/",
      },
      follow: {
        label: "Follow up with me",
      },
      dialog: {
        desc: "Please leave your question here and we will be in touch.",
        placeholder1: "Your Email*",
        placeholder2: "Your Question*",
        submit: "Submit",
        title: "We will follow up on your question",
        invalid: "please input valid email and your question",
      },
      title: "Didn't find what you need?",
    },
    question: {
      title: "Most Related Questions",
    },
  };
  return (
    <>
      <div>
        <div
          className="doc-post-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        {faqMock && (
          <RelatedQuestion
            title={trans("v3trans.docs.faqTitle")}
            contact={faqMock.contact}
            relatedKey={relatedKey}
            isMobile={isMobile}
            trans={trans}
          />
        )}
        {commitInfo?.message && (
          <GitCommitInfo
            commitInfo={commitInfo}
            mdId={mdId}
            commitTrans={trans("v3trans.docs.commitTrans")}
          />
        )}
        <ScoredFeedback trans={trans} pageId={mdId} />
      </div>
    </>
  );
};
