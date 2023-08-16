// import "./SetPic.css"
// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import Header from "../../components/Header/Header";
// import { useParams } from "react-router";

// export default function SetPic() {

//   const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

//   const username = useParams().username;

//     const [profilePic, setProfilePic] = useState(null);
//     // const [coverPic, setCoverPic] = useState(null);
//     const [user, setUser] = useState({});


//     //to get a user data
//     useEffect(() => {
//       const fetchUser = async () => {
//           const res = await axios.get(`/users?username=${username}`);
//           setUser(res.data);
//       };
//       fetchUser();
//   }, [username]);



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newPicture = {
//           userId: user._id, //who post the article（current user）
//         }
//         //set profile picture
//         if(profilePic){
//           const data = new FormData(); //make new data
//           const fileName = Date.now() + profilePic.name;
//           data.append("name", fileName); // "name" = key
//           data.append("file", profilePic); //"file" = key
//           newPicture.profilePicture = fileName;
//           try{
//             //API for setting profile picture
//             await axios.post("/setPic/profilePic", data); //setPic.js 1
//           }catch(err){
//             console.log(err)
//           }
//         }
//     }

//         //set cover picture
//     //     if(coverPic){
//     //       const data = new FormData(); //make new data
//     //       const fileName = Date.now() + coverPic.name;
//     //       data.append("name", fileName); // "name" = key
//     //       data.append("file", coverPic); //"file" = key
//     //       newPicture.img = fileName;
//     //       try {
//     //         await axios.post("/setPic/coverPic", data); //setPic.js 2
//     //         window.location.reload(); //reload automatically after posted
//     //       } catch(err) {
//     //           console.log(err);
//     //       }
//     // }
// //}

//   return (
//     <>
//     <Header />
//     <div className="setting">
//       <h1>SETTING</h1>
//         <div className="setting-top">
//             <img
//             src={
//               user.profilePicture
//               ? user.profilePicture
//               : PUBLIC_FOLDER + "person/noAvatar.png"}
//               alt=""
//             />
//             <div className="setting-name">
//               <h5>{user.username}</h5>
//             </div>
//           </div>

//       <form className='setting-form' onSubmit={(e) => handleSubmit(e)}>
//         <h4>Select your profile picture</h4>
//         <input
//         type="file"
//         className="setProfilePic"
//         name="picture"
//         accept='.png, .jpeg, .jpg'
//         onChange={(e) => setProfilePic(e.target.files[0])}
//         />

//         {/* <h4>Select your profile cover picture</h4>
//         <input
//         type="file"
//         className="setCoverPic"
//         name="picture"
//         accept='.png, .jpeg, .jpg'
//         // onChange={(e) => setCoverPic(e.target.files[0])}
//         /> */}
//         <button className="setting-button" type='submit' >SET</button>
//       </form>
//     </div>
//     </>
//   )
// }
