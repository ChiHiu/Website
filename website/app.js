const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true in production
}));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log('Server running on port ${port}');
});