// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyDyCn3ok7ouS-9YO4V7E-ICnfuyMGPGx9g",
  authDomain: "clinica-virtual-6597d.firebaseapp.com",
  databaseURL: "https://clinica-virtual-6597d.firebaseio.com",
  projectId: "clinica-virtual-6597d",
  storageBucket: "clinica-virtual-6597d.appspot.com",
  messagingSenderId: "705335351250",
  appId: "1:705335351250:web:de23f5873b809282"
};

firebase.initializeApp(config);

var messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
var sender = new BroadcastChannel('secretariavirtual');

messaging.onBackgroundMessage((payload) => {
  const msg = JSON.parse(payload.data.data).whatsapp;

  //console.log(msg);


  if (msg != undefined) {

    if (msg.nome_cliente == '') {
      from = (msg.telefone.length == 12 ? msg.telefone.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '($2) $3-$4') : msg.telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'));

    } else {
      from = msg.nome_cliente;
    }

    // Customize notification here
    const notificationTitle = 'Nova mensagem de: ' + from + '!!';
    const notificationOptions = {
      body: msg.message,
      icon: 'logo.png'
    };


    sender.postMessage([notificationTitle, notificationOptions]);
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  }
});
// [END background_handler]3
