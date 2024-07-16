const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const getallUsers = require('./Controllers/userControllers');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', AuthRouter); // Mount authentication routes
app.use('/api/users', getallUsers); // Mount users route

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
