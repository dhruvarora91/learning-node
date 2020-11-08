const fs = require('fs')
const chalk = require('chalk')

// ADD NOTE
function addNote(title, body) {
  const notes = loadNotes()
  // const duplicateNotes = notes.filter(function(note) {
  //   return note.title == title
  // })
  // filter method goes through all elements even if we find the duplicate note
  // const duplicateNotes = notes.filter((note) => note.title == title)

  // find method stops searching if a duplicate note is found
  const duplicateNote = notes.find((note) => note.title == title)

  // if (duplicateNotes.length == 0) {
  // if (duplicateNote == undefined) {
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  }
  else {
    console.log(chalk.red.inverse('Note title taken!'))
  }

}

// REMOVE NOTE
function removeNote(title) {
  const notes = loadNotes()
  // const notesToKeep = notes.filter(function(note) {
  //   if (note.title !== title) {
  //     return true
  //   }
  // })
  const notesToKeep = notes.filter((note) => {
    if (note.title !== title) {
      return true
    }
  })

  if (notes.length == notesToKeep.length) {
    console.log(chalk.red.inverse('No note found'))
    
  }
  else {
    console.log(chalk.green.inverse('Note removed'))
    saveNotes(notesToKeep)
  }
}

// List all notes
function listNotes() {
  console.log(chalk.bold.blue.inverse('Your Notes'))
  const notes = loadNotes()
  notes.forEach(function(note) {
    console.log(note.title)
  })
}

function readNote(title) {
  notes = loadNotes()
  const noteToRead = notes.find((note) => note.title == title)
  if(noteToRead) {
    console.log(chalk.blue.inverse(noteToRead.title))
    console.log(noteToRead.body)
  }
  else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

// LOAD NOTE
function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const JSONData = dataBuffer.toString()
    const data = JSON.parse(JSONData)
    return data
  }
  // if the file doesn't exist
  catch(e) {
    return []
  }
}

// SAVE NOTE
function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}