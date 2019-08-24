var mongoose = require("mongoose");

// Reference to Schema constructor stored in a variable
var Schema = mongoose.Schema;

// Create new ArticleSchema object using Schema constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    image: {
        type: String,
    },
    saved: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;