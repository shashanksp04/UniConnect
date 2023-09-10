const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const bcryptjs = require('bcryptjs');

const OwnerSchema = new Schema({
    name: {type: String, required: true},
    contact: {type: Number, required:true },
    password: {type: String, required: true}
})

OwnerSchema.index({contact: 1}, {unique: true, sparse: true});

OwnerSchema.pre('save', function save(next) {
    const Owner = this;

    if(!Owner.isModified('password')) {
        return next();
    }

    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(Owner.password, salt, (err, hash) => {
            Owner.password = hash;
            next();
        })
    });
})

OwnerSchema.methods.comparePassword = function(password) {
    var owner = this;
    return bcryptjs.compareSync(password, owner.password);
}


const Owner = mongoose.model('Property Owners', OwnerSchema);

module.exports = Owner;