const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res) => {
  // console.log(req.body) // Printing incoming JSON as an object
  // res.send('testing')
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user: user, token: token })
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

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user: user, token: token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', auth, async (req, res) => {

  try {

    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()
    res.send()

  } catch (e) {
    res.status(500).send(e)
  }


})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (e) {
//     res.status(500).send()
//   }

//   // User.find({}).then((users) => {
//   //   res.send(users)
//   // }).catch((e) => {
//   //   res.status(500).send()
//   // })
// })

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
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
      // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) 

      const user = await User.findById(req.params.id)

      _updates.forEach((update) => {
        user[update] = req.body[update]
      })
      
      await user.save()

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