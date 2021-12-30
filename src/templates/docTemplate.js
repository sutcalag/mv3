import React, { useState, useEffect, useRef, useMemo } from "react";
import Layout from "../components/layout";
import LeftNav from "../components/docLeftNavigation";
import HorizontalBlogCard from "../components/card/HorizontalBlogCard";
// import Seo from '../components/seo';
import { graphql } from "gatsby";
import "highlight.js/styles/stackoverflow-light.css";
import "./docTemplate.less";
import Typography from "@mui/material/Typography";
import LocalizedLink from "../components/localizedLink/localizedLink";
import { useGithubCommits } from "../utils/hooks";
import RelatedQuestion from "../components/relatedQuestion";

// import useAlgolia from '../hooks/use-algolia';
// import QueryModal from '../components/query-modal/query-modal';
// import { sortVersions } from '../utils/docTemplate.util';
// import { NOT_SUPPORTED_VERSION } from '../config';
// import HomeTemplate from '../components/homeTemplate/homeTemplate';
// import {
//   useEmPanel,
//   useFilter,
//   useCodeCopy,
//   useMultipleCodeFilter,
// } from '../hooks/doc-dom-operation';
// import { useFormatAnchor, useGenAnchor } from '../hooks/doc-anchor';
// import ScoredFeedback from '../components/scoredFeedback';
// import { getGithubCommits } from '../http/http';
// import dayjs from 'dayjs';
// export default function Template({
//   data,
//   pageContext, // this prop will be injected by the GraphQL query below.
// }) {
//   let {
//     locale,
//     version,
//     versions,
//     headings = [],
//     allMenus,
//     isBlog,
//     isBenchmark = false,
//     editPath,
//     newHtml,
//     homeData,
//     allApiMenus,
//     newestVersion,
//     relatedKey,
//     old, // id of markdown
//     summary,
//     newestBlog,
//     homePath, // for home page to generate absolute link.
//   } = pageContext;
//   versions = versions.sort(sortVersions);
//   useEffect(() => {
//     window?.localStorage?.setItem('docVersion', version);
//   }, [version]);
//   const [showBack, setShowBack] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showWarning, setShowWarning] = useState(false);
//   const [commitInfo, setCommitInfo] = useState({
//     message: '',
//     date: '',
//     commitUrl: '',
//     source: '',
//   });

//   const docRef = useRef(null);
//   const commitPath = useMemo(() => {
//     return locale === 'en' ? `site/en/${editPath}` : `site/zh-CN/${editPath}`;
//   }, [locale, editPath]);

//   useEffect(() => {
//     if (isBenchmark || isBlog) return;

//     const fetchData = async () => {
//       const res = await getGithubCommits(commitPath, version);
//       if (res.status === 200 && res.data.length) {
//         const lastCommit = res.data[0];
//         const message = lastCommit.commit.message.split('\n')[0];
//         const date = lastCommit.commit.committer.date;
//         const commitUrl = lastCommit.html_url;
//         const formatDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
//         const source = `https://github.com/milvus-io/milvus-docs/blob/${version}/${commitPath}`;
//         setCommitInfo({ commitUrl, date: formatDate, source, message });
//       }
//     };
//     fetchData();
//   }, [commitPath, version, isBenchmark, isBlog]);

//   useEmPanel(setShowModal);
//   useGenAnchor(version, editPath);
//   useFilter();
//   useFormatAnchor();
//   useCodeCopy(locale);
//   useMultipleCodeFilter();

//   useEffect(() => {
//     const isLowVersion =
//       sortVersions(version, NOT_SUPPORTED_VERSION) > -1 &&
//       typeof window !== 'undefined' &&
//       !window.location.pathname.includes('data_migration');
//     setShowWarning(isLowVersion);
//   }, [version]);

//   const docsearchMeta = useAlgolia(locale, version, !isBlog);

//   if (!data.allFile.edges[0]) {
//     return null;
//   }

//   const layout = data.allFile.edges.filter(edge => edge.node.childI18N)[0].node
//     .childI18N.layout;

//   const {
//     feedback,
//     commit: commitTrans,
//     docHome: docHomeText,
//   } = data.allFile.edges.filter(edge => edge.node.childI18N)[0].node.childI18N
//     .v2;

//   const menuList = allMenus.find(
//     v =>
//       v.absolutePath.includes(version) &&
//       isBlog === v.isBlog &&
//       locale === v.lang
//   );

//   const { markdownRemark } = data; // data.markdownRemark holds our post data

//   let { frontmatter } = markdownRemark || {};

//   const nav = {
//     current: 'doc',
//   };
//   const iframeUrl = isBenchmark
//     ? `/benchmarks/${frontmatter.id.split('_')[1]}/index.html`
//     : '';
//   const idRegex = /id=".*?"/g;
//   if (locale === 'cn') {
//     if (newHtml) {
//       newHtml = newHtml.replace(idRegex, match =>
//         // eslint-disable-next-line
//         match.replace(/[？|、|，]/g, '')
//       );
//     }
//   }

//   const ifrmLoad = () => {
//     const ifrmContainer = document.querySelector('.iframe-container');
//     const ifrm = document.querySelector('#benchmarkIframe');
//     // const size = ifrm.contentWindow.document.body.getBoundingClientRect();
//     ifrm.style.height = '100%';
//     ifrmContainer.style.height = '100%';
//     setShowBack(!/index\.html/.test(ifrm.contentWindow.location.href));
//   };
//   const handleRefresh = () => {
//     const ifrm = document.querySelector('#benchmarkIframe');
//     if (ifrm) {
//       ifrm.contentWindow.location.href = ifrm.src;
//     }
//   };

//   const title = isBenchmark
//     ? `Milvus benchmark`
//     : newHtml === null
//     ? `Milvus documentation`
//     : `${headings[0] && headings[0].value}`;

//   const onOverlayClick = () => setShowModal(false);

//   return (
//     <Layout
//       language={layout}
//       locale={locale}
//       nav={nav}
//       current="doc"
//       pageContext={pageContext}
//       menuList={menuList}
//       version={version}
//       headings={headings.filter((h, i) => i > 0)}
//       mdTitle={title}
//       versions={versions}
//       newestVersion={newestVersion}
//       id={frontmatter ? frontmatter.id : 'home'}
//       isBenchMark={isBenchmark}
//       showDoc={false}
//       isBlog={isBlog}
//       isHome={newHtml === null}
//       editPath={editPath}
//       allApiMenus={allApiMenus}
//     >
//       <Seo
//         title={title}
//         lang={locale}
//         version={version}
//         meta={docsearchMeta}
//         description={summary}
//       />
//       {isBenchmark ? (
//         <div className="iframe-container">
//           {showBack && (
//             <i
//               tabIndex={0}
//               onKeyDown={handleRefresh}
//               role="button"
//               aria-label="Back"
//               className="fas iframe-icon fa-arrow-left"
//               onClick={handleRefresh}
//             ></i>
//           )}
//           <iframe
//             id="benchmarkIframe"
//             title="test"
//             width="100%"
//             src={iframeUrl}
//             onLoad={ifrmLoad}
//           ></iframe>
//         </div>
//       ) : (
//         <>
//           {homeData ? (
//             <HomeTemplate
//               data={homeData}
//               version={version}
//               locale={locale}
//               newestBlog={newestBlog}
//               homePath={homePath}
//               text={docHomeText}
//             />
//           ) : (
//             <div className="doc-post-container">
//               <>
//                 {showWarning && (
//                   <div className="alert warning">
//                     {locale === 'en'
//                       ? 'This version is no longer supported. For more information about migrating your data, see'
//                       : '该版本不再维护。如需进行数据迁移，请先参考'}
//                     <a
//                       href={
//                         locale === 'en'
//                           ? `/docs/migrate_overview.md`
//                           : `/cn/docs/migrate_overview.md`
//                       }
//                       alt="sign up milvus"
//                       rel="noreferrer noopener"
//                       style={{
//                         margin: '0 6px',
//                       }}
//                     >
//                       {locale === 'en'
//                         ? 'Compatibility Information.'
//                         : '兼容性信息。'}
//                     </a>
//                   </div>
//                 )}
//                 <div className="doc-post">
//                   {/* <a
//                     className="alert survey"
//                     href={locale === 'en' ? 'https://milvus.typeform.com/to/EgMCxy2T' : 'https://milvus.typeform.com/to/GM5f8HOe'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <span>some words</span>
//                   </a> */}
//                   <div
//                     className="doc-post-content"
//                     ref={docRef}
//                     dangerouslySetInnerHTML={{ __html: newHtml }}
//                   />
//                   <RelatedQuestion relatedKey={relatedKey} layout={layout} />
//                 </div>
//                 {commitInfo.message && (
//                   <div className="commit-info-wrapper">
//                     <>
//                       <a
//                         target="_blank"
//                         rel="noreferrer"
//                         href={commitInfo.source}
//                       >
//                         {old}
//                       </a>
//                       <span>
//                         {commitTrans} {commitInfo.date}:{' '}
//                       </span>
//                       <a
//                         target="_blank"
//                         rel="noreferrer"
//                         href={commitInfo.commitUrl}
//                       >
//                         {commitInfo.message}
//                       </a>
//                     </>
//                   </div>
//                 )}

//                 <ScoredFeedback feedbackText={feedback} old={old} />
//               </>
//             </div>
//           )}
//         </>
//       )}

//       {showModal ? (
//         <div>
//           <div
//             className="overlay"
//             tabIndex="0"
//             role="button"
//             aria-label="close dialog"
//             onKeyDown={onOverlayClick}
//             onClick={onOverlayClick}
//           ></div>
//           <QueryModal locale={locale} setShowModal={setShowModal} />
//         </div>
//       ) : null}
//     </Layout>
//   );
// }

// export const pageQuery = graphql`
//   query ($locale: String, $old: String, $fileAbsolutePath: String) {
//     markdownRemark(
//       fileAbsolutePath: { eq: $fileAbsolutePath }
//       frontmatter: { id: { eq: $old } }
//     ) {
//       frontmatter {
//         title
//       }
//     }
//     allFile(
//       filter: {
//         name: { eq: $locale }
//         relativeDirectory: { regex: "/(?:layout)/" }
//       }
//     ) {
//       edges {
//         node {
//           relativeDirectory
//         }
//       }
//     }
//   }
// `;
export const pageQuery = graphql`
  query ($locale: String, $fileAbsolutePath: String) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      frontmatter {
        title
      }
    }
    allFile(
      filter: {
        name: { eq: $locale }
        relativeDirectory: { regex: "/(?:layout)/" }
      }
    ) {
      edges {
        node {
          relativeDirectory
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
    menuConfig.menuList.find((menu) => menu.lang === locale)?.menuList || [];
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
  const commitInfo = {};

  return (
    <Layout>
      <div className="container">
        <LeftNav
          homeUrl={leftNavHomeUrl}
          homeLabel={versionConfig.homeTitle}
          menus={leftNavMenus}
          apiMenus={allApiMenus}
          pageType="doc"
          currentVersion={version}
          locale={locale}
          docVersions={versionConfig.versions}
          // className="doc-home-left-nav"
        />
        <div className="doc-content-container">
          {homeData ? (
            <HomeContent homeData={homeData} newestBlog={newestBlog} />
          ) : (
            <DocContent
              htmlContent={mdHtml}
              commitInfo={commitInfo}
              mdId={mdId}
              relatedKey={relatedKey}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

const HomeContent = (props) => {
  const { homeData, newestBlog = [] } = props;
  return (
    <>
      <div
        className="doc-home-html-Wrapper"
        dangerouslySetInnerHTML={{ __html: homeData }}
      />
      <Typography component="section" className="doc-home-blog">
        <Typography variant="h2" component="h2">
          Blog
        </Typography>
        <HorizontalBlogCard blogData={newestBlog[0]} />
      </Typography>
    </>
  );
};

const GitCommitInfo = (props) => {
  const { commitInfo = {}, mdId, commitTrans = "" } = props;
  return (
    <div className="commit-info-wrapper">
      <>
        <a target="_blank" rel="noreferrer" href={commitInfo.source}>
          {mdId}
        </a>
        <span>
          {commitTrans} {commitInfo.date}:{" "}
        </span>
        <a target="_blank" rel="noreferrer" href={commitInfo.commitUrl}>
          {commitInfo.message}
        </a>
      </>
    </div>
  );
};

const DocContent = (props) => {
  const { htmlContent, commitInfo, mdId, faq, relatedKey } = props;
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
            title={faqMock.question.title}
            contact={faqMock.contact}
            relatedKey={relatedKey}
          />
        )}
        {commitInfo?.message && (
          <GitCommitInfo commitInfo={commitInfo} mdId={mdId} />
        )}
      </div>
    </>
  );
};
