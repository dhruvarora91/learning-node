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

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
  
//   const token = jwt.sign({ _id: 'abc123' }, 'thisisaprivatekey', { expiresIn: '7 days'})
//   console.log(token)

//   const data = jwt.verify(token, 'thisisaprivatekey')
//   console.log(data)
// }

// myFunction()