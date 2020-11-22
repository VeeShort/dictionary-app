const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (request, response, next) => {
  const errorHandler = (message = 'Request Error') => {
    response.status(401).json({ message });
  };

  if (request && request.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = request.headers.authorization.split(' ')[1]; // "Bearer <token>"

    if (!token) {
      return errorHandler('Not authorized');
    }

    // decode token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    request.user = decoded;
    next();
  } catch (err) {
    return errorHandler('Not authorized');
  }
};
