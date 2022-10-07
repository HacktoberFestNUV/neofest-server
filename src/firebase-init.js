import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { creds } from '../getCreds.js';
const serviceAccount = JSON.parse(creds);
initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
