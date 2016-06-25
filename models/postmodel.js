var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	author : {type: String, default : "Some fellow"},
	text : String,
	timestamp : {type:Date, default : Date.now() },
	category : String,
	branch : String,
	company: String,
	relatedto : String

});

mongoose.model('Post', postSchema);