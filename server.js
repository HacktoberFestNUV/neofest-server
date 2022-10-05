import express from 'express';
import { db } from './src/firebase-init.js';
import { user, pass } from './getCreds.js';
import fs from 'fs';
const app = express();
import nodeoutlook from 'nodejs-nodemailer-outlook';

const sender = async (to, user_name) => {
  nodeoutlook.sendEmail({
    auth: {
      user: user,
      pass: pass,
    },
    from: user,
    to,
    subject: 'RSVP confirmed!!!',
    html: `<b>Thanks ${user_name} for RSVP'ing for the event! We love you have a cupcake!</b>`,
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
    let userData = {
      data: []
    }

    querySnapshot.docChanges().forEach((change) => {
      if (change.type == 'added') {
        userData.data.push(change.doc.data());

        const dataArr = JSON.parse(fs.readFileSync('userData.json', 'utf8')).data;

        for(let i = 0; i < dataArr.length; i++) {
          if(!dataArr[i].uid === change.doc.data().uid) {
            console.log('send')
            // sender(change.doc.data().email, change.doc.data().name);
            break;
          }
        }
      }
    });

    fs.writeFileSync('userData.json', JSON.stringify(userData));
    
  });
} catch (error) {
  console.error(error);
}

app.listen(5000, async () => {
  console.log("waddup :)");
});