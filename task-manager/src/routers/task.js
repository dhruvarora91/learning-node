const express = require('express')
const Task = require('../models/task')

const router = express.Router()

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
  // task.save().then(() => {
  //   res.status(201).send(task)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })
})

router.get('/tasks', async (req, res) => {
  try {
    const task = await Task.find()
    res.send(task)
  } catch (e) {
    res.send(500).send(e)
  }
  // Task.find({}).then((task) => {
  //   res.send(task)
  // }).catch((e) => {
  //   res.send(500).send(e)
  // })
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findById(_id)
    if (!task) {
      res.status(404).send()
    } else {
      res.send(task)
    }
  } catch (e) {
    res.send(500).send()
  }
  // Task.findById(_id).then((task) => {
  //   if (!task) {
  //     res.status(404).send()
  //   } else {
  //     res.send(task)
  //   }
  // }).catch((e) => {
  //   res.send(500).send()
  // })
})

router.patch('/tasks/:id', async (req, res) => {

  const _allowedUpdates = ['description', 'completed']
  const _updates = Object.keys(req.body)

  const _isValidOperation = _updates.every((update) => {
    return _allowedUpdates.includes(update)
  })

  if (!_isValidOperation) {
    res.status(400).send({ error: 'Invalid Updates' })
  } else {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!task) {
        res.status(404).send()
      } else {
        res.send(task)
      }
    } catch(e) {
      res.status(400).send(e)
    }
  }

})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      res.status(404).send()
    } else {
      res.send(task)
    }
  } catch(e) {
    res.status(500).send(e)
  }
})

module.exports = router