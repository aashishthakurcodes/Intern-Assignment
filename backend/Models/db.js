const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.error('MongoDB Connection Error: ', err);
    });
