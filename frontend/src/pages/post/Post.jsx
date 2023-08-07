import "./Post.css"
import React, { useContext, useRef } from 'react'
import { Image, Gif, Face, Analytics } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext"
import axios from 'axios';
import Header from "../../components/Header/Header";

export default function Post() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);
    const desc = useRef()
    const title = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id, //誰が投稿するか（今ログインしているユーザー）
          description: desc.current.value, //inputで入力した文字
        };
        //api
        try {
          await axios.post("/posts", newPost); //post.jsの1
          window.location.reload(); //投稿した後、自分でリロードしなくても良くなる
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <>
    <Header />
    <div className="post">
      <div className="post-container">
        <div className="user-profile">
          <div className="post-top">
            <img
            src={
              user.profilePicture
              ? user.profilePicture
              : PUBLIC_FOLDER + "/assets/person/noAvatar.png"}
              alt=""
            />
            <div className="profileName">
              <h5>{user.username}</h5>
            </div>
          </div>
        </div>

          <form className='post-form' onSubmit={(e) => handleSubmit(e)} >
            <h3>Post</h3>
              <input
                  className='post-title'
                  type='text'
                  placeholder="Title"
                  ref={title}
              />
              <textarea
                  className='post-description'
                  rows="5"
                  cols="40"
                  type='text'
                  placeholder="Description"
                  ref={desc}
              />
              <input type="file" className="post-file" name="picture" accept="image/jpeg, image/png"></input>
            <button className="post-button" type='submit' >POST</button>
          </form>
      </div>
    </div>
    </>
  )
}
