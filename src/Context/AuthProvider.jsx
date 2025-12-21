// import React, { useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth } from "../firebase/Firebase.init";

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // REGISTER
//   const registerUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // LOGIN
//   const loginUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // GOOGLE LOGIN
//   const signInGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   // LOG OUT
//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // UPDATE PROFILE
//   const updateUserProfile = (profile) => {
//     return updateProfile(auth.currentUser, profile);
//   };

//   // FORGOT PASSWORD
//   const resetPassword = (email) => {
//     setLoading(true);
//     return sendPasswordResetEmail(auth, email);
//   };

//   // OBSERVE USER
//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unSubscribe();
//   }, []);

//   const AuthInfo = {
//     user,
//     loading,
//     registerUser,
//     loginUser,
//     signInGoogle,
//     logOut,
//     updateUserProfile,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/Firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const displayName = email
        .split("@")[0]
        .replace(/\./g, " ")
        .replace(/_/g, " ");
      await updateProfile(userCredential.user, { displayName });

      await axios.post("http://localhost:3000/auth/register", {
        uid: userCredential.user.uid,
        displayName,
        email,
      });

      return userCredential;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.uid) {
        await axios.post("http://localhost:3000/auth/login", {
          uid: result.user.uid,
        });
      }
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName || result.user.email.split("@")[0],
        email: result.user.email,
      };

      await axios
        .post("http://localhost:3000/auth/register", userData)
        .catch(() => {});

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const AuthInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    signInGoogle,
    logOut,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
