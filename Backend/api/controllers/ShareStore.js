const store = require("../schemas/shared_storage");

const showMembers = function(req,res,next){
    store.find({OwnerId:req.params.OwnerId}).then(docs=>{
        res.status(200);
        res.json(docs);
    },(err)=>{
        res.status(400);
        res.send("Storage hasn't loaded yet!")
    })
}

module.exports = {
    showMembers
}