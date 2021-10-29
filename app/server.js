const express = require('express');
const app = express();
const read = require('recursive-readdir');
const { json } = require('body-parser');
const logger = require('./config/logger.js');

const cors = require('./config/cors');
const { isValidator } = require('./helpers/index.js');
// const { User } = require('@models')
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '1000'

const loggers = logger.logger

const checkAuthentication = async (req, res, next) => {
  // const user = await User.findByPk('6175dcb3-1dcb-468f-9827-f0c2a1cf6688')
  // res.locals.user = user;
  next()
}

const setAppUse = () => {
  app.set('trust proxy', 1);

  app.use(json());
  app.use(logger.request);
  app.use(cors);

  app.use(checkAuthentication)
}

const setError = () => {
  app.use((err, req, res, next) => {

    const status = 'fail'
    if(err.status === 400) {
      loggers.error(err.message)
      return res.status(400).send({ 
        message:  err.message,
        status
      })
    }

    if(err.status === 401) {
      loggers.error(err.message)
      return res.status(401).send({ 
        message: err.message, 
        status
      })
    }
    
    if(err.status === 404) {
      loggers.error(err.message)
      return res.status(401).send({ 
        message: err.message, 
        status
      })
    }

    loggers.error(err.message)
    res.status(500).send({ 
      message: err.message,
      status
    })
  })

}

const startApp = () => {
  setAppUse()

  app.listen(PORT, 'localhost', () => {
    console.log(`http://${HOST}:${PORT}`)

    // load routes files
    read(`${__dirname}/routes`, (err, files) => {
      files.forEach((file) => {
        const subpath = file.split('routes')[1];
        if(!isValidator(subpath)) {
          require(`${__dirname}/routes/${subpath}`).route(app);
        }
      })
      setError()
    })
    // handling error
  })
}

startApp()