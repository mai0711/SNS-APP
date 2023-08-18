import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../state/AuthContext"

function Article({ post }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext); //current user

  const [ user, setUser ] = useState({}); //the data of user who posted the article
  const [ like, setLike ] = useState(post.likes.length);
  const [ isLiked, setIsLiked ] = useState(false);


//get a user data to show the post (user who posted the article)
useEffect(() => {
  const fetchUser = async() => {
  const response = await axios.get(`/users?userId=${post.userId}`); //users.js 4
  //post is props from timeline.jsx / userId is coming from models/User.js / post.userId = userId(user who posted the article)
    setUser(response.data);
  };
  fetchUser();
}, [post.userId]);



//like function
const handleLike = async () => {
  try{
      await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id }); //posts.js 4
  } catch(err){
      console.log(err);
  }
  setLike(isLiked ? like -1 : like +1);
  setIsLiked(!isLiked);
};


  return (
    <>
      <Col>
        <Card className='card'>
          <div className='postUser'>
              <Link to={`/profile/${user.username}`} >
                <img
                src={
                  user.profilePicture
                  ? user.profilePicture
                  : PUBLIC_FOLDER + "person/noAvatar.png"}
                alt=''
                className='postProfileImg'
                />
              </Link>
                <span className='postUsername'>{ user.username }</span>
                <br />
                  <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <Card.Img
          variant="top"
          src={PUBLIC_FOLDER + post.img || PUBLIC_FOLDER + "person/noAvatar.png"}
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.description}
            </Card.Text>
          </Card.Body>

          <div className="postBottomLeft">
            <img
            className="likeIcon"
            src={PUBLIC_FOLDER + "heart.png"}
            alt=""
            onClick={() => handleLike()}
            />
            <span className="postLikeCounter"> {like} people like it</span>
          </div>
        </Card>
      </Col>
    </>
  )
}

export default Article