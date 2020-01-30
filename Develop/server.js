const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

const notes = require("../Develop/db/db.json")

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(notes);
});

let noteID = 0;

app.post("/api/notes", function(req, res) {
    const newNote = req.body;

    noteID++;
    newNote.id = noteID;

    notes.push(newNote);
    res.json(newNote);
})

app.delete("/api/notes/:id", function(req, res) {
    res.send(req.body);
})



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});