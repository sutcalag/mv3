import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as styles from "./blogTemplate.module.less";
// import Seo from '../components/seo';
// import Footer from '../components/footer/v2';
import Layout from "../components/layout";
import Tags from "../components/tags";
import dayjs from "dayjs";

export default function Template({ data, pageContext }) {
  const {
    blogList,
    locale,
    newHtml,
    author,
    date,
    tags,
    origin,
    title,
    id,
    desc,
    cover,
  } = pageContext;

  const dateTime = useMemo(() => dayjs(date).format("YYYY-MM-DD"), [date]);
  // for seo
  // const canonicalLink = origin
  //   ? {
  //       rel: "canonical",
  //       href: `https://${origin}`,
  //     }
  //   : {};

  return (
    <>
      <div
        className={styles.blogImg}
        style={{ backgroundImage: `url("https://${cover}")` }}
      ></div>
      <section className={`${styles.blogWrapper} col-12 col-8 col-4`}>
        <p className={`${styles.authorDate} `}>
          <span>{dateTime}</span>
          {author && <span>by {author}</span>}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <Tags list={tags} tagsClass={`${styles.tags} col-8`} />
        <section className={`${styles.desc} col-8`}>
          <span className={styles.line}></span>
          <span>{desc}</span>
        </section>

        <div
          className={`${styles.articleContent} col-8`}
          dangerouslySetInnerHTML={{ __html: newHtml }}
        ></div>
      </section>
    </>
  );
}
