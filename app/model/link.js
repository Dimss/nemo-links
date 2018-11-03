var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    userId: {type: String, required: true},
    link: {type: String, required: true},
});

module.exports = mongoose.model('Link', LinkSchema);