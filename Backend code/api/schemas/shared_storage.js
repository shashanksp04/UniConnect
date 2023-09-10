const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SplitStorage = new Schema({
    OwnerId: {type: Schema.Types.ObjectId,ref: 'Owner'},
    Users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    PricePerMonth: {type:Number, required:true},
    slots: {type:Number, required:true}
});

const SplitStore = mongoose.model('Storage Breakdown', SplitStorage);

module.exports = SplitStore;