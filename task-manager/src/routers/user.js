const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/users', async (req, res) => {
  // console.log(req.body) // Printing incoming JSON as an object
  // res.send('testing')
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user)
  } catch(e) {
    res.status(400)
    res.send(e)
  }
  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((e) => {
  //   res.status(400)
  //   res.send(e)
  // })
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }

  // User.find({}).then((users) => {
  //   res.send(users)
  // }).catch((e) => {
  //   res.status(500).send()
  // })
})

router.get('/users/:id', async (req, res) => {
  // console.log(req.params)
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      // User doesn't exist
      res.status(404).send() 
    } else {
      res.send(user)
    }
  } catch (e) {
    res.status(500).send(e)
  }
  // User.findById(_id).then((user) => {
  //   if (!user) {
  //     // User doesn't exist
  //     res.status(404).send() 
  //   } else {
  //     res.send(user)
  //   }
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })
  
})

router.patch('/users/:id', async (req, res) => {

  const _allowedUpdates = ['name', 'email', 'password', 'age']
  const _updates = Object.keys(req.body)

  const _isValidOperation = _updates.every((update) => {
    return _allowedUpdates.includes(update)
  })

  if (!_isValidOperation) {
    res.status(400).send({ error: 'Invalid updates' })
  }
  else {
    try {
      // new: true , returns the new user as opposed to old one find during update
      // runValidators: true , validates the new body
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) 
      if (!user) {
        // no user exists with this id
        res.status(404).send()
      } else {
        res.send(user)
      }
      
    } catch(e) {
      res.status(404).send(e)
    }
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      res.status(404).send()
    } else {
      res.send(user)
    }
  } catch(e) {
    res.status(500).send(e)
  }
})

module.exports = router