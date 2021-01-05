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

const Post = ({ post }) => {
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      ...
    </HStack>
  );
};


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

    setLumenCounter(0);                                                                                             /*setLumenCounter*/
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

import VoteButtons from "./vote-buttons";
import { IconButton, Text, VStack } from "@chakra-ui/core";
import { FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const VoteButtons = ({ message }) => {
  const handleClick = async (type) => {
    // Do calculation to save the vote.
    let lumens= message.lumens;

    const date = new Date();

    if (type === "upvote") {
      lumens = lumens + 1;
    } 
    await db.collection("messages").doc(post.id).set({
      title: post.title,
      lumens,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });
  };

  return (
    <>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Lumen"
          icon={<FiArrowUp />}
          onClick={() => handleClick("lumen")}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.upVotesCount}
        </Text>
      </VStack>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="yellow"
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};


export default App;
