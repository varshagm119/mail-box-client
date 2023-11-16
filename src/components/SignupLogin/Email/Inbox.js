import React, { useEffect, useState } from "react";
import axios from "axios";
import { mailActions } from "../../../store/mail-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Inbox.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const Inbox = () => {
  const [reRender, setReRender] = useState(true);
  const dispatch = useDispatch();
  const mailInbox = useSelector((state) => state.mail.inboxMails);

  const userEmail = localStorage.getItem("userEmail");
  const email = userEmail.replace(/[.@]/g, "");

  const deleteHandler = async(id) => {
    const res = await fetch(`https://mailboxclient-13dea-default-rtdb.firebaseio.com/inbox/${email}/${id}.json`,
    {
      method: 'DELETE'
    });
    const deleteData = await res.json();
    setReRender((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://mailboxclient-13dea-default-rtdb.firebaseio.com/inbox/${email}.json`
      );

      const data = await response.data;

      const mailData1 = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      const mailData = mailData1.reverse();
      dispatch(mailActions.updateInbox(mailData));
    };
    fetchData();
  }, [reRender]);

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Inbox Mails</h1>
      <div className={classes.main}>
        <div className={classes.row}>
          {mailInbox.map((item) => (
            <div className={classes.row1} key={item.id}>
              <div className={classes.user}> From: {item.sender} </div>
              <div className={classes.subject}> Sub: {item.subject} </div>
              <div className={classes.msg}>
                <NavLink
                  to={`/message/${item.id}`}
                  style={{textDecoration: 'none'}}
                >{"Message"}</NavLink>
              </div>
              <div className={classes.delete}>
                <Button variant="link" onClick={deleteHandler.bind(null, item.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
