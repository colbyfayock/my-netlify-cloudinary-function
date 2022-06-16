const cloudinary = require('cloudinary').v2;

const image = cloudinary.url('<Your Public ID>', {
  sign_url: true,
  secure: true,
  custom_function: {
    function_type: 'remote',
    source: 'https://<Your Netlify Site>.netlify.app/.netlify/functions/blurhash'
  }
})

console.log(image);