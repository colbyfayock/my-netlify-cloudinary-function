const parser = require('lambda-multipart-parser');

exports.handler = async (event, context) => {
  const formData = await parser.parse(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'Ok' })
  }
};