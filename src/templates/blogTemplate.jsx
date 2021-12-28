import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as styles from "./blogTemplate.module.less";
// import Seo from '../components/seo';
// import Footer from '../components/footer/v2';
import Layout from "../components/layout";
import Tags from "../components/tags";
import BlogCard from "../components/card/BlogCard";
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

  const dateTime = useMemo(() => dayjs(date).format("MMMM DD, YYYY"), [date]);
  const moreBlogs = useMemo(() =>
    blogList
      .filter((v) => v.tags.some((tag) => tags.includes(tag) && v.id !== id))
      .slice(0, 3)
  );
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
      <section className={`${styles.moreBlog} col-12 col-8 col-4`}>
        <h2>Keep Reading</h2>
        <ul className={styles.blogCards}>
          {moreBlogs.map((v, index) => {
            const { desc, cover, date, tags, title, id } = v;
            return (
              <li key={index}>
                <BlogCard
                  locale={locale}
                  title={title}
                  date={date}
                  cover={`https://${cover}`}
                  desc={desc}
                  tags={tags}
                  path={`${id}`}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
