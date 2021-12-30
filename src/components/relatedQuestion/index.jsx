import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useGetFaq } from "../../utils/hooks";
import LocalizedLink from "../localizedLink/localizedLink";
import * as styles from "./relatedQuestion.module.less";

export default function RelatedQuestion(props) {
  const { title, contact, relatedKey } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const relatedQuestions = useGetFaq(relatedKey);

  const handleClickQuestion = (question) => {
    const [title, content] = question;
    setSelectedQuestion({ q: title, a: content });
    setShowModal(true);
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

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CustomizedDialogs = (props) => {
  const { open, handleClose, title, content } = props;

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{content}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
