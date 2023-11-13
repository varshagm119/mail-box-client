import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

const SignupForm = () => {
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Entered password and confirm password are not same !");
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXmUMhhH3qUzzdmw2i676LeMecexXByzQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'Application/json'
          }
        }
      );
      if(!res.ok){
        throw new Error('Sign in failed.')
      }
      const data = await res.json();
    } catch (e) {
      alert(e);
    }
    formRef.current.reset();
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Sign up</h1>
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            ref={confirmPasswordRef}
            placeholder="confirm password"
            required
          />
        </Form.Group>

        <Button type="submit" onSubmit={submitHandler}>
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
