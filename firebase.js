let firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCdouF_BqwdzOVO_KzNRRC0DoAolf2gWw0",
    authDomain: "ncov-2019-vn.firebaseapp.com",
    databaseURL: "https://ncov-2019-vn.firebaseio.com",
    projectId: "ncov-2019-vn",
    storageBucket: "ncov-2019-vn.appspot.com",
    messagingSenderId: "934349906713",
    appId: "1:934349906713:web:30a5524d508d0dee105b88"
};

let firebaseConnect = firebase.initializeApp(firebaseConfig);

/* Covid VN */
var covidVNFirebase = firebase.database().ref('VIETNAM');
covidVNGet = () => {
    return covidVNFirebase.once('value').then(snapshot => {
        let covidVNSnap = snapshot.val();
        let covidData = [];
        for (const key in covidVNSnap) {
            if (covidVNSnap.hasOwnProperty(key)) {
                covidData.push(covidVNSnap[key]);
            }
        }
        return covidData;
    });
}

covidVNDelete = () => {
    covidVNFirebase.once('value').then(snapshot => {
        let covidVNSnap = snapshot.val();
        for (const key in covidVNSnap) {
            if (covidVNSnap.hasOwnProperty(key)) {
                covidVNFirebase.child(key).remove();
            }
        }
    });
}

covidVNUpdate = (data) => {
    covidVNFirebase.push(data);
}

// Initialize Firebase
module.exports = { firebaseConnect, covidVNGet, covidVNUpdate, covidVNDelete };