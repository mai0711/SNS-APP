import React from 'react'
import "./Friend.css"

export default function Friend({ friend }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="friendList">
        <div>
            <img
            src={ PUBLIC_FOLDER + friend.profilePicture }
            alt=''
            className='friendProfileImg'
            />
        </div>
        <span className="friendUsername">{friend.username}</span>
    </li>
  )
}
