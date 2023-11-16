import React, { useRef, useState } from "react";
import classes from "./Send.module.css";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Send = () => {
  const [sending, setSending] = useState(false);
  const receiverEmailRef = useRef();
  const subjectRef = useRef();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorHandler = (editorState) => {
    setEditorState(editorState);
    //    console.log(editorState.getCurrentContent().getPlainText(),'editorState');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const receiverEmail = receiverEmailRef.current.value;
    const subject = subjectRef.current.value;

    if (receiverEmail === "") {
      alert("Pls write the content before sending request!");
      return;
    }

    const senderEmail = localStorage.getItem("userEmail");
    const sender = senderEmail.replace(/[.@]/g, "");
    const receiver = receiverEmail.replace(/[.@]/g, "");

    //storing the data at the sent db
    await fetch(
      `https://mailboxclient-13dea-default-rtdb.firebaseio.com/sentbox/${sender}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          to: receiver,
          subject: subject,
          message: editorState.getCurrentContent().getPlainText(),
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (!res.ok) {
        alert(res.error.message);
      } else {
        setSending(true);
        console.log(sender, "Successful");
      }
    });

    await fetch(
      `https://mailboxclient-13dea-default-rtdb.firebaseio.com/inbox/${receiver}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          sender: sender,
          subject: subject,
          message: editorState.getCurrentContent().getPlainText(),
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (!res.ok) {
        //alert(res.error.message);
        toast.error("Failed to send mail, please try again!");
      } else {
        console.log("Successfull to inbox");
        toast.success("Mail sent successfully");
      }
    });
  };

  return (
    <div className={classes.composerBackdrop}>
      <div className={classes.body}>
        <div style={{ color: "white", fontWeight: "bold" }}>
          To:
          <input
            style={{ width: "89%" }}
            className={classes.inputWithBorderBottom}
            type="email"
            ref={receiverEmailRef}
            required
          />
        </div>
        <br />
        <div style={{ color: "white", fontWeight: "bold" }}>
          Subject:
          <input
            className={classes.inputWithBorderBottom}
            type="text"
            required
            ref={subjectRef}
          />
        </div>
        <br />
        <div className={classes.editor}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={editorHandler}
          />
        </div>
        <br />
        <Button onClick={submitHandler}>Send</Button>
      </div>
      <ToastContainer
        position="top-right" // Adjust the position as needed
        autoClose={5000} // Adjust the auto-close time as needed
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "10px", minBlockSize: "10px", textAlign: 'center', color:'black',fontWeight:'bold' }}
      />
    </div>
  );
};

export default Send;
