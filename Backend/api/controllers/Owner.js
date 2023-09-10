const Owner = require("../schemas/owner");

const getOwners = function (req, res, next) {
    Owner.find().then((docs) => {
        res.status(200);
        res.json(docs);
    }, (err) => {
        console.log(err);
        res.status(400);
        res.send("Unable to fetch Owners");
    });
}

const getOwnerByID = function(req,res,next){
    Owner.findById(req.params.id).then((doc)=>{
        res.status(200);
        res.json(docs);

    },(err)=>{
        console.log(err);
        res.status(400);
        res.send("No owner exists with given id");

    });
}

const getIdByOwner = function (req, res, next) {
    Owner.find({name:req.params.name}).then((doc) => {
        res.status(200);
        res.json(doc);  
    }, (err) => {
        console.log(err),
        res.status(400);
        res.send("Owner account does not exist !");
    });
}

const createOwner = function (req, res, next) {
    var owner = new Owner(req.body);
    owner.save().then(() => {
        res.status(201);
        res.redirect("http://127.0.0.1:5500/SpaceSync/main.html");
        res.json({
            "message":"Storage owner account created successfully",
            "id": owner._id}
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
    });
    
}

module.exports = {
    getOwners, getIdByOwner, createOwner, getOwnerByID
}