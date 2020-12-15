import { Button } from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase";
import { db, storage } from "./firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //    progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //    error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        //    Complete function....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post images iside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
            //   To get this we added Attribute in ImageUpload in App.js
              username: username
            });
            // We don't want Progress to be Struck at 100% we want it tobe Zero Again
            setProgress(0);
            setCaption("");
            setImage(null);
          })
        })
  }
  return (
    <div className="imageupload">
      {/* I want to Have.. */}
      {/* Caption input */}
      {/* File picker */}
      {/* Post button */}
      <progress className="imageupload_progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a Caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
