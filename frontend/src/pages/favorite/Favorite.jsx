import React from 'react'
import { useState, useEffect,  useContext } from 'react';
import { useParams } from "react-router-dom";
import './Favorite.css';
// import Row from 'react-bootstrap/Row';
// import Article from '../../components/Article/Article';
import Header from "../../components/Header/Header";
import { AuthContext } from '../../state/AuthContext';
export default function Favorite() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    // const [ posts, setPosts ] = useState([]);
    const { user } = useContext(AuthContext);
    // const username = useParams().username;

    // //postを表示するため（自分の投稿とフォローしている人の投稿）
    // // usernameが変わるたびに発火
    // useEffect(() => {
    //     const fetchPosts = async() => {
    //       const response = await axios.get(`/posts/timeline/${user._id}`) //post.jsの9.
    //     setPosts(response.data);
    //     };
    //     fetchPosts();
    // }, [username]);


  return (
    <>
        <Header />
        <div className="userProfile">
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
        <div className="favoriteArticles">
            <h1>Favorite Articles</h1>
        </div>
    </>
  )
}
