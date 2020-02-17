const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const analytics = admin.analytics();

const request = require('request-promise');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



// When a user is created, created their profile
exports.createUserProfile = functions.auth.user()
  .onCreate(async (user) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let randoName = `grookeyGang${ result }`;
    return admin.firestore().collection('profile').doc(user.uid).set({
      'TOS': true,
      'displayName': randoName,
      'email': user.email,
      'supportEmail': user.email,
      'friendCode': '',
      'trainerID': '',
      'discordID': '',
    });
});