import express from "express";
import { db } from "./src/firebase-init.js";
const app = express();
try {
  //   console.log(123, db);
  const collection = db.collection("users");

  const observer = collection.onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      console.log(change.doc.data());
    });
  });
} catch (error) {
  console.error(error);
}

app.listen(3001, async () => {
  console.log("waddup :)");
});


// import nodeoutlook from 'nodejs-nodemailer-outlook'
// nodeoutlook.sendEmail({
//   auth: {
//     user: "",
//     pass: '',
//   },
//   from: "20124034@nuv.ac.in",
//   to: "20124041@nuv.ac.in",
//   subject: "WOOOOO",
//   html: "<b>This is bold text</b>",
//   text: "This is text version!",
//   replyTo: "receiverXXX@gmail.com",
//   onError: (e) => console.log(e),
//   onSuccess: (i) => console.log(i),
// });