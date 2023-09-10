const User = require("../schemas/User");

const getUsers = function (req, res, next) {
    User.find().then((docs) => {
        res.status(200);
        res.json(docs);
    }, (err) => {
        console.log(err);
        res.status(400);
        res.send("Unable to fetch users");
    });
}


const getIdByUser = function (req, res, next) {
    User.find({name:req.params.name}).then((doc) => {
        //    User.find({_id: req.query.userId}).then((doc) => {
        res.status(200);
        res.json(doc);  
    }, (err) => {
        console.log(err),
        res.status(400);
        res.send("User does not exist !");
    });
}

const createUser = function (req, res, next) {
    var user = new User(req.body);
    user.save().then(() => {
        res.status(201);
        res.redirect("http://127.0.0.1:5500/SpaceSync/main.html");
        res.json({
            "message":"User created successfully",
            "id": user._id}
            );
    }, err => {
        if (err.code === 11000) {
            res.status(400);
            res.send("Phone Number has already registered! Login instead?");
        }else{
            console.log(err),
            res.status(400);
            res.send("Unable to create now");
        }
    })
}

module.exports = {
    getUsers, getIdByUser, createUser
}