const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://claricebascou:pfBcCBX97xMjyuC9@cluster0.qwdlxgw.mongodb.net/weather';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
