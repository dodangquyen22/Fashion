const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;