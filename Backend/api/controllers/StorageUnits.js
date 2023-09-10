const Storage = require("../schemas/StorageUnits");

const unlist = function(req,res,next){
    Storage.findOneAndDelete({Property_Name: req.body.name, Address: req.body.address}).then(docs=>{
            res.status(200);
            res.json(docs);
        },(err)=>{
            console.log(err);
            res.status(400);
            res.send("No Storage Space like that exists !")
        })
}

const allposts = function(req,res,next){
    Storage.find().then(docs=>{
        res.status(200);
        res.json(
            docs
            );
    },(err)=>{
        console.log(err);
        res.status(400);
        res.send("No storage spaces available");
    })
}

const postSorting = function(req, res, next){
    Storage.find({Property_Name: req.body.title}).then(doc=>{
        res.status(200);
        res.json(
            doc
        );
    },(err) => {
        console.log(err);
        res.status(400);
        res.send("No matching results found.");
    });
}

const priceSort = function(req, res, next){
    Storage.find().sort({PricePerMonth:1}).then(doc=>{
        res.status(200);
        res.json(doc);
    },(err)=>{
        console.log(err);
        res.status(400);
        res.send("No results to display.");

    });
}

const dateSort = function(req,res,next){
    Storage.find().sort({startTime:1}).then(doc=>{
        res.status(200);
        res.json(doc);
    },(err)=>{
        console.log(err);
        res.status(400);
        res.send("No results to display.");
    })
}

const createStorage = function (req, res, next) {
    var storage = new Storage(req.body);
    storage.save().then(() => {
        res.status(201);
        res.json({
            "message":"Storage facility registered succesfully",
            "id": storage._id}
            );
    }, err => {
        if (err.code === 11000) {
            res.status(400);
            res.send("Storage Space address already registered!");
        }else{
            console.log(err),
            res.status(400);
            res.send("Something went wrong");
        }
        
    })
}

module.exports = {
    postSorting, priceSort, dateSort, createStorage,allposts,unlist
}