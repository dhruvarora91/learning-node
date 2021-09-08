// CRUD operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// Operations on Object ID
const id = ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewURLParser: true }, (error, client) => {

  if (error) {
    return console.log('Unable to connect to database')
  } 

  // console.log('Connected successfully!')
  const db = client.db(databaseName)

  // * CREATE *

  // * To add a single record *
  // db.collection('users').insertOne({
  //   // _id: id,
  //   name: 'Jen',
  //   age: 28
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to add users')
  //   }
  //   console.log(result.insertedId)
  // })

  // * To add multiple records *
  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Task 1',
  //     completed: false,
  //   }, {
  //     description: 'Task 2',
  //     completed: true,
  //   }, {
  //     description: 'Task 3',
  //     completed: true,
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to add tasks')
  //   }
  //   console.log(result.insertedIds)
  // })

  // * READ *

  // * To read a single query *
  // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch user!')
  //   }
  //   console.log(user)
  // })

   //  To read a query uing id , _id: "612517eb4975b4f9a797733d" will not work as it is an ObjectId
  // db.collection('users').findOne({ _id: ObjectId("612517eb4975b4f9a797733d") }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch user!')
  //   }
  //   console.log(user)
  // })

  // * To read multiple queries *
  // db.collection('users').find({ name: 'Jen' }).toArray((error, users) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(users)
  // })

  // * To just get the count *
  // db.collection('users').find({ name: 'Jen' }).count((error, count) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(count)
  // })

  // * To Find many records *
  // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
  //   console.log(tasks)
  // })

  // * UPDATE *

  // * To update a single record *

  //  ------ Alternate ------
  // const updatePromise = db.collection('users').updateOne({
  //   _id: new ObjectId('61251b844ed735aa31ed5b75')
  // }, {
  //   $set: {
  //     name: 'Mike'
  //   }
  // })

  // updatePromise.then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection('users').updateOne({
  //   _id: new ObjectId('61251b844ed735aa31ed5b75')
  // }, {
  //   $set: {
  //     name: 'Mike'
  //   }
  //   // $inc: {
  //   //   age: 1
  //   // }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // * To update many records *

  // db.collection('tasks').updateMany({

  //   completed: false

  // } , {

  //   $set: {
  //     completed: true
  //   }

  // }).then((result) => {

  //   console.log(result)

  // }).catch((error) => {

  //   console.log(error)

  // })

  // * DELETE *

  // * To delete a single record *
  // db.collection('tasks').deleteOne({description: 'Task 1'}).then((result) => {
  //     console.log(result)
  //   }).catch((error) => {
  //     console.log(error)
  //   })

  // * To delete multiple records *
  // db.collection('users').deleteMany({ name: 'Jen' }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

})