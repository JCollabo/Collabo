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
  const myLumens = db.collection('messages').doc('lumens')
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
          <title>{ "Collabo1" }</title>
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
  const lumensRef = firestore.collection('lumens')
  const query = messagesRef.orderBy('createdAt').limit(2000);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const [lumenCounter, setLumenCounter] = useState('');

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

    setLumenCounter('');                                                                                             /*setLumenCounter*/
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

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

function giveLumen(p){
  const db = firebase.firestore;
  const messages = db.collection('messages').doc(this)
  messages.update({lumens: lumens+1})
}

function ChatMessage(props) {
  const { text, uid, photoURL, lumens } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />

      
      <div className = "lumens">

        <button onClick= {giveLumen()} className="lumens">
        💡
        </button>

      </div>

      <p>{lumens}</p>
      <p>{text}</p>

    </div>
  </>)
}


export default App;
