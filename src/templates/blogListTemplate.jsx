import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as styles from "./blogListTemplate.module.less";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { FILTER_TAG } from "../consts/index";
import BlogCard from "../components/card/BlogCard";

const BlogTemplate = ({ data, pageContext }) => {
  const { blogList, locale } = pageContext;
  const [currentTag, setCurrentTag] = useState("all");
  console.log(blogList);
  const featuredBlog = useMemo(() => blogList[0], [blogList]);

  // list of tags
  const tagList = useMemo(() => {
    const resObj = {
      all: "all",
    };
    blogList.forEach((item) => {
      const { tags } = item;
      tags.forEach((subItem) => {
        resObj[subItem] = subItem;
      });
    });
    return Object.keys(resObj);
  }, [blogList]);

  const renderBlogList = useMemo(() => {
    if (currentTag === "all") return blogList;
    return blogList.filter((v) => v.tags.includes(currentTag));
  }, [currentTag, blogList]);

  const filterByTag = useCallback(
    (tag) => {
      setCurrentTag(tag);
      if (tag === "all") {
        // setCurrentPageList(getCurrentPageArray(blogList, 1));
        // setPageIndex(1);
        // setPaginationConfig({
        //   total: blogList.length,
        //   pageSize: PAGE_SIZE,
        //   pageIndex: 1,
        // });
        return;
      }
      // const filteredArray = blogList.filter((i) => i.tags.includes(tag));
      // setFilteredArray(filteredArray);
      // setPageIndex(1);
      // setCurrentPageList(getCurrentPageArray(filteredArray, 1));
      // setPaginationConfig({
      //   total: filteredArray.length,
      //   pageSize: PAGE_SIZE,
      //   pageIndex: 1,
      // });
    },
    [blogList]
  );

  const handleFilter = useCallback(
    (tag, isRestore = true) => {
      window.history.pushState(null, null, `?page=1#${tag}`);
      isRestore && window.sessionStorage.setItem(FILTER_TAG, tag);
      filterByTag(tag);
    },
    [filterByTag]
  );

  return (
    <div className={`${styles.listWrapper} col-12 col-8 col-4`}>
      <section className={`${styles.featuredBlog} `}>
        <img src={`https://${featuredBlog.cover}  `} className="col-8 col-4" />
        <div className={styles.featuredBlogContent}>
          <p className={styles.tag}>SCENARIOS</p>
          <p className={styles.title}>
            Milvus in IP Protection：Building a Trademark Similarity Search
            System with Milvus
          </p>
          <p className={styles.desc}>
            Quickly Test and Deploy Vector Search Solutions with the Milvus 2.0
            Bootcamp
          </p>
        </div>
      </section>

      <section className={styles.blogList}>
        <p className={styles.title}>More Articles</p>
        <ul className={styles.tagsWrapper}>
          {tagList.map((tag) => (
            <li
              key={tag}
              role="button"
              onClick={() => handleFilter(tag)}
              onKeyDown={() => handleFilter(tag)}
              className={`${currentTag === tag ? styles.active : ""}`}
            >
              {tag}
            </li>
          ))}
        </ul>
        <ul>
          {renderBlogList.map((v, index) => {
            const { desc, cover, date, tags, title, id } = v;
            console.log(id);
            return (
              <li key={index} className={styles.blogcard}>
                <BlogCard
                  locale={locale}
                  title={title}
                  date={date}
                  cover={`https://${cover}`}
                  desc={desc}
                  tags={tags}
                  path={`${id}?#${currentTag}`}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default BlogTemplate;
