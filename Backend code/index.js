
const express = require('express')

const connectToMongoDb = require('./connection/dbconnect');
const { default: mongoose } = require('mongoose');

const PORT = 5000;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

connectToMongoDb();

const authRouter = require('./api/links/auth');
const userRouter = require('./api/links/user');
const ownerRouter = require('./api/links/owner');
const storeRouter = require('./api/links/storage');

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/owner', ownerRouter);
app.use('/storage',storeRouter);

app.get('/', (req, res) => {
    res.send('Server setup complete')
})

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server is running on the port 5000')
    });
})