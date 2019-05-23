let mongoose = require('mongoose');

let leadSchema = mongoose.Schema({
  client:{
    type: String,
    required: false
  },
  business:{
    type: String,
    required: false
  },
  status:{
    type: String,
    required: false
  },
  phone:{
    type: Number,
    required: false
  },
  value:{
    type: Number,
    required: false
  },
});

let Lead = module.exports = mongoose.model('Lead', leadSchema);