var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    paymentId: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);






































//This is an e-commerce website created by Romanus Njogu Borges --- @romeyborges. 