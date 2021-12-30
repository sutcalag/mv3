import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useGetFaq } from "../../http/hooks";
import LocalizedLink from "../localizedLink/localizedLink";
import { CustomizedDialogs } from "../dialog/Dialog";
import FeedbackDialog from "../dialog/FeedbackDialog";
import * as styles from "./relatedQuestion.module.less";
import clsx from "clsx";
import "../../css/variables/main.less";

export default function RelatedQuestion(props) {
  const { title, contact, relatedKey } = props;
  const [showModal, setShowModal] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const relatedQuestions = useGetFaq(relatedKey);

  const handleClickQuestion = (question) => {
    const [title, content] = question;
    setSelectedQuestion({ q: title, a: content });
    setShowModal(true);
  };

  const handleClickFollowUp = () => {
    setShowFeedbackDialog(true);
  };
  const handleCancelFollowUp = () => {
    setShowFeedbackDialog(false);
  };

  return (
    <>
      <Typography variant="h2" component="h2" className={styles.title}>
        {title}
      </Typography>
      <ul className={styles.container}>
        {relatedQuestions?.map((question) => {
          const [title, content, isLink] = question;
          return (
            // <FaqCard question={question} key={question[0]} />
            <Typography
              key={question[0]}
              variant="li"
              component="li"
              onClick={() => {
                !isLink && handleClickQuestion(question);
              }}
              className={styles.item}
            >
              {isLink ? (
                <LocalizedLink
                  to={content}
                  showIcon={true}
                  className={styles.link}
                >
                  {question[0]}
                </LocalizedLink>
              ) : (
                question[0]
              )}
            </Typography>
          );
        })}
      </ul>
      <div className={styles.faqLinks}>
        <Typography variant="h6" component="h3" className={styles.subTitle}>
          Didn't find what you need?
        </Typography>
        <div className={styles.btnGroups}>
          <button
            className={clsx("primaryBtnSm", styles.pBtn)}
            onClick={() => {
              handleClickFollowUp();
            }}
          >
            {contact.follow.label}
          </button>
          <a
            className={clsx("secondaryBtnSm", styles.sBtn)}
            href={contact.slack.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.slack.label}
          </a>
          <a
            className={clsx("secondaryBtnSm", styles.sBtn)}
            href={contact.github.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.github.label}
          </a>
        </div>
        {showFeedbackDialog && (
          <FeedbackDialog
            open={showFeedbackDialog}
            handleCancel={handleCancelFollowUp}
            handleSubmit={handleCancelFollowUp}
          />
        )}
      </div>
      <CustomizedDialogs
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        title={selectedQuestion?.q}
        content={selectedQuestion?.a}
      />
    </>
  );
}
