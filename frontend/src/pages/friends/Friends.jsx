import React from 'react';
import { useState, useEffect } from 'react';
import "./Friends.css";
import Row from 'react-bootstrap/Row';
import Header from '../../components/Header/Header'
import axios from "axios";
import Article from '../../components/Article/Article';
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export default function Profile() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);

    const username = useParams().username;

    //to get a user data
    useEffect(() => {
        const fetchUser = async () => {
            if(username !== undefined){
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data);
            }
        };
        fetchUser();
    }, [username]);


    //to show posts（friend's posts）
    useEffect(() => {
        const fetchPosts = async() => {
        if(user._id !== undefined) {
            const response = await axios.get(`/posts/friends/${user._id}`) //post.js 6.
            setPosts(response.data.sort((post1,post2) => { //sort post
            return new Date(post2.createdAt) - new Date(post1.createdAt);
            }));
        }
        };
        fetchPosts();
    }, [user._id]);


    //to show friends
    useEffect(() => {
        const getFriends = async() => {
            try{
                if(user._id !== undefined) {
                const friendList = await axios.get("/users/friends/" + user._id); //users.js 7
                setFriends(friendList.data);
                }
            }catch(err){
                console.log(err);
            }
        };
        getFriends();
    }, [user._id]);


return (
    <>
    <Header />
        <div className="profile">
        <div className="profile-first-container">
            <div className="profileTop">
                <img src={user.coverPicture || PUBLIC_FOLDER + "post/3.jpeg"} alt="" className="profileBackImg"/>
                <img src={user.profilePicture || PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="profileImg"/>
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
                    {friends.map((friend) => (
                        <li className="friendList" key={friend.username}>
                        <Link to= {`/friends/${friend.username}`}>
                            <img
                            src={
                            friend.profilePicture
                            ? PUBLIC_FOLDER + friend.profilePicture
                            : PUBLIC_FOLDER + "person/noAvatar.png" }
                            alt=''
                            className='friendProfileImg'
                            />
                        </Link>
                        <span className="friendUsername">{friend.username}</span>
                    </li>
                    ))}
                </ul>
            </div>
            </div>
            </div>
            <hr />
            <div className="profile-second-container">
                <h1>ARTICLES</h1>
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

