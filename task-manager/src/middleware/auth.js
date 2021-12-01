const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {

    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisisaprivatekey')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if(!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
    
  } catch (e) {
    res.status(401).send({ error: 'Please Authenticate.' })
  }
}

module.exports = auth

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTlmNjY4N2MyNDBkZjIxZDUxNTJjMzMiLCJpYXQiOjE2MzgxNzk0MzV9.-gc4GYXCe5bTInYEJaf4_rqm8Filx1w7Tlu0vLnHbl0"