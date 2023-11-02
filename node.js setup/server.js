var express = require('express');
var app = express();
const port = 4000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the producer page
app.get('/producer', (req, res) => {
  res.render('pages/producer');
});

// Define a post route for the producer2 page
app.post('/producer2', (req, res) => {
  res.render('pages/producer2');
});

// Define a post route for the producer page
app.post('/producer', (req, res) => {
  res.render('pages/producer');
});

app.get('/profileUS', (req, res) => {
  // Define the data you want to pass to the view
  const userData = {
    name: 'John Doe',
  };

  // Render the 'pages/profileUS' view and pass the data as an object
  res.render('pages/profileUS', { userData });
});

// Define a route for the DJ profile page
app.get('/profileDJ', (req, res) => {
  res.render('pages/profileDJ');
});



// Start the server
app.listen(4000);
console.log('Server is running on part 4000')