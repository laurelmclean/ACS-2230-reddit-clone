const jwt = require('jsonwebtoken');

// req represents the request object
// res represents the response object
// next is a function that calls the next middleware function in the chain.
const checkAuth = (req, res, next) => {
    console.log('Checking authentication');
    // checks if the nToken cookie exists in the request object and is not null
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
        // f the nToken cookie exists, it retrieves its value and decodes it using the jwt.decode method 
        // passing an options object with { complete: true } to obtain the payload of the token.
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    // calls the next function to pass control to the next middleware in the chain
    next();
};

module.exports = checkAuth;