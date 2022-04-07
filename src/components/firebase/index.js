import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLnwLGjcHYuvr58YzTvjjnfXE4p14Kk_0",
  authDomain: "mananatechnosurge.firebaseapp.com",
  projectId: "mananatechnosurge",
  storageBucket: "mananatechnosurge.appspot.com",
  messagingSenderId: "17350176353",
  appId: "1:17350176353:web:2d2db544f5f2f1eb550420",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function uploadImage(pathWithFileName, file) {
  let downloadUrl;
  const metadata = {
    contentType: "image/jpeg",
  };
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, pathWithFileName);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          console.log("Something unexpected happened");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        // ...
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          console.log("Something unexpected happened");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        downloadUrl = downloadURL;
      });
    }
  );
  return downloadUrl;
}

export async function uploadToFirebase() {}
