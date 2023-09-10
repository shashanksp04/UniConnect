const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
    name: {type: String, required: true},
    contact: {type: Number, required:true},
    password: {type: String, required: true}
})

userSchema.index({contact: 1}, {unique: true, sparse: true});

userSchema.pre('save', function save(next) {
    const User = this;

    if(!User.isModified('password')) {
        return next();
    }

    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(User.password, salt, (err, hash) => {
            User.password = hash;
            next();
        })
    });
})

userSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcryptjs.compareSync(password, user.password);
}


const User = mongoose.model('User', userSchema);

module.exports = User;