(this["webpackJsonpreact-chat"]=this["webpackJsonpreact-chat"]||[]).push([[0],{16:function(e,t,a){e.exports=a(30)},21:function(e,t,a){},23:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(11),o=a.n(c),l=(a(21),a(9)),i=a.n(l),u=a(12),s=a(7),m=(a(23),a(5)),d=a.n(m),p=(a(24),a(28),a(31),a(14)),h=a(15);d.a.initializeApp({apiKey:"AIzaSyCt0AapeDmduiTedkzN7DFrkKWL6yUTBdg",authDomain:"collabo-chat.firebaseapp.com",databaseURL:"https://collabo-chat-default-rtdb.firebaseio.com",projectId:"collabo-chat",storageBucket:"collabo-chat.appspot.com",messagingSenderId:"255596477659",appId:"1:255596477659:web:a2d7cc19aacfef45f220fe",measurementId:"G-11Y85DFBQ2"});var f=d.a.auth(),b=d.a.firestore();d.a.analytics();function g(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"sign-in",onClick:function(){var e=new d.a.auth.GoogleAuthProvider;f.signInWithPopup(e)}},"Sign in with Google"),r.a.createElement("p",null,"Do not violate the community guidelines or you will be banned for life!"))}function v(){return f.currentUser&&r.a.createElement("button",{className:"sign-out",onClick:function(){return f.signOut()}},"Sign Out")}function E(){var e=Object(n.useRef)(),t=b.collection("messages"),a=t.orderBy("createdAt").limit(25),c=Object(h.a)(a,{idField:"id"}),o=Object(s.a)(c,1)[0],l=Object(n.useState)(""),m=Object(s.a)(l,2),p=m[0],g=m[1],v=function(){var a=Object(u.a)(i.a.mark((function a(n){var r,c,o;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),r=f.currentUser,c=r.uid,o=r.photoURL,a.next=4,t.add({text:p,createdAt:d.a.firestore.FieldValue.serverTimestamp(),uid:c,photoURL:o});case 4:g(""),e.current.scrollIntoView({behavior:"smooth"});case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("main",null,o&&o.map((function(e){return r.a.createElement(w,{key:e.id,message:e})})),r.a.createElement("span",{ref:e})),r.a.createElement("form",{onSubmit:v},r.a.createElement("input",{value:p,onChange:function(e){return g(e.target.value)},placeholder:"say something nice"}),r.a.createElement("button",{type:"submit",disabled:!p},"\ud83d\udd4a\ufe0f")))}function w(e){var t=e.message,a=t.text,n=t.uid,c=t.photoURL,o=n===f.currentUser.uid?"sent":"received";return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"message ".concat(o)},r.a.createElement("img",{src:c||"https://api.adorable.io/avatars/23/abott@adorable.png"}),r.a.createElement("p",null,a)))}var y=function(){var e=Object(p.a)(f),t=Object(s.a)(e,1)[0];return r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement("h1",null,"\u269b\ufe0f\ud83d\udd25\ud83d\udcac"),r.a.createElement(v,null)),r.a.createElement("section",null,t?r.a.createElement(E,null):r.a.createElement(g,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.87b6d883.chunk.js.map