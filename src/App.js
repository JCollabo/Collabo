//MAKE Amends AT TOP TO SEE IF WORKS//

import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import LumenButton from './lumenButton';

firebase.initializeApp({
  apiKey: "AIzaSyCt0AapeDmduiTedkzN7DFrkKWL6yUTBdg",
  authDomain: "collabo-chat.firebaseapp.com",
  databaseURL: "https://collabo-chat-default-rtdb.firebaseio.com",
  projectId: "collabo-chat",
  storageBucket: "collabo-chat.appspot.com",
  messagingSenderId: "255596477659",
  appId: "1:255596477659:web:a2d7cc19aacfef45f220fe",
  measurementId: "G-11Y85DFBQ2"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


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
      <p>Chat built for busy people</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function LumenRoom(){
/*where we make important shit first*/
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(5000);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const [lumenValue, setLumenValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      lumens: lumenValue
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="be helpful" />

      <button type="submit" disabled={!formValue}>C</button>

    </form>
  </>)
}

function ChatMessage(props) {

  const { text, uid, photoURL, lumens } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{LumenButton}</p>
      <p>{text}</p>
    </div>
  </>)
}

export default App;
