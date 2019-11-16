var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    color1: {type: String, required: true},
    c1Description: {type: String, required: true},
    color2: {type: String, required: true},
    c2Description: {type: String, required: true}
});

module.exports = mongoose.model('Product', schema);