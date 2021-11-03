const { config } = require('../../config');

const createUploadLink = (imageUrl) => {
  const imagePath = imageUrl.split('uploads\\')[1];
  return `${config.baseUrl}/${imagePath}`;
};

module.exports = {
  createUploadLink,
};
