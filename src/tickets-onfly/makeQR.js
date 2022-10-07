const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');

const canvas = createCanvas(4096, 1379);
const fs = require('fs');

// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url);
// });
console.log('asd');

QRCode.toCanvas(canvas, 'asd', function cb(err) {
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./qr.png', buffer);
  console.log('asd');
});
