const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const entityRoute = require('./routes/entities.js');

const authRoute = require('./routes/auth.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

//database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB database connected');
  } catch (err) {
    console.log('MongoDB database connection failed');
  }
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use('/api/v1/auth', authRoute);
app.use(entityRoute);

app.listen(port, async () => {
  await connect();
  console.log('server listening on port', port);
});
