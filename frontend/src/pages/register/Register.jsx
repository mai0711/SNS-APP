import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import "./Register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const username= useRef();
    const email = useRef(); //emailに入力された値を参照(email input にref指定)
    const password = useRef();
    const confirmPassword = useRef();

    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault();
        //パスワードと確認パスワードが同じか
        if(password.current.value !== confirmPassword.current.value){
            confirmPassword.current.setCustomValidity("Incorrect Password"); //setCustomValidity = あってるかを自動で確認してくれる
        }else {
            try{
                //userの登録
                const user ={
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                };
                await axios.post("/auth/register", user);
                navigate("/login");
            }catch(err){
                console.log(err)
            }
        }
    };

  return (
    <>
        <div className='register-container'>
            <div className="loginWrapper">
                <form className='register-form' onSubmit={(e) => handleClick(e)}>
                    <h1 className='register-title'>Register</h1>
                    <input
                    className='register-input'
                    type='text'
                    placeholder="Username"
                    name="username"
                    required
                    ref={username}
                    />
                    <input
                    className='register-input'
                    type='email'
                    placeholder="Email"
                    required
                    ref={email}
                    />
                    <input
                    className='register-input'
                    type='password'
                    placeholder="Password"
                    required
                    minLength="6"
                    ref={password}
                    />
                    <input
                    className='register-input'
                    type='password'
                    placeholder="Confirm Password"
                    required
                    minLength="6"
                    ref={confirmPassword}
                    />
                    <button type="submit" className='registerButton'>Create User</button>
                    <span className='register-span'>
                        Already have an account? <Link className='register-link' to="/login"> Login</Link>
                    </span>
                    </form>
            </div>
        </div>
    </>
  )
}
