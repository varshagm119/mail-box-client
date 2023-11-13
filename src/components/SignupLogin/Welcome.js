import React from 'react';
import classes from './Welcome.module.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
       // navigate('/');
    }
  return (
    <div>
        <div className={classes.main}>
            <div className={classes.header}>
                <div>Welcome to Mail box</div>
                <Button variant='danger' onClick={logoutHandler}>Log out</Button>
            </div>
        </div>
    </div>
  )
}

export default Welcome