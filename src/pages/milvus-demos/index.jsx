import React, { useState } from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import {
  Link,
  Trans,
  useI18next,
  I18nextContext,
} from "gatsby-plugin-react-i18next";
import DemoCard from '../../components/card/DemoCard';
import * as styles from './index.module.less';
import imageSearch from '../../images/demos/image-search.png';
import chemical from '../../images/demos/chemical-search.svg';
import chatBot from '../../images/demos/chat-bots.svg';
import Github from '../../images/demos/github.svg';
import Forum from '../../images/demos/forum.svg';
import { CustomizedDialogs } from '../../components/dialog/Dialog';

const DEMOS = [
  {
    name: 'Image Search',
    desc: 'Images made searchable. Instantaneously return the most similar images from a massive database.',
    // link: 'http://35.166.123.214:8004/#/',
    href: '/milvus-demos/reverse-image-search',
    cover: imageSearch,
    videoSrc: 'https://www.youtube.com/watch?v=hkU9hJnhGsU',
    lowerCaseName: 'image search',
  },
  {
    name: 'Chatbots',
    desc: 'Interactive digital customer service that saves users time and businesses money.',
    href: 'http://35.166.123.214:8005/',
    cover: chatBot,
    videoSrc: 'https://www.youtube.com/watch?v=UvhL2vVZ-f4',
    lowerCaseName: 'chatbots',
  },
  {
    name: 'Chemical Structure Search',
    desc: 'Blazing fast similarity search, substructure search, or superstructure search for a specified molecule.',
    href: 'http://35.166.123.214:8002/',
    cover: chemical,
    videoSrc: 'https://www.youtube.com/watch?v=4u_RZeMBTNI',
    lowerCaseName: 'chemical',
  },
];

const DemoPage = ({ pageContext }) => {
  const { locale } = pageContext;
  const [open, setOpen] = useState(false);
  return (
    <main className={styles.main}>
      {
        // use for seo
      }
      <h1 style={{ display: 'none' }}>Milvus Demos</h1>
      <Layout darkMode={true} locale={locale}>
        <section className={styles.banner}>
          <h2>Milvus makes it easy to add similarity <br /> search to your applications.</h2>
          <p>Store, index, and manage massive embedding vectors generated by <br /> deep neural networks and other machine learning (ML) models.</p>
        </section>
        <section className={styles.content}>
          <ul className={styles.demoList}>
            {
              DEMOS.map((demo, index) => (
                <li>
                  <DemoCard key={demo.name} {...demo} index={index} />
                </li>
              ))
            }
          </ul>
          <div className={styles.milvusCommunity}>
            <div className={styles.drawWrapper}>
              <div className={styles.draw}>
                <div className={styles.mask}></div>
              </div>
            </div>
            <div className={styles.join}>
              <h2>Join Milvus<br /> community</h2>
              <p>We appreciate and encourage you to join the Milvus <br /> community and make contributions altogether.</p>
            </div>
            <div className={styles.socialMedia}>
              <div className={styles.logo}>
                <img src={Github} alt="" />
                <span>Github</span>
              </div>

              <p>Dive into the source code.</p>
              <Link className={styles.mediaLink} href="https://bit.ly/3Ct2dKo">Join Now</Link>
            </div>
            <div className={styles.socialMedia}>
              <div className={styles.logo}>
                <img src={Forum} alt="" />
                <span>Forum</span>
              </div>

              <p>Dive into the source code.</p>
              <Link className={styles.mediaLink} href="https://bit.ly/3H7KOuu">Join Now</Link>
            </div>
          </div>
        </section>
        <section className={styles.subscribe}>
          <div className={`${styles.whiteBlock} ${styles.topBlock}`}></div>
          <div className={`${styles.whiteBlock} ${styles.btmBlock}`}></div>
          <div className={styles.inner}>
            <div class={styles.section}>
              <h2>Sign up for our newsletter</h2>
              <p>Monthly hand-picked discoveries and stories of thriving<br /> technologies in a new world of data.</p>
            </div>
            <div class={styles.section}>
              <input type="text" placeholder="What’s your email?" />
              <button>Subscribe</button>
            </div>
          </div>

        </section>
      </Layout>
      <CustomizedDialogs open={open} handleClose={() => setOpen(false)} content={<div>hello</div>} />
    </main>
  );
};

export default DemoPage;

export const demoQuery = graphql`
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
