const mongoose = require('mongoose')

// Connecting to Database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  // useCreateIndex: true  // not supported
})