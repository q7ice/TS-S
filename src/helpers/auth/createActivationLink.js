const { config } = require('../../config');

const createActivationLink = (activationId) => `${config.baseUrl}:${config.port}/activate/${activationId}`;

module.exports = {
  createActivationLink,
};
