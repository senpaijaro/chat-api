const { checkSchema } = require('express-validator');
const Model = require('@models')

exports.UserSchema = checkSchema({
  name: {
    in: ["body"],
    isLength: {
      errorMessage: 'Name should be not less than 1 and not greater than 100 characters',
      options: {
        min: 1,
        max: 100,
      }
    }
  },
  username: {
    in: ["body"],
    isLength: {
      errorMessage: 'Username should be not less than 1 and not greater than 100 characters',
      options: {
        min: 1,
        max: 100,
      }
    }
  },
  password: {
    in: ["body"],
    isLength: {
      errorMessage: 'Password should be not less than 1 and not greater than 100 characters',
      options: {
        min: 1,
        max: 100,
      }
    }
  }
})

exports.ValidateRequest = async (req, res, next) => {
  const { username = "" } = req.body
  // checking username if existing
  const user = await Model.User.findOne({ where: { username } })
  if(user !== null) {
    return res.status(400).send({ result: { message: 'Username is arealdy exist' } })
  }

  next()
}