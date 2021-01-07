const express = require("express");
const notes = require("../../db/db.json");
const uuid = require("uuid");
const fs = require("fs");
const router = express.Router();

// get all notes
router.get("/", (req, res) => res.json(notes));

// get a specific elem
router.get("/:id", (req, res) => {
  const found = notes.some((note) => note.id === req.params.id);
  if (found) {
    res.json(notes.filter((note) => note.id === req.params.id));
  }
  res.status(400).json({ msg: `no note with the id of ${req.params.id}` });
});

//create a note
router.post("/", (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };
  if (!newNote.title || !newNote.text) {
    return res.status(400).json({ msg: "Please include title or text" });
  }

  notes.push(newNote);

  let data = JSON.stringify(notes);
  fs.writeFile("db/db.json", data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});

//Delete note

router.delete("/:id", (req, res) => {
  const found = notes.some((note) => note.id === req.params.id);
  let remainedNotes;
  if (found) {
    remainedNotes = notes.filter((note) => note.id !== req.params.id);
    remainedNotes = JSON.stringify(remainedNotes);
    fs.writeFile("db/db.json", remainedNotes, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        msg: "Note deleted successfully",
        notes: notes.filter((note) => note.id !== req.params.id),
      });
    });
  } else {
    res.status(400).json({ msg: `no note with the id of ${req.params.id}` });
  }
});

module.exports = router;
