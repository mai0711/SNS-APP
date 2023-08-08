import "./Post.css"
import React, { useContext, useRef, useState } from 'react'
import { Image, Gif, Face, Analytics } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext"
import axios from 'axios';
import Header from "../../components/Header/Header";

export default function Post() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);
    const desc = useRef()
    const title = useRef()

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id, //誰が投稿するか（今ログインしているユーザー）
          title: title.current.value, //inputで入力した文字
          description: desc.current.value
        }
        //画像アップロード
        // if(file){
        //   const data = new FormData(); //make new data
        //   const fileName = Date.now() + file.name;
        //   data.append("file", file); //indicate file and name
        //   data.append("name", fileName);
        //   newPost.img = fileName; // add image inside new post
        //   try{
        //     await axios.post("/upload", data);
        //   }catch(err){
        //     console.log(err)
        //   }
        // }
        //api
        try {
          await axios.post("/posts", newPost); //post.jsの1
          window.location.reload(); //reload automatically after posted
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
              : PUBLIC_FOLDER + "person/noAvatar.png"}
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
              <input
              type="file"
              className="post-file"
              id='file'
              name="picture"
              accept='.png, .jpeg, .jpg'
              // style={{display: "none"}}
              // onChange={(e) => setFile(e.target.files[0])}
              />
            <button className="post-button" type='submit' >POST</button>
          </form>
      </div>
    </div>
    </>
  )
}
