import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Helmet } from 'react-helmet'

import collaboC from './CollaboC.png'

import { Container, Flex, Spinner, VStack } from "@chakra-ui/core";
import Post from "./components/post";


firebase.initializeApp({
  apiKey: "AIzaSyCt0AapeDmduiTedkzN7DFrkKWL6yUTBdg",
    authDomain: "collabo-chat.firebaseapp.com",
    databaseURL: "https://collabo-chat-default-rtdb.firebaseio.com",
    projectId: "collabo-chat",
    storageBucket: "collabo-chat.appspot.com",
    messagingSenderId: "255596477659",
    appId: "1:255596477659:web:78b061c06377cceaf220fe",
    measurementId: "G-S17408XZXB"
})

document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const TITLE = 'My Page Title'

class MyComponent extends React.PureComponent {
  render () {
    return (
      <>                                
        <Helmet>
          <title>{ "-Collabo1-" }</title>
        </Helmet>
        ...
      </>
    )
  }
}

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Collabo</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Built for busy people.</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(2000);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      lumens: lumenCounter
    })
                                                                                
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    // Hook to handle the real-time updating of messages whenever there is a
    // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)

    db.collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _messages = [];

        querySnapshot.forEach((doc) => {
          _messages.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setmessages(_messages);
      });
  }, []);

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder=" Be helpful " />

      <button type="submit" disabled={!formValue}> <img src={collaboC} alt="Collabo"/> </button>

    </form>
  </>)
}

export default App;