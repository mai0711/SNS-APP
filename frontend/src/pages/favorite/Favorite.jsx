// import React, { useContext, useState, useEffect } from 'react'
// import './Favorite.css';
// import Header from "../../components/Header/Header";
// import { AuthContext } from '../../state/AuthContext';
// import axios from "axios";
// import Row from 'react-bootstrap/Row';
// import Article from '../../components/Article/Article';


// export default function Favorite() {

//     const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

//     const [ favoritePosts, setFavoritePosts ] = useState([]);
//     // const [ like, setLike ] = useState(favoritePost.likes.length);
//     // const [ isLiked, setIsLiked ] = useState(false);

//     const { user } = useContext(AuthContext);


//     //to show favorite posts
//     useEffect(() => {
//         const fetchFavoritePosts = async() => {
//         const response = await axios.get(`/posts/favorite/${user._id}`) //post.js 8.
//         setFavoritePosts(response.data.sort((post1,post2) => { //sort post
//             return new Date(post2.createdAt) - new Date(post1.createdAt);
//         }));
//         };
//         fetchFavoritePosts();
//     }, [user._id]);



//     //like function
//     // const handleLike = async () => {
//     // try{
//     //     await axios.put(`/posts/${favoritePost._id}/like`, {userId: user._id }); //posts.js 4
//     // } catch(err){
//     //     console.log(err);
//     // }
//     // setLike(isLiked ? like -1 : like +1);
//     // setIsLiked(!isLiked);
//     // };


//   return (
//     <>
//         <Header />
//         <div className="favorite-container">
//             <div className="userProfile">
//                 <img
//                 src={
//                     user.profilePicture
//                     ? user.profilePicture
//                     : PUBLIC_FOLDER + "person/noAvatar.png"}
//                     alt=""
//                 />
//                 <div className="profileName">
//                     <h5>{user.username}</h5>
//                 </div>
//             </div>
//             <div className="favoriteArticles">
//                 <h1>Favorite Articles</h1>
//                 <Row xs={2} md={4} className="g-6">
//                     {favoritePosts.map((favoritePost) => (
//                         <Article  favoritePost={favoritePost} key={favoritePost._id} />
//                     ))}
//                 </Row>
//             </div>
//         </div>
//     </>
//   )
// }
