import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sendQuestion } from "../../http";

export default function FormDialog(props) {
  const { open, handleCancel, handleSubmit, title, content } = props;
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [question, setQuestion] = useState("");
  const [isQuestionValid, setIsQuestionValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  useEffect(() => {
    setIsEmailValid(
      email === ""
        ? true
        : !!email.match(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
    );
    setIsQuestionValid(question === "" ? true : !!question?.length);
  }, [email, question]);

  const handleClean = () => {
    setEmail("");
    setQuestion("");
  };

  const handleCancelClick = () => {
    handleClean();
    handleCancel();
  };

  const handleSubmitClick = () => {
    sendQuestion({ email, quest: question });
    handleSubmit({ email, question });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancelClick}>
        <DialogTitle>
          {title || "We will follow up on your question"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content ||
              "Please leave your question here and we will be in touch."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            error={!isEmailValid}
            helperText={!isEmailValid && "Please input valid email."}
            onChange={handleEmailChange}
          />
          <TextField
            margin="dense"
            id="question"
            label="Your Question"
            multiline
            rows={4}
            fullWidth
            variant="standard"
            error={!isQuestionValid}
            helperText={!isQuestionValid && "Please input valid question."}
            onChange={handleQuestionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button
            onClick={handleSubmitClick}
            disabled={
              email === "" || question === ""
                ? true
                : !isEmailValid && !isQuestionValid
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
