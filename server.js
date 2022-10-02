import express from 'express';
import { db } from './src/firebase-init.js';
const app = express();
try {
  //   console.log(123, db);
  const collection = db.collection('users');

  const observer = collection.onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      console.log(change.doc.data());
    });
  });
} catch (error) {
  console.error(error);
}

app.listen(3001, async () => {
  console.log('waddup :)');
});
