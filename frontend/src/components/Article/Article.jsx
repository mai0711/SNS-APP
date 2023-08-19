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

  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [editedFile, setEditedFile] = useState(null);

  // Función para alternar el modo de edición
  const toggleEdit = () => {
    setEditing(!editing);
  };

  // Función para eliminar una publicación
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, { data: { userId: currentUser._id } });
      // Es posible que desees eliminar la publicación eliminada del estado 'posts' aquí
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      // Datos a enviar al servidor
      const updatedData = {
        title: editedTitle,
        description: editedDescription,
      };
  
      // Si se seleccionó una nueva imagen
      if (editedFile) {
        const formData = new FormData();
        formData.append("file", editedFile);
        // Realizar la carga de la imagen al servidor y obtener el nombre de archivo
        const response = await axios.post("/upload", formData);
        updatedData.img = response.data.fileName;
      }
  
      // Enviar los datos actualizados al servidor
      await axios.put(`http://localhost:8000/api/posts/${post._id}`, updatedData);
  
      // Actualizar los datos en el componente
      post.title = editedTitle;
      post.description = editedDescription;
      if (updatedData.img) {
        post.img = updatedData.img;
      }
  
      setEditing(false); // Salir del modo de edición
    } catch (err) {
      console.log(err);
    }
  };
  

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
            {/* Botones de Editar y Eliminar */}
            {currentUser._id === post.userId && (
              <>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>

          {/* Renderizar el formulario de edición si está en modo de edición */}
          {editing && (
            <div className="editForm">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                rows="5"
                cols="40"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <button onClick={handleUpdate}>Save changes</button>
            </div>
          )}

        </Card>
      </Col>
    </>
  )
}

export default Article