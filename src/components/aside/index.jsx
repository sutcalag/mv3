import React from 'react';
import TocTreeView from '../treeView/TocTreeView';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faBug, faHashtag, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
  const { label, href, type, locale } = props;
  return (
    <section className="">
      <div className=''>

      </div>
      <TocTreeView {...props} />
    </section>

  );

};
export default Aside;
