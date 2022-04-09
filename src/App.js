import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BackgroundLayout from "./components/Shared/BackgroundLayout";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import CustomButton from "./components/Shared/CustomButton";
import { auth, db } from "./components/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { collection, doc } from "firebase/firestore";
import { useCollectionOnce, useDocument } from "react-firebase-hooks/firestore";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorModal from "./components/Shared/ErrorModal";
import SuspenseLoading from "./components/Shared/SuspenseLoading";

//Lazy Imports
const Landing = React.lazy(() => import("./components/Main/Landing"));
const Members = React.lazy(() => import("./components/Main/Members"));
const Events = React.lazy(() => import("./components/Main/Events"));
const Gallery = React.lazy(() => import("./components/Main/Gallery"));
const EditProfile = React.lazy(() => import("./components/Main/EditProfile"));
const AddGallery = React.lazy(() => import("./components/Main/AddGallery"));
const AddEvents = React.lazy(() => import("./components/Main/AddEvents"));
const AddProfile = React.lazy(() => import("./components/Main/AddProfile"));

function App() {
  const [signInWithGoogle, signInUser, signInUserLoading, signInUserError] =
    useSignInWithGoogle(auth);
  const [user, userLoading, userError] = useAuthState(auth);
  const [profileData, profileDataLoading, profileDataError] = useDocument(
    doc(db, "userProfiles", user ? user.email : "dummy"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [pageError, setPageError] = useState(null);
  const [allowedUserSnapshot, allowedUserLoading, allowedUserError] =
    useCollectionOnce(collection(db, "allowedUsers"));
  const [permission, setPermission] = useState(null);
  useEffect(() => {
    if (signInUser) {
      if (allowedUserSnapshot) {
        const res = allowedUserSnapshot.docs.map((doc) => doc.data().Users);
        if (res[0].includes(signInUser.user.email)) {
          console.log("contains");
        } else {
          signOut(auth);
          setPageError("You're not authorized as club member :(");
        }
      }
    }
  }, [signInUser, allowedUserSnapshot]);
  useEffect(() => {
    if (user && profileData && profileData.data()) {
      setPermission(profileData.data().permission);
    }
    if (!user) {
      setPermission(null);
    }
  }, [profileData, user]);

  return (
    <div className="App overflow-x-hidden">
      <Suspense fallback={<SuspenseLoading />}>
        <Router>
          <Navbar
            user={!profileDataLoading && user}
            profileExists={!profileDataLoading && profileData}
            onClick={() => signInWithGoogle()}
          >
            <CustomButton
              onClick={() => signInWithGoogle()}
              className="hidden md:block pr-3"
            >
              Member Login
            </CustomButton>
          </Navbar>
          <BackgroundLayout />
          {pageError && (
            <ErrorModal
              errorText={pageError}
              clicked={() => setPageError(null)}
            />
          )}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            {user && profileData && !profileData.data() && (
              <Route
                path="/add-profile"
                element={
                  <AddProfile
                    user={signInUser}
                    error={allowedUserError}
                    loading={allowedUserLoading}
                  />
                }
              />
            )}
            {user && profileData && (
              <Route
                path="/edit-profile"
                element={
                  <EditProfile
                    user={signInUser}
                    error={allowedUserError}
                    loading={allowedUserLoading}
                    profileData={profileData.data()}
                  />
                }
              />
            )}
            {permission === "admin" && (
              <Route path="/add-gallery" element={<AddGallery />} />
            )}
            {permission === "admin" && (
              <Route path="/add-events" element={<AddEvents />} />
            )}
            <Route path="*" element={<Landing />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
