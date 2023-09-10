const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Storage = new Schema({
    OwnerId: {type: Schema.Types.ObjectId,ref: 'Owner'},
    Property_Name: {type: String, required: true},
    Address:{type:String, required:true},
    PricePerMonth: {type:Number, required:true},
    startTime :{type: Date, required: true},
    endTime: {type:Date, required:true},
    slots: {type:Number, required:true}
});

Storage.index({Address: 1}, {unique: true, sparse: true});

const Store = mongoose.model('Storage Space', Storage);

module.exports = Store;