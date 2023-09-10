const User = require('../schemas/User')
const Owner = require('../schemas/owner')
const jwt = require('jsonwebtoken')
const { jsonwebtoken } = require('../../constants/constants');

const login = function (req, res) {
    const name = req.body.name;
    const password = req.body.password;

    User
        .findOne({ name:name, isActive: true })
        .then((user) => {
            if (user == null) {
                Owner.
                      findOne({name:name, isActive: true}).then((owner)=>{
                        if (owner == null) {      
                            res.status(400).send("Account not registered")
                        } else {
                            var foundOwner = new Owner(owner);
                            var passwordMatched = foundOwner.comparePassword(password);
                            if (!passwordMatched) {
                                res.status(400).send("Wrong password !")
                            } else {
                                let payload = {};
                                payload['id'] = foundOwner._id;
                                payload['role'] = 'Property Owner';
                                const token = jwt.sign(payload, jsonwebtoken.key, {
                                    expiresIn: 86400
                                })
                                res.status(200).json(payload)
                            }
                        }
                      })
            } else {
                var foundUser = new User(user);
                var passwordMatched = foundUser.comparePassword(password);
                if (!passwordMatched) {
                    res.status(400).send("Wrong password !")
                } else {
                    let payload = {};
                    payload['id'] = foundUser._id;
                    payload['role'] = 'Student';
                    const token = jwt.sign(payload, jsonwebtoken.key, {
                        expiresIn: 86400
                    })
                    res.status(200).json(payload)
                }
            }
        });
}

module.exports = {
    login
}