const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive')
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is Invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the string \'Password\'')
      } 
    }
  }, 
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// methods are accessible on instance 
// also called instance methods
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisaprivatekey')
  user.tokens = user.tokens.concat({ token: token })
  await user.save()
  return token
}

// statics are accessible on models 
// also called model methods
userSchema.statics.findByCredentials = async (email, password) => {

  const user = await User.findOne({ email: email })
  if(!user) {
    // user doesn't exist with this email
    throw new Error('Unable to login!')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    // incorrect password
    throw new Error('Unable to login!')
  }
  
  return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User