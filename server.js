const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

const notes = require("../Develop/db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

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

console.log(notes);

app.post("/api/notes", function(req, res) {
    // Find a way to make the note ID save
    const newNote = req.body;
    let i = notes.length - 1;
    let noteID = notes[i].id + 1;

    newNote.id = noteID;

    notes.push(newNote);

    fs.writeFile("../Develop/db/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
        res.json(newNote);
    });
});

app.delete("/api/notes/:id", function(req, res) {
    const deleteID = parseInt(req.params.id);
    for (let i = 0; i < notes.length; i++) {
        if (deleteID === notes[i].id) {
            console.log("It matches!");
            notes.splice(i, 1);
        }
    }
    console.log(notes);
    fs.writeFile("../Develop/db/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
        res.json(notes);
    });
});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});