const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes...";

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) =>
  fs.writeFileSync("notes.json", JSON.stringify(notes));

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  // debugger;
  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.bgGreen(`Note ${title} is added`));
  } else {
    console.log(chalk.bgRed("Note title taken"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // console.log(title);
  const notesToKeep = notes.filter((note) => note.title !== title);
  saveNotes(notesToKeep);
  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed("No note found!"));
  } else {
    console.log(chalk.bgGreen(`Note ${title} is removed`));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Notes List "));
  notes.forEach((note) => console.log(chalk.blue(note.title)));
};

const readNote = (title) => {
  const notes = loadNotes();
  // console.log("i am in read note");
  // console.log(title);
  const noteToRead = notes.find((note) => note.title === title);
  if (noteToRead) {
    console.log(chalk.blue.inverse(noteToRead.title));
    console.log(chalk.blue(noteToRead.body));
  } else {
    console.log(chalk.red.inverse("No such note can be found"));
  }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
