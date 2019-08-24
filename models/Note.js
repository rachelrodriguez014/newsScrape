var mongoose = require("mongoose");

// Reference to Schema constructor stored in a variable
var Schema = mongoose.Schema;

// Create new ArticleSchema object using Schema constructor
var NoteSchema = new Schema({
    title: String,
    body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note
