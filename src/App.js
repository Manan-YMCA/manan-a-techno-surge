import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BackgroundLayout from "./components/Shared/BackgroundLayout";
import Navbar from "./components/Shared/Navbar";
import Landing from "./components/Main/Landing";
import Members from "./components/Main/Members";
import Events from "./components/Main/Events";
import Gallery from "./components/Main/Gallery";
import Footer from "./components/Shared/Footer";
import AddProfile from "./components/Main/AddProfile";
import CustomButton from "./components/Shared/CustomButton";
import { auth, db } from "./components/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorModal from "./components/Shared/ErrorModal";

function App() {
  const [signInWithGoogle, signInUser, userLoading, userError] =
    useSignInWithGoogle(auth);

  const [pageError, setPageError] = useState(null);
  const [snapshot, loading, error] = useCollectionOnce(
    collection(db, "allowedUsers")
  );

  useEffect(() => {
    if (signInUser) {
      if (snapshot) {
        const res = snapshot.docs.map((doc) => doc.data().Users);
        if (res[0].includes(signInUser.user.email)) {
          console.log("contains");
        } else {
          signOut(auth);
          setPageError("You're not authorized as club member :(")
        }
      }
    }
  }, [signInUser, snapshot]);

  return (
    <div className="App overflow-x-hidden">
      <Router>
        <Navbar>
          <CustomButton
            onClick={() => signInWithGoogle()}
            className="hidden md:block pr-3"
          >
            Member Login
          </CustomButton>
        </Navbar>
        <BackgroundLayout />
        {pageError && (
          <ErrorModal errorText={pageError} clicked={() => setPageError(null)} />
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/add-profile"
            element={
              <AddProfile user={signInUser} error={error} loading={loading} />
            }
          />
          <Route path="*" element={<Landing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
