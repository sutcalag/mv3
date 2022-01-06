import React, { useState, useRef } from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import DemoCard from "../../components/card/DemoCard";
import * as styles from "./index.module.less";
import imageSearch from "../../images/demos/image-search.png";
import chemical from "../../images/demos/chemical-search.svg";
import chatBot from "../../images/demos/chat-bots.svg";
import Github from "../../images/demos/github.svg";
import Forum from "../../images/demos/forum.svg";
import { CustomizedContentDialogs } from "../../components/dialog/Dialog";
import { CustomizedSnackbars } from "../../components/snackBar";
import { useWindowSize } from "../../http/hooks";
import { submitInfoForm } from "../../http/submitEmail";

const DEMOS = [
  {
    name: "Image Search",
    desc: "Images made searchable. Instantaneously return the most similar images from a massive database.",
    // link: 'http://35.166.123.214:8004/#/',
    href: "/milvus-demos/reverse-image-search",
    cover: imageSearch,
    videoSrc: "https://www.youtube.com/watch?v=hkU9hJnhGsU",
    lowerCaseName: "image search",
  },
  {
    name: "Chatbots",
    desc: "Interactive digital customer service that saves users time and businesses money.",
    href: "http://35.166.123.214:8005/",
    cover: chatBot,
    videoSrc: "https://www.youtube.com/watch?v=UvhL2vVZ-f4",
    lowerCaseName: "chatbots",
  },
  {
    name: "Chemical Structure Search",
    desc: "Blazing fast similarity search, substructure search, or superstructure search for a specified molecule.",
    href: "http://35.166.123.214:8002/",
    cover: chemical,
    videoSrc: "https://www.youtube.com/watch?v=4u_RZeMBTNI",
    lowerCaseName: "chemical",
  },
];

const UNIQUE_EMAIL_ID = "UNIQUE_EMAIL_ID";

const DemoPage = () => {
  const { t } = useI18next();
  const inputRef = useRef(null);
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    title: "",
    content: () => <></>,
  });

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    type: "info",
    message: "",
  });

  const currentSize = useWindowSize();
  const isMobile = ["phone", "tablet", "desktop1024"].includes(currentSize);

  const handleSubmitEmail = async () => {
    const regx =
      /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/;

    const value = inputRef.current.value;
    if (!regx.test(value)) {
      handleOpenSnackbar({
        type: "error",
        message: "Email format error",
      });
      return;
    }
    const { search } = window.location;
    const source = ["utm_source", "utm_medium", "utm_campaign"].every((v) =>
      search.includes(v)
    )
      ? "Ads：Reddit"
      : "Milvus：demo";

    try {
      const { statusCode, unique_email_id } = await submitInfoForm({
        email: value,
        form: {
          SOURCE: source,
        },
      });
      if (statusCode === 200) {
        window.localStorage.setItem(UNIQUE_EMAIL_ID, unique_email_id);
        handleOpenSnackbar({
          type: "success",
          message: "Thank you, you have been added to our mailing list!",
        });
        //
      } else {
        handleOpenSnackbar({
          type: "warning",
          message: "This email is already subscribed!",
        });
        window.localStorage.setItem(UNIQUE_EMAIL_ID, true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelOpenDialog = (content, title) => {
    setDialogConfig({
      open: true,
      title,
      content,
    });
  };

  const handleCloseDialog = () => {
    setDialogConfig({
      open: false,
      title: "",
      content: () => <></>,
    });
  };

  const handleOpenSnackbar = ({ message, type }) => {
    setSnackbarConfig({
      open: true,
      type,
      message,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarConfig({
      open: false,
      type: "info",
      message: "",
    });
  };

  return (
    <main className={styles.main}>
      {
        // use for seo
      }
      <h1 style={{ display: "none" }}>Milvus Demos</h1>
      <Layout darkMode={true} t={t}>
        <section className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2>
              Milvus makes it easy to add similarity {!isMobile && <br />}{" "}
              search to your applications.
            </h2>
            <p>
              Store, index, and manage massive embedding vectors generated by{" "}
              {!isMobile && <br />} deep neural networks and other machine
              learning (ML) models.
            </p>
          </div>
        </section>
        <section className={styles.content}>
          <ul className={styles.demoList}>
            {DEMOS.map((demo, index) => (
              <li key={demo.name}>
                <DemoCard
                  {...demo}
                  index={index}
                  handelOpenDialog={handelOpenDialog}
                  handleOpenSnackbar={handleOpenSnackbar}
                />
              </li>
            ))}
          </ul>
          <div className={styles.milvusCommunity}>
            <div className={styles.drawWrapper}></div>
            <div className={styles.leftPart}>
              <div className={styles.join}>
                <h2>Join Milvus{!isMobile && <br />} community</h2>
                <p>
                  We appreciate and encourage you to join the Milvus{" "}
                  {!isMobile && <br />} community and make contributions
                  altogether.
                </p>
              </div>
            </div>

            <div className={styles.rightPart}>
              <div className={styles.socialMedia}>
                <div className={styles.logo}>
                  <img src={Github} alt="" />
                  <span>Github</span>
                </div>

                <p>Dive into the source code.</p>
                <a
                  className={styles.mediaLink}
                  href="https://bit.ly/3Ct2dKo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                </a>
              </div>
              <div className={styles.socialMedia}>
                <div className={styles.logo}>
                  <img src={Forum} alt="" />
                  <span>Forum</span>
                </div>

                <p>Dive into the source code.</p>
                <a
                  className={styles.mediaLink}
                  href="https://bit.ly/3H7KOuu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.subscribe}>
          <div className={styles.inner}>
            <div className={styles.section}>
              <h2>Sign up for our newsletter</h2>
              <p>
                Monthly hand-picked discoveries and stories of thriving
                {!isMobile && <br />}technologies in a new world of data.
              </p>
            </div>
            <div className={`${styles.section} ${styles.inputWrapper}`}>
              <input
                className={styles.input}
                type="text"
                placeholder="What’s your email?"
                ref={inputRef}
              />
              <button className={styles.button} onClick={handleSubmitEmail}>
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </Layout>
      <CustomizedContentDialogs
        open={dialogConfig.open}
        handleClose={handleCloseDialog}
        title={dialogConfig.title}
      >
        {dialogConfig.content()}
      </CustomizedContentDialogs>

      <CustomizedSnackbars
        open={snackbarConfig.open}
        type={snackbarConfig.type}
        message={snackbarConfig.message}
        handleClose={handleCloseSnackbar}
      />
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
