import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from 'firebase';

function Post({ imageUrl, username, caption, postId, user }) {
  const [comments, setComments] = useState([]);
  // For single Comment
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return ()=>{
      unsubscribe();
    };
  }, [postId]);

  const postComment =(event)=>{
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      // We need use who signed in
      username:user.displayName,
      // to get comments by time 
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  }

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          src="/static/images/avatar/2.jpg"
          alt=""
        >
          G
        </Avatar>
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post_comments">
        {
          comments.map((comment)=>(
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))
        }
      </div>

      {
        user && (
          <form className="post_commentbox">
        <input
          className="post_input"
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="post_button" type="submit" onClick={postComment} disabled={!comment}>
          Post
        </button>
      </form>
        )
      }
    </div>
  );
}

export default Post;
