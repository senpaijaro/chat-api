const { validationResult } = require('express-validator');

exports.validateResponse = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next()
}

exports.handleTryCatchError = (fn, res) => {
  return function(...props) {
    try {
      fn(...props)
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error })
    }
  }
}