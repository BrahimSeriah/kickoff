const jwt = require('jsonwebtoken');


module.exports.checkToken = function(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports.isUserAdmine = function(token) {
    if (jwt.verify(token, process.env.JWT_SECRET)){
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        return decodedToken.isAdmin;
    }
}