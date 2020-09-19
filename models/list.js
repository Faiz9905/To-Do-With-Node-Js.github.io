const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    discription : {
        type: String,
        required: true
    },
    category: {
        type: String,
        required : true
    },
    duedate : {
        type : String,
        required : true
    },
    isDone :{
              type : Boolean,
              required : true
    }
});

const List = mongoose.model('list', listSchema);
module.exports = List;