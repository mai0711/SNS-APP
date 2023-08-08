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

  const { user: currentUser } = useContext(AuthContext); //ログインしているユーザー

  const [user, setUser] = useState({}); //投稿したユーザーのデータ
  const [ like, setLike ] = useState(post.likes.length);
  const [ isLiked, setIsLiked ] = useState(false);



//postを表示するため 投稿した人のuserデータをとる
// post.userIdが変わるたびに以下が呼び出される
useEffect(() => {
  const fetchUser = async() => {
  const response = await axios.get(`/users?userId=${post.userId}`); //users.jsの4
  //user.jsのget. postはtimeline.jsxで受け取ったprops userIdはmodels/User.jsのuserId. post.userIdは投稿したユーザーのuserId
      console.log(response);
      setUser(response.data);
  };
  fetchUser();
}, [post.userId]);



//like function
const handleLike = async () => {
  try{
      await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id }); //posts.jsの4
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
          src={post.img || PUBLIC_FOLDER + "person/noAvatar.png"}
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