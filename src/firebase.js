import firebase from 'firebase/app'
import 'firebase/firebase-messaging'



var firebaseConfig = {
    apiKey: "AIzaSyBxcrzplKWoLXl2sY33J_wE77YzqWVYCyc",
    authDomain: "scriptador-df22c.firebaseapp.com",
    databaseURL: "https://scriptador-df22c.firebaseio.com",
    projectId: "scriptador-df22c",
    storageBucket: "scriptador-df22c.appspot.com",
    messagingSenderId: "665220623227",
    appId: "1:665220623227:web:c4187b6004c3b575a82bde",
    measurementId: "G-WVWCKRHSTX"


}
firebase.initializeApp(firebaseConfig)

//navigator.serviceWorker.register('/firebase-messaging-sw.js').then(reg => {

firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
        localStorage.setItem('token', JSON.stringify(currentToken));

    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');

    }
}).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    //localizar id app e colocar botao
    document.getElementById("app").innerHTML = '<button onclick="ativarNotificacoes()">Ativar notificações</button>';


});
/*
    })
    .catch(error => {
        const msg = `Service Worker Error (${error})`;
        console.error(msg);
    });
*/
export default firebase.messaging()