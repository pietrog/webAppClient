var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModuleSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    isActive: { type: Boolean, default: false}
});

module.exports = mongoose.model('Module', ModuleSchema);
