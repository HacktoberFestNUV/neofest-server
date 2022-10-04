import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

import serviceAccount from '../env/serviceAccountKey.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
