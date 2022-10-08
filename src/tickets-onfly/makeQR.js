import fs from 'fs';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';

import { createCanvas } from 'canvas';
const canvas = createCanvas(4096, 1379);

export const makeQROnFly = async (uid, name, email) => {
  const token = jwt.sign({ uid, name, email }, '%hacktoberfest2022%%');
  QRCode.toCanvas(canvas, token, function cb(err) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./qr.png', buffer);
  });
};

// example
// makeQROnFly('asdasda123', 'xoxo', 'xoxo@gmail.com');
