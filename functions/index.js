const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=>{
    //CHECK REQUEST IS MADE BY ADMIN
     if(context.auth.token.admin !== true){
         return {error : 'only admins can add other admins, asshole!!'}
     }
     
 //get user and add custom claim(admin)
 return admin.auth().getUserByEmail(data.email).then(user=>{
     return admin.auth().setCustomUserClaims(user.uid,{
         admin:true
     })
 }).then(()=>{
   return {
       message:`success! ${data.email} has been made an admin`
   }  
 }).catch(err=> err);
})