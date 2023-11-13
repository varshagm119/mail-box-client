import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async(e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try{
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXmUMhhH3qUzzdmw2i676LeMecexXByzQ',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      if (!res.ok) {
          throw new Error('Log in failed.');
        }
      const data = await res.json();
      if(res.ok){
        dispatch(authActions.login({token: data.idToken, email: data.email}));
      }
    } catch(e) {alert(e)}
    formRef.current.reset();
  }

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Log in</h1>
      <Form ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            placeholder="enter email"
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="password(Not less than 6)"
            required
          />
        </Form.Group>
        <Button type="submit" onClick={submitHandler}>
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
