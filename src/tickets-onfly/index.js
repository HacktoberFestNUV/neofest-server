import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { makeQROnFly } from './makeQR.js';
const canvas = createCanvas(1228, 410);
const ctx = canvas.getContext('2d');

export const createTicketOnFly = async (uid, name, email) => {
  loadImage('images/qr-ticket-reduced-updated.png').then(async (image) => {
    //   ctx.drawImage(image, 50, 0, 70, 70);
    ctx.drawImage(image, 0, 0, 1228, 410);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./${uid}.png`, buffer);
    await makeQROnFly(uid, name, email);
    loadImage(`qr-${uid}.png`).then((image) => {
      ctx.drawImage(image, 977, 137, 150, 150);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`./${uid}.png`, buffer);
    });
    console.log(`Ticket Created for ${name}`);
  });
};

// createTicketOnFly('asdasda123', 'xoxo', 'x0x0@gmail.com');
