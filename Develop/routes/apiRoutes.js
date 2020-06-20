const router = require("express").Router();
const store = require("../db/store");

router.get("/notes", (req, res) => {
    store.getNotes()
        .then((notes) => res.json(notes))
        .catch((error) => res.status(500).json(error))
})

router.post("/notes", (req, res) => {
    store.addNote(req.body)
        .then((note) => res.json(note))
        .catch((error) => res.status(500).json(error))
})


router.delete("/notes/:id", (req, res) => {
    store.removeNote(req.params.id)
        .then((note) => res.json(note))
        .catch((error) => res.status(500).json(error))
})


module.exports = router