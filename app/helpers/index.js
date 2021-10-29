
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.isValidator = (dir="") => {
  return (dir.slice(-12) === "validator.js") ? true : false;
}

exports.passwordHash =  (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

exports.isPasswordVerify = (password, hash) =>{
  return bcrypt.compareSync(password, hash); // true
}

exports.jwtSign = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY_JWT, { expiresIn: '1h' });
}

exports.jwtVerify = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY_JWT);
}

exports.STATUS =  {
  PENDING: 0,
  ACTIVE: 1,
  DEACTIVATE: 2
}