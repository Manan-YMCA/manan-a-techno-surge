// import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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

// export async function signInWithGoogle() {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   await auth.signInWithPopup(provider);
// }

// export function checkAuth(cb) {
//   return auth.onAuthStateChanged(cb);
// }

// export async function logOut() {
//   await auth.signOut();
// }

// export async function uploadImage(uid, file) {
//   const id = uid;
//   const uploadTask = storage.ref(`images/${file.name}-${id}`).put(file);
//   return new Promise((resolve, reject) => {
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => console.log("image uploading", snapshot),
//       reject,
//       () => {
//         storage
//           .ref("images")
//           .child(`${file.name}-${id}`)
//           .getDownloadURL()
//           .then(resolve);
//       }
//     );
//   });
// }
