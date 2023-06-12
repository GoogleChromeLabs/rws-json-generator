const path = require('path');
const express = require('express');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define the public directory
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
