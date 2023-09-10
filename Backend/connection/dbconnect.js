const mongoose = require('mongoose')
const dBConn = 'mongodb+srv://mridul:12345@cluster0.36cxzys.mongodb.net/';

const connectToMongoDb = async () => {
    await mongoose
        .connect(dBConn, {})
        .then(() => {
            console.log('DB connected with no problems')
        })
}

module.exports = connectToMongoDb;