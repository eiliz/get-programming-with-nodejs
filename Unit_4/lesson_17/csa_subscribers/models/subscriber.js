const mongoose = require('mongoose');
const {Schema} = require('mongoose');

var subscriberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  zipCode:  {
    type: Number,
    min: [1000, 'Zip code too short'],
    max: 99999
  },
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
}

subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model('Subscriber').find({zipCode: this.zipCode}).exec();
}

module.exports = mongoose.model('Subscriber', subscriberSchema);