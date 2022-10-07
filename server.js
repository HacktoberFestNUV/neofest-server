import express from 'express';
import { db } from './src/firebase-init.js';
import { user, pass } from './getCreds.js';
import fs from 'fs';
const app = express();
import nodeoutlook from 'nodejs-nodemailer-outlook';

const sender = async (to, user_name) => {
  const text = `<b>Thanks ${user_name} for RSVP'ing for the event! We love you and have a cupcake!</b>`;
  nodeoutlook.sendEmail({
    auth: {
      user: user,
      pass: pass,
    },
    from: user,
    to,
    subject: 'RSVP confirmed!!!',
    html: `${text}`,
    text: `${text}`,
    replyTo: user,

    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
};

try {
  const collection = db.collection('users');
  let i = 0;
  const observer = collection.onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type == 'added' && i > 0) {
        console.log(change.doc.data());
        sender(change.doc.data().email, change.doc.data().name);
      }
    });
    i = i + 1;
  });
} catch (error) {
  console.error(error);
}

app.listen(3001, async () => {
  console.log('waddup :)');
});
