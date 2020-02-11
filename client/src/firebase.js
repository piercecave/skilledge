import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD2vjEqE1R7yABoHIxe_wywbpUs8fsZ0Ec",
    authDomain: "rocktrip-1ad68.firebaseapp.com",
    databaseURL: "https://rocktrip-1ad68.firebaseio.com",
    projectId: "rocktrip-1ad68",
    storageBucket: "rocktrip-1ad68.appspot.com",
    messagingSenderId: "501341083119"
};
firebase.initializeApp(config);
export default firebase;