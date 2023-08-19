import "./SetPic.css"
import React, { useState } from 'react'
import axios from 'axios';
import Header from "../../components/Header/Header";
// import { useNavigate } from 'react-router-dom';

export default function SetPic() {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);

    // const navigate = useNavigate();

    //to get a user data
    const user = JSON.parse(localStorage.getItem("user"))

    //button for setting pictures
    const handleProfile = async (e) => {
        e.preventDefault();
        const newPicture = {
            userId: user._id
        }
        //set profile picture
            const data = new FormData();
            const fileName = Date.now() + profilePic.name;
            data.append("name", fileName);
            data.append("file", profilePic);
            newPicture.profilePicture = fileName;
            // console.log(newPicture)
            try{
                //API for setting profile picture
                await axios.put(`/setPic/profilePic/${user._id}`, data); //setPic.js 1
            }catch(err){
                console.log(err)
            }
            // navigate(`/profile/${user._id}`);
            window.location.reload(); //reload automatically after posted
    }


    const handleCover = async (e) => {
        e.preventDefault();
        const newPicture = {
            userId: user._id
        }
        //set profile picture
            const data = new FormData();
            const fileName = Date.now() + coverPic.name;
            data.append("name", fileName);
            data.append("file", coverPic);
            newPicture.coverPicture = fileName;
            // console.log(newPicture)
            try{
                //API for setting profile picture
                await axios.put(`/setPic/coverPic/${user._id}`, data); //setPic.js 2
            }catch(err){
                console.log(err)
            }
            // navigate(`/profile/${user._id}`);
            window.location.reload(); //reload automatically after posted
    }

  return (
    <>
    <Header />
    <div className="setting">
        <h1>SETTING</h1>
        <div className="setting-top">
            <img
            src={
            user.profilePicture
            ? PUBLIC_FOLDER + user.profilePicture
            : PUBLIC_FOLDER + "person/noAvatar.png"}
            alt=""
            />
            <div className="setting-name">
                <h5>{user.username}</h5>
            </div>
        </div>

        <form className='setting-form' onSubmit={(e) => handleProfile(e)}>
            <h4>Select your profile picture</h4>
            <input
            type="file"
            className="setProfilePic"
            name="picture"
            accept='.png, .jpeg, .jpg'
            onChange={(e) => setProfilePic(e.target.files[0])}
            />
            <button className="setting-button" type='submit' >Set your profile picture</button>
        </form>

        <form className='setting-form' onSubmit={(e) => handleCover(e)}>
            <h4>Select your profile cover picture</h4>
            <input
            type="file"
            className="setCoverPic"
            name="picture"
            accept='.png, .jpeg, .jpg'
            onChange={(e) => setCoverPic(e.target.files[0])}
            />
            <button className="setting-button" type='submit' >Set your cover picture</button>
        </form>
    </div>
    </>
  )
}
