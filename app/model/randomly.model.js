const mongoose = require('mongoose')

const randomlySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  } , 
  purpose : {
    type: String,
    require: true
  } ,
  totalParticipants: {
    type: Number,
    require: true,
    default:2
  },
  options: [
   {
    name: {
        type: String,
        require: true
    }, 
    choice: {
        type: String,
        require: true
    }
   }
  ]
}, {
    timestamps: true
})

const Randomly = mongoose.model('Randomly', randomlySchema)

module.exports = Randomly