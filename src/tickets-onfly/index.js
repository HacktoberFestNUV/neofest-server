import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { makeQROnFly } from './makeQR.js';
const canvas = createCanvas(4096, 1379);
const ctx = canvas.getContext('2d');

export const createTicketOnFly = (uid, name, email) => {
  // Write "Awesome!"
  // ctx.font = '30px Impact';
  // ctx.rotate(0.1);
  // ctx.fillText('Awesome!', 50, 100);

  // Draw line under text
  // var text = ctx.measureText('Awesome!');
  // ctx.lineTo(50 + text.width, 102);
  // ctx.lineTo(50, 102);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.stroke();

  // Draw cat with lime helmet
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

createTicketOnFly('asdasda123', 'nimit', 'mnimitsavant@gmail.com');
