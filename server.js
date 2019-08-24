var express = require("express");
var logger = require("morgan")
var mongoose = require("mongoose");

// Will be used to scrape the web
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Create port for server
var PORT = 3000;

// Initialize express
var app = express();

// Middleware configuration

// Morgan logger logs rrquests made
app.use(logger("dev"));
// Parse through request.body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Declare public as a static folder
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost/", { useNewUrlParser: true })

// Route to get all articles from the database
app.get("/articles", function (req, res) {
    // Get all in the Articles collection
    db.Article.find({})
        .then(function (dbArtible) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route to get article by id and .populate with any associated notes
app.get("/article/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArtible) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route to save and update an articles note
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If note was created then find the article that matches the id in req.params.id and update the article to now be associated with that note
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});