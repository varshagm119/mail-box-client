import React, { useEffect } from "react";
import classes from "./Sentbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../../store/mail-slice";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Sentbox = () => {
  const dispatch = useDispatch();
  const mailSentbox = useSelector((state) => state.mail.sentMails);

  const userEmail = localStorage.getItem("userEmail");
  const email = userEmail.replace(/[.@]/g, "");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://mailboxclient-13dea-default-rtdb.firebaseio.com/sentbox/${email}.json`
      );
      const data = await res.data;
      if (data) {
        const mailData1 = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        const mailData = mailData1.reverse();
        dispatch(mailActions.updateSentbox(mailData));
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Sent Mails</h1>
      <div className={classes.main}>
        {mailSentbox.length > 0 ? (
          <div className={classes.row}>
            {mailSentbox.map((item) => (
              <div className={classes.row1} key={item.id}>
                <div className={classes.user}> To: {item.to} </div>
                <div className={classes.subject}> Sub: {item.subject} </div>
                <div className={classes.msg}>
                    <NavLink
                        to={`/sentmessage/${item.id}`}
                        style={{textDecoration: 'none'}}
                    >
                        {'Message'}
                    </NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Sent box emtpy</p>
        )}
      </div>
    </div>
  );
};

export default Sentbox;
