import express from 'express';
import { db } from './src/firebase-init.js';
import { user, pass } from './getCreds.js';
import { createTicketOnFly } from './src/tickets-onfly/index.js';
const app = express();
import fs from 'fs';
import nodeoutlook from 'nodejs-nodemailer-outlook';
const PORT = process.env.PORT || 3001;
const sender = async (uid, name, to) => {
  await createTicketOnFly(uid, name, to);
  // const text = `<b>Thanks ${name} for RSVP'ing for the event! We love you and have a cupcake!</b>`;
  const text = `<a href="https://neofest.live"><img src="cid:img" alt="Banner" width="100%"></a><br \><p>Thanks ${name} for registering! We look forward to seeing you soon. It couldn't have been done without you!<br \><br \>We are organizing a 2-day technical event “NEOFEST” in accordance with HacktoberFest'22 which focuses on Open-Source environment, which will consist of various executive talks, workshops, and hackathon at the Navrachana University.<br \>A follow-up will soon be provided with a detailed event timeline! Super excited to have you on board with us!<br \><br \>
  Navrachana University on Google Maps<br \>
  https://goo.gl/maps/bsi3bNWzMgeAbHi2A<br \><br \>
  Regards,<br \>Team HacktoberfestNUV '22<\p>`;
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
        path: `./${uid}.png`,
      },
      {
        filename: 'img.png',
        path: './Banner.png', // path contains the filename, do not just give path of folder where images are reciding.
        cid: 'img', // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
      },
    ],

    onError: (e) => console.log(e),
    onSuccess: (i) => {
      const filePath = `./${uid}.png`;
      const filePathQR = `./qr-${uid}.png`;
      console.log(filePathQR);
      fs.unlinkSync(filePath);
      fs.unlinkSync(filePathQR);
      console.log(i);
    },
  });
};
// sender('123', 'nimit', 'ashwinadiga0111@gmail.com');
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
