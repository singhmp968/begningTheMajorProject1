const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_dev');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Erroe connecting to mongod"));
db.once('open',function(){
    console.log('connected to DB')
});
module.exports = db;