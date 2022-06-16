const parser = require('lambda-multipart-parser');
const { encode, decode } = require('blurhash');
const sharp = require('sharp');

exports.handler = async (event, context) => {
  const formData = await parser.parse(event);

  const { data, info } = await sharp(formData.files[0].content)
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true
    });

  const encoded = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
  const decoded = decode(encoded, info.width, info.height);

  const image = await sharp(Buffer.from(decoded), {
    raw: {
      channels: 4,
      width: info.width,
      height: info.height,
    },
  })
    .jpeg({
      overshootDeringing: true,
      quality: 40,
    })
    .toBuffer();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Length': image.length
    },
    isBase64Encoded: true,
    body: image.toString('base64')
  }
};