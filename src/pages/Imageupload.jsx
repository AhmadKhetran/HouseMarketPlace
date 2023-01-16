import React, { useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";

function ImageUpload() {
  const images = useRef();
  const auth = getAuth();

  const uploadHandler = async (e) => {
    e.preventDefault();
    const Uploadedimage = images.current.files;
    console.log(Uploadedimage);

    const storeImage = async (Uploadedimage) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${
          Uploadedimage.name
        }-${uuidv4()}`;
        const storageRef = ref(storage, "images/", fileName);
        const uploadTask = uploadBytesResumable(storageRef, Uploadedimage);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...Uploadedimage].map((Uploadedimage) => storeImage(Uploadedimage))
    );
  };

  return (
    <>
      <form onSubmit={uploadHandler}>
        <div className="container mt-4">
          <div className="row mb-4">
            <h2 className="font-bold">Upload Images</h2>
            <p>The First Image will be the cove (max-6) </p>
            <label className="form-label" htmlFor="form6Example1"></label>
            <div className="col">
              <div className="form-outline">
                <input
                  ref={images}
                  type="file"
                  id="images"
                  max="6"
                  accept=".jpg,.png,.jpeg"
                  multiple
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <button className="mb-2 w-96 inline-block px-6 py-2.5 bg-green-600 text-white font-bold text-ms leading-normal uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Upload
          </button>
        </div>
      </form>
    </>
  );
}

export default ImageUpload;
