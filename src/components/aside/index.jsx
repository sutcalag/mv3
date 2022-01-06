import React from 'react';
import TocTreeView from '../treeView/TocTreeView';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faBug, faHashtag, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import * as styles from './index.module.less';

const result = {
  doc: {},
  api: {},
  community: {
    edit: {
      icon: 'pencil',
      label: 'edit this page',
      href: 'https://github.com/milvus-io/web-content/edit/master/community/site/en/communityArticles/about/why_contributing.md'
    },
    bug: {
      icon: 'bug',
      label: 'report a bug',
      link: 'https://github.com/milvus-io/web-content/issues/new?assignees=&labels=&template=error-report.md&title=why_contributing.md'
    },
    join: {
      icon: 'tag',
      label: 'join slack channel',
      link: 'https://milvusio.slack.com/ssb/redirect'
    }
  }
};

const Aside = (props) => {
  const {
    category = "doc",
    items,
    title,
    className = '',
    locale,
    version,
    editPath,
    mdTitle
  } = props;
  const { langugae, t } = useI18next();

  // editBtn issueBtn; bugBtn; suggestBtn; joinBtn
  const [commonEditBtn, issueBtn, bugBtn, suggestBtn, discussBtn, commonJoinBtn] = [
    {
      label: t(editBtn.label),
      icon: faPencilAlt,
    },
    {
      label: t(issueBtn.label),
      icon: faBug,
    },
    {
      label: t(bugBtn.label),
      icon: faBug,
    },
    {
      label: t(suggestBtn.label),
      icon: faLightbulb,
    },
    {
      label: t(discussBtn.label),
      icon: faGithub,
    },
    {
      label: t(joinBtn.label),
      icon: faHashtag,
    },

  ];
  const btnConfiguration = {
    doc: ({ locale, version, editPath, mdTitle }) => {
      const name = editPath.split('/').pop();
      const title = `${version} ${mdTitle} (${name}) Doc Update`;

      return {
        editBtn: {
          label: commonEditBtn.label,
          link: `https://github.com/milvus-io/milvus-docs/edit/${version}/site/${locale === 'en' ? 'en' : 'zh-CN'
            }/${editPath}`,
          icon: commonEditBtn.icon,
        },
        issueBtn: {
          label: issueBtn.label,
          link: `https://github.com/milvus-io/milvus-docs/issues/new?assignees=&labels=&template=--error-report.yaml&title=${title}`,
          icon: issueBtn.icon,
        },
        suggestBtn: {
          label: suggestBtn.label,
          link: 'https://github.com/milvus-io/milvus-docs/issues/new?assignees=&labels=&template=--new-content-proposal.yaml&title=New Doc Proposal',
          icon: suggestBtn.icon,
        }
      };
    },
    api: ({ apiReferenceData }) => {
      const { projName, relativePath, sourceUrl } = apiReferenceData;
      const title = `${projName},${version},${relativePath}`;
      return {
        editBtn: {
          label: commonEditBtn.label,
          link: sourceUrl,
          icon: commonEditBtn.icon,
        },
        discussBtn: {
          label: discussBtn.label,
          link: 'https://github.com/milvus-io/milvus/discussions/new',
          icon: discussBtn.icon,
        },
        bugBtn: {
          label: bugBtn.label,
          link: `https://github.com/milvus-io/milvus/issues/new?assignees=&labels=&template=bug_report.md&title=${title}`,
          icon: bugBtn.icon,
        },
      };
    },
    community: ({ locale, editPath, id }) => ({
      editBtn: {
        label: commonEditBtn.label,
        link: `https://github.com/milvus-io/web-content/edit/master/community/site/${locale === 'en' ? 'en' : 'zh-CN'
          }/${editPath}`,
        icon: commonEditBtn.icon,
      },
      bugBtn: {
        label: bugBtn.label,
        link: 'https://github.com/milvus-io/web-content/discussions/new',
        icon: bugBtn.icon,
      },
    }),
  };

  const generateBtnroup = (category, props) => {
    const btns = btnConfiguration[category](props);
    return (
      <>
        {
          btns.map(btn => (
            <a href={btn.link}>
              <FontAwesomeIcon className={styles.global} icon={btn.icon} />
              <span>{btn.label}</span>
            </a>
          ))
        }
      </>
    );
  };
  return (
    <section className="">
      <div className=''>
        {
          generateBtnroup(category, props)
        }
      </div>
      <TocTreeView
        items={items}
        title={title}
        className={className}
      />
    </section>

  );

};
export default Aside;
