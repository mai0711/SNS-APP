import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css";
import { useContext, useRef } from 'react';
import { loginCall } from '../../state/ActionCalls';
import { AuthContext } from '../../state/AuthContext';

export default function Login() {

    const email = useRef(); //emailに入力された値を参照(email input にref指定)
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext); // AuthContext.jsのvalueを使うことができるように

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email.current.value)
        loginCall( //ActionCalls.jsから
            {
                email: email.current.value,
                password: password.current.value,
            },
            dispatch //AuthContext.jsのvalue
        );
    };

    console.log(user)

  return (
    <>
        <div className="login-container">
            <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                <h1 className='login-title'>Login</h1>
                <input
                className='login-input'
                type='email'
                placeholder="Email"
                required
                ref={email} //useRef
                />
                <input
                className='login-input'
                type='password'
                placeholder="Password"
                required
                minLength="6"
                ref={password}
                />
                <button className='loginButton'>Login</button>
                <span className='login-span'>
                Don't have an account? <Link className="login-link" to="/register"> Register</Link>
                </span>
                    {/* <span className="loginForgot">Forget your password</span>
                    <button className="loginRegisterButton">Create an account</button> */}
            </form>
        </div>
    </>
  )
}
