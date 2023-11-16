import React from "react";
import classes from "./Welcome.module.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import Send from "./Email/Send";
import Inbox from "./Email/Inbox";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    // navigate('/');
  };
  return (
    <div>
      <div className={classes.main}>
        <div className={classes.header}>
          <div>Welcome to Mail box</div>
          <Link to="/send" style={{ textDecoration: "none" }}>
            Compose Email
          </Link>
          <Button variant="danger" onClick={logoutHandler}>
            Log out
          </Button>
        </div>
      </div>
      <br />
      <div>
        <Inbox />
      </div>
    </div>
  );
};

export default Welcome;
