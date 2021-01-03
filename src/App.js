import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
      <button className="sign-in" onClick={signInWithGoogle}>Sign the fuck in with Google</button>
      <p>Built for fucking busy people.</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign the fuck Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

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

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="~ Be helpful ~" />

      <button type="submit" disabled={!formValue}>https://www.google.com/imgres?imgurl=https%3A%2F%2Fhackr.io%2Ftutorials%2Fc%2Flogo-c.svg%3Fver%3D1553674176&imgrefurl=https%3A%2F%2Fhackr.io%2Ftutorials%2Flearn-c&tbnid=RuT3Qh5xTu7gOM&vet=12ahUKEwjciNDIx_7tAhXRC98KHdHLCDgQMygHegUIARCVAQ..i&docid=K29wdRhCC_tJoM&w=800&h=800&q=%20%20c&ved=2ahUKEwjciNDIx_7tAhXRC98KHdHLCDgQMygHegUIARCVAQ</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL, lumens } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
      <p>{lumens}</p>
    </div>
  </>)
}


export default App;
