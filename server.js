import express from 'express';
import { db } from './src/firebase-init.js';
import { user, pass } from './getCreds.js';
const app = express();
import nodeoutlook from 'nodejs-nodemailer-outlook';

const sender = async (to) => {
  nodeoutlook.sendEmail({
    auth: {
      user: user,
      pass: pass,
    },
    from: user,
    to,
    subject: 'RSVP confirmed!!!',
    html: "<b>Thanks for RSVP'ing for the event! We love you have a cupcake!</b>",
    text: 'This is text version!',
    replyTo: user,

    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
};

try {
  //   console.log(123, db);
  const collection = db.collection('users');

  const observer = collection.onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type == 'added') {
        console.log(change.doc.data());
        sender(change.doc.data().email);
      }
    });
  });
} catch (error) {
  console.error(error);
}

app.listen(3001, async () => {
  console.log("waddup :)");
});