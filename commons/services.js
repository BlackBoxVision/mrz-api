const Mrz = require('mrz');
const JS = require('image-js');
const MrzDecoder = require('mrz-detection');

const decodeFromImage = async (ctx) => {
  let images = {};

  const image = await JS.Image.load(ctx.dataURI);

  await MrzDecoder.getMrz(image, {
    debug: true,
    out: images,
  });

  const decodedImage = await JS.Image.load(images.crop.toDataURL());

  const { mrz } = await MrzDecoder.readMrz(decodedImage, {
    debug: true,
  });

  return Mrz.parse(mrz.join('\r\n'));
};

module.exports = {
  decodeFromImage,
};
