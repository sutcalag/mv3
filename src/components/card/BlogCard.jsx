import React, { useState, useRef, useEffect } from "react";
import LocalizedLink from "../localizedLink/localizedLink";
import * as styles from "./BlogCard.module.less";
const BlogCard = ({ title, desc, tags, cover, locale, path, className }) => {
  const to = `/blog/${path}`;

  return (
    <div
      locale={locale}
      to={to}
      className={`${styles.BlogCardWrapper} ${className}`}
    >
      <div
        className={styles.coverWrapper}
        style={{ backgroundImage: `url(${cover})` }}
      ></div>
      <div className={styles.descWrapper}>
        <div className={styles.bottomWrapper}>
          <ul className={styles.tags}>
            {tags.slice(0, 2).map((tag) => {
              return <li key={tag}>{tag}</li>;
            })}
          </ul>
        </div>
        <h6 className={styles.title}>{title}</h6>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  );
};

export default BlogCard;
