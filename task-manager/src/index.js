const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // Parse incoming JSON to an object

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

// * ADD THIS TO NOTES.ORG
// const bcrypt = require('bcryptjs')
// const hashPasswordFunction = async () => {
//   const password = 'Test1234!@'
//   const hashedPassword = await bcrypt.hash(password, 8)
//   console.log(password)
//   console.log(hashedPassword)
//   const isMatch = await bcrypt.compare('Test1234!@', hashedPassword)
//   console.log(isMatch)
// }
// hashPasswordFunction()
