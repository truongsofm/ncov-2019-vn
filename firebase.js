let firebase = require('firebase');

var firebaseConfig = {
    apiKey: process.env.firebase_apiKey,
    authDomain: process.env.firebase_authDomain,
    databaseURL: process.env.firebase_databaseURL,
    projectId: process.env.firebase_projectId,
    storageBucket: process.env.firebase_storageBucket,
    messagingSenderId: process.env.firebase_messagingSenderId,
    appId: process.env.firebase_appId
};

let firebaseConnect = firebase.initializeApp(firebaseConfig);

/* Covid VN */
covidGet = (database) => {
    var covidFirebase = firebase.database().ref(database);
    return covidFirebase.once('value').then(snapshot => {
        let covidSnap = snapshot.val();
        let covidData = [];
        for (const key in covidSnap) {
            if (covidSnap.hasOwnProperty(key)) {
                covidData.push(covidSnap[key]);
            }
        }
        return covidData;
    });
}

covidDelete = (database) => {
    var covidFirebase = firebase.database().ref(database);
    covidFirebase.once('value').then(snapshot => {
        let covidSnap = snapshot.val();
        for (const key in covidSnap) {
            if (covidSnap.hasOwnProperty(key)) {
                covidFirebase.child(key).remove();
            }
        }
    });
}

covidUpdate = (data, database) => {
    var covidFirebase = firebase.database().ref(database);
    covidFirebase.push(data);
}

// Initialize Firebase
module.exports = { firebaseConnect, covidGet, covidUpdate, covidDelete };
