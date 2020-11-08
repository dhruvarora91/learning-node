const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')
const { demandOption } = require('yargs')

// console.log(process.argv)

// add command
yargs.command({
  command: 'add',
  describe: 'adding a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// remove command
yargs.command({
  command: 'remove',
  describe: 'Removing a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// list command
yargs.command({
  command: 'list',
  describe: 'Listing notes',
  handler() {
    notes.listNotes()
  }
})

// read command
yargs.command({
  command: 'read',
  describe: 'Reading notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})
yargs.parse()
// console.log(yargs.argv)