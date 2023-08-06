import React from 'react';
import { useState, useEffect } from 'react';
import "./Profile.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Header from '../../components/Header/Header'
import axios from "axios";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Friends } from '../../dummyData'
import Friend from '../../components/Friend/Friend'



export default function Profile({ post }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // const [ like, setLike ] = useState(post.likes.length);
  // const [ isLiked, setIsLiked ] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const username = useParams().username;


//postを表示するため
// ページを読み込んだんとき一回だけuserデータを取得
useEffect(() => {
  const fetchUser = async() => {
  const response = await axios.get(`/users?username=${username}`); //user情報をgetする
  //user.jsのget. postはtimeline.jsxで受け取ったprops userIdはmodels/User.jsのuserId. post.userIdは投稿したユーザーのuserId
      // console.log(response);
      setUser(response.data);
  };
  fetchUser();
  // eslint-disable-next-line
}, []);

//postを表示するため
// usernameが変わるたびに発火
useEffect(() => {
  const fetchPosts = async() => {
    const response =
    username
    //usernameがあるときはしたのapiを叩く
    ? await axios.get(`/posts/profile/${username}`) //post.jsのget
    //usernameがないときはしたのapiを叩く
    : await axios.get("/posts/timeline/64c21350df0ba6d69be1e1ef") //post.jsのget
    // console.log(response);
    setPosts(response.data);
  };
  fetchPosts();
}, [username]);



//いいねの
// post.userIdが変わるたびに以下が呼び出される
// useEffect(() => {
//   const fetchUser = async() => {
//   const response = await axios.get(`/users?userId=${post.userId}`); //user情報をgetする
//   //user.jsのget. postはtimeline.jsxで受け取ったprops userIdはmodels/User.jsのuserId. post.userIdは投稿したユーザーのuserId
//       // console.log(response);
//       setUser(response.data);
//   };
//   fetchUser();
// }, [post.userId]);




//like button
// const handleLike = () => {
//   setLike(isLiked ? like -1 : like +1);
//   setIsLiked(!isLiked);
// };



  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-first-container">
          <div className="profileTop">
            <img src={user.coverPicture || PUBLIC_FOLDER + "/assets/post/3.jpeg"} alt="" className="profileBackImg"/>
            <img src={ user.profilePicture || PUBLIC_FOLDER + "/assets/person/noAvatar.png"} alt="" className="profileImg"/>
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
            <h1>Post and Articles</h1>
            <Row xs={2} md={4} className="g-6">
              {posts.map((post) => (
                <Col  post={post} key={post._id}>
                  <Card className='card'>
                    <div className='postUser'>
                        <Link to={`/profile/${user.username}`} >
                          <img
                          src={ user.profilePicture || PUBLIC_FOLDER + "/person/noAvatar.png"}
                          alt=''
                          className='postProfileImg'
                          />
                        </Link>
                          <span className='postUsername'>{ user.username }</span>
                    </div>

                    <Card.Img
                    variant="top"
                    src={post.img || PUBLIC_FOLDER + "/assets/person/noAvatar.png"}
                    />
                    <Card.Body>
                      <Card.Title>Card title</Card.Title>
                      <Card.Text>
                        {post.description}
                      </Card.Text>
                    </Card.Body>

                    <div className="postBottomLeft">
                      <img
                      className="likeIcon"
                      src={PUBLIC_FOLDER + "/assets/heart.png"}
                      alt=""
                      // onClick={() => handleLike()}
                      />
                      <span className="postLikeCounter">4 people like it</span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}
