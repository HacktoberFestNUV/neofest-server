import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { makeQROnFly } from './makeQR.js';
const canvas = createCanvas(4096, 1379);
const ctx = canvas.getContext('2d');

export const createTicketOnFly = async (uid, name, email) => {
  loadImage('images/qr-ticket.png').then(async (image) => {
    //   ctx.drawImage(image, 50, 0, 70, 70);
    ctx.drawImage(image, 0, 0, 4096, 1379);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./onfly.png', buffer);
    await makeQROnFly(uid, name, email);
    loadImage('qr.png').then((image) => {
      ctx.drawImage(image, 3258, 465, 500, 500);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync('./onfly.png', buffer);
    });
    console.log('<img src="' + canvas.toDataURL() + '" />');
  });
};

// createTicketOnFly('asdasda123', 'xoxo', 'x0x0@gmail.com');
