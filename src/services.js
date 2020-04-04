const { parse } = require('mrz');
const { Image } = require('image-js');
const MrzDecoder = require('mrz-detection');

const decodeFromImage = async (ctx) => {
  let images = {};

  const image = await Image.load(ctx.dataURI);

  await MrzDecoder.getMrz(image, {
    debug: true,
    out: images,
  });

  const decodedImage = await Image.load(images.crop.toDataURL());

  const { mrz } = await MrzDecoder.readMrz(decodedImage, {
    debug: true,
  });

  return parse(mrz.join('\r\n'));
};

module.exports = {
  decodeFromImage,
};
