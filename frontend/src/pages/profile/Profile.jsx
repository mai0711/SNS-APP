import React from 'react';
import { useState, useEffect,  useContext } from 'react';
import "./Profile.css";
import Row from 'react-bootstrap/Row';
import Header from '../../components/Header/Header'
import axios from "axios";
import { useParams } from "react-router-dom"
import { Friends } from '../../dummyData'
import Friend from '../../components/Friend/Friend'
import { AuthContext } from '../../state/AuthContext';
import Article from '../../components/Article/Article';


export default function Profile() {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext); //user is from AuthContext.js, ログインしているユーザーのデータ

  const [posts, setPosts] = useState([]);
  const username = useParams().username;


//postを表示するため（自分の投稿とフォローしている人の投稿）
// usernameが変わるたびに発火
useEffect(() => {
  const fetchPosts = async() => {
    const response = await axios.get(`/posts/timeline/${user._id}`) //post.jsの9.
    setPosts(response.data);
  };
  fetchPosts();
}, [username]);


  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-first-container">
          <div className="profileTop">
            <img src={user.coverPicture || PUBLIC_FOLDER + "/assets/post/3.jpeg"} alt="" className="profileBackImg"/>
            <img src={user.profilePicture || PUBLIC_FOLDER + "/assets/person/noAvatar.png"} alt="" className="profileImg"/>
          </div>
          <div className="profileName">
              <h2>{user.username}</h2>
          </div>
          <div className="profileBottom">
            <div className="bottomLeft">
              <div className="userTitle">
                <h2>Information</h2>
              </div>
              <div className="userInfo">
                <h3>{user.desc}</h3>
              </div>
            </div>

            <div className="bottomRight">
              <div className="friendsTitle">
                <h2>Friends</h2>
              </div>

              <div>
                <ul className="friendsList">
                  {Friends.map((friend) => (
                    <Friend friend={friend} key={friend.id} />
                  ))}
                </ul>
              </div>


            </div>
          </div>
        <hr />
          <div className="profile-second-container">
            <h1>POST and FRIEND'S ARTICLES</h1>
            <Row xs={2} md={4} className="g-6">
              {posts.map((post) => (
                <Article  post={post} key={post._id} />
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}
