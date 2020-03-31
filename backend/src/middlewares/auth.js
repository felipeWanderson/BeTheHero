const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../config/auth');

module.exports = async function (request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(401).json({ error: 'token is not provider'});
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    request.ongId = decoded.id;
    return next();  
  } catch (error) {
    return response.status(401).json({ error: 'token invalid'});
  }
};