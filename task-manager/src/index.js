const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// With middlewre we can perform something in between the new request and route handler
// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('Get Requests are Disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site Under Maintainence')
// })



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