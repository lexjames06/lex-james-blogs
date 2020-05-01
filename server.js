//REQUIREMENTS
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

//INITILIASE requirements
app.use(cors());
app.use(express.json());

//INITILIASE mongoose client to interact with mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

//REQUIRE mongoose schema
const blogRouter = require('./backend/routes/blogs');
const tagRouter = require('./backend/routes/tags');

//MIDDLEWARE for mongoose schema
app.use('/blogs', blogRouter);
app.use('/tags', tagRouter);

//Server connection to designated port
app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
});
