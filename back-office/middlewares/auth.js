const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Accès non autorisé. Aucun token fourni.');
  }

  // Remove 'Bearer ' prefix if present in the token
  const bearerToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  // Verify the token
  jwt.verify(bearerToken, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).send('Token invalide ou expiré.');
    }

    // Attach user data to the request object for further use
    req.user = decoded;
    next();  // Continue to the next middleware or route handler
  });
};

module.exports = authMiddleware;
