require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('618fa8fe54a6d61d8102f9e1', { age: 1 }).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const updateUserAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age: age }) // or simply { age }
  const count = await User.countDocuments({ age: age })
  return count
} 

updateUserAndCount('618fa8fe54a6d61d8102f9e1', 2).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})