// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {addWish} from './firebase'
import {useHistory} from 'react-router-dom'
import SignInPage from './components/SignInPage'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const history = useHistory();

  useEffect(()=>{
    if(isSignedIn){
      history.push('/');
    }
  },[isSignedIn])

  if (!isSignedIn) {
    return (
      <SignInPage>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </SignInPage>
    )
  }
  
  return (
    <div>
      <h1>WeWish</h1>
      <p>Welcome {firebase.auth().currentUser.displayName}! You will be re-directed to the app soon!</p>
      <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      <button onClick={()=>addWish("AAA", "BBB", 2)}>Add wish</button>
    </div>
  );
}

export default SignInScreen;
