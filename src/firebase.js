import firebase from 'firebase/app'
import 'firebase/firebase-messaging'



var firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"


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