const Model = require('@models')
const { UserSchema, ValidateRequest } = require('@middleware/user')
const { validateResponse } = require('@helpers/response')
const { passwordHash, isPasswordVerify } = require('@helpers')
const { jwtSign } = require('@helpers')
const { logger } = require('@config/logger')

exports.route = (app) => {
  app.post('/user', UserSchema, validateResponse, ValidateRequest, async (req, res) => {
    const { name, username, password } = req.body 
    try {
      const result = await Model.User.create({
        name,
        username,
        password: passwordHash(password)
      }) 
      return res.send({ result })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error })
    }
  })

  app.post('/user/auth', async (req, res) => {
    const { username = "", password = "" } = req.body 
    try {
      const user = await Model.User.findOne({ 
        where: { username } 
      })

      const result = { isLogin: false, message: 'Username and password is invalid', token: null }
      if(user !== null) {
        if(isPasswordVerify(password, user.password)) {
          result.isLogin = true
          result.message = "Successfully Login"
          result.token = jwtSign({ id: user.id })
        }
      }

      return res.send({ result })
    } catch (error) {
      return res.status(500).send({ error })
    }
  })
}

