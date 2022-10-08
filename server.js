import express from 'express';
import { db } from './src/firebase-init.js';
import { user, pass } from './getCreds.js';
import { createTicketOnFly } from './src/tickets-onfly/index.js';
const app = express();
import nodeoutlook from 'nodejs-nodemailer-outlook';
const PORT = process.env.PORT || 3001;
const sender = async (uid, name, to) => {
  await createTicketOnFly(uid, name, to);

  const text = `<b>Thanks ${name} for RSVP'ing for the event! We love you and have a cupcake!</b>`;

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
    attachments: [
      {
        filename: `${name}.png`,
        path: './onfly.png',
      },
    ],

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
        sender(
          change.doc.data().uid,
          change.doc.data().name,
          change.doc.data().email
        );
      }
    });
    i = i + 1;
  });
} catch (error) {
  console.error(error);
}

app.get('/', (req, res) => {
  res.send('The NEOFEST Server online ✅');
});

app.listen(PORT, async () => {
  console.log('waddup :)');
});
