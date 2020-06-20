// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var dataBase = require("./db/db.json")
var fs = require("fs");
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// =============================================================

// Displays all characters
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", 'utf8', function (err, data) {

        return res.json(JSON.parse(data));

    })

});

// =============================================================
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Displays a single character, or returns false
app.post("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", 'utf8', function (err, data) {
        var newData = JSON.parse(data)

        newData.push(req.body)
        console.log(req.body)
        return res.json(newData)

    })




});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
