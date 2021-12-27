import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as styles from "./blogListTemplate.module.less";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { FILTER_TAG, PAGE_INDEX } from "../consts/index";
import BlogCard from "../components/card/BlogCard";
import Pagination from "../components/pagination";
import Tags from "../components/tags";
import { globalHistory } from "@reach/router";

const PAGE_SIZE = 6;

const getCurrentPageArray = (list, pageIndex) =>
  list.slice((pageIndex - 1) * PAGE_SIZE, pageIndex * PAGE_SIZE);

const BlogTemplate = ({ data, pageContext }) => {
  const { blogList, locale } = pageContext;
  const [currentTag, setCurrentTag] = useState("all");
  const [pageIndex, setPageIndex] = useState(1);
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

  const { renderBlogList, total } = useMemo(() => {
    if (currentTag === "all")
      return {
        total: blogList.length,
        renderBlogList: getCurrentPageArray(blogList, pageIndex),
      };
    const list = blogList.filter((v) => v.tags.includes(currentTag));
    return {
      total: list.length,
      renderBlogList: getCurrentPageArray(list, pageIndex),
    };
  }, [currentTag, blogList, pageIndex]);

  const filterByTag = useCallback(
    (tag) => {
      setCurrentTag(tag);
      setPageIndex(1);
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

  const handlePagination = useCallback(
    (idx, isRestore = true) => {
      window.history.pushState(null, null, `?page=${idx}#${currentTag}`);
      isRestore && window.sessionStorage.setItem(PAGE_INDEX, idx);
      setPageIndex(idx);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [currentTag]
  );

  useEffect(() => {
    const { search, hash } = globalHistory.location;

    const pageIdx = search.replace(/\?page=/g, "") || 1;
    const tag = hash.replace(/#/g, "") || "all";

    setCurrentTag(tag);
    setPageIndex(parseInt(pageIdx));
  }, []);

  return (
    <div className={`${styles.listWrapper} col-12 col-8 col-4`}>
      {/* screen > 1024  */}

      <section className={`${styles.featuredBlog} `}>
        <div className={`${styles.featuredImg}  col-6`}>
          <img src={`https://${featuredBlog.cover}  `} />
        </div>
        <div className={styles.featuredBlogContent} className="col-7">
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
      {/* tablet phone, screen <= 1024  */}
      <BlogCard
        className={styles.mobileFeatured}
        locale={locale}
        title={featuredBlog.title}
        date={featuredBlog.date}
        cover={`https://${featuredBlog.cover}`}
        desc={featuredBlog.desc}
        tags={featuredBlog.tags}
        path={`${featuredBlog.id}`}
      />

      <section className={styles.blogList}>
        <p className={styles.title}>More Articles</p>
        <Tags
          list={tagList}
          tagsClass={styles.tagsWrapper}
          genTagClass={(tag) => (currentTag === tag ? styles.active : "")}
          onClick={handleFilter}
        />

        <ul className={styles.blogCards}>
          {renderBlogList.map((v, index) => {
            const { desc, cover, date, tags, title, id } = v;
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
        <Pagination
          total={total}
          pageIndex={pageIndex}
          pageSize={PAGE_SIZE}
          handlePageIndexChange={handlePagination}
        />
      </section>
    </div>
  );
};

export default BlogTemplate;
