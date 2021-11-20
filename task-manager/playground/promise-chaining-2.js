require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('619397232e881f0eea5c6624').then((task) => {
//   // console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('6197888184488d8fe57d072c').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})