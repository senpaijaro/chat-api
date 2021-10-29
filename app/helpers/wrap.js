const Promise = require('bluebird')
module.exports = function wrapPromise (genFn) { // 1
  const cr = Promise.coroutine(genFn) // 2
    return function (req, res, next) { // 3
        cr(req, res, next).catch(next) // 4
    }
}