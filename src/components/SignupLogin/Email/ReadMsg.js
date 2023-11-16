import React, { Fragment } from "react";
import classes from "./ReadMsg.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ReadMsg = () => {
  const { id } = useParams();
  const mails = useSelector(state => state.mail.inboxMails);
  const myEmail = localStorage.getItem('userEmail').replace(/[.@]/g,'');

  const singleMail = mails.filter(item => item.id === id);
  const message = singleMail[0].message;
  console.log(singleMail, 'message')

  return (
    <Fragment>
      <div className={classes.message}>{message}</div>
    </Fragment>
  );
};

export default ReadMsg;
