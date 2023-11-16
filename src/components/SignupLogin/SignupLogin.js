import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button } from 'react-bootstrap';
import classes from './SignupLogin.module.css';

const SignupLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const switchHandler = () => {
        setIsLogin((prevState) => !prevState);
    }
  return (
    <div className={classes.container}>
        <h1 style={{color: 'black'}}>Welcome to Mail Box</h1>
        <div className={classes.auth}>
            {isLogin && <LoginForm />}
            {!isLogin && <SignupForm />}
        </div>
        <div className={classes.switchCon}>
            {isLogin && (
                <p>
                    Don't have an account?
                    <button onClick={switchHandler}>Sign up</button>
                </p>
            )}
            {!isLogin && (
                <p>
                    Already have an account?
                    <button variant = 'primary' onClick={switchHandler}>Log in</button>
                </p>
            )}
        </div>
    </div>
  )
}

export default SignupLogin