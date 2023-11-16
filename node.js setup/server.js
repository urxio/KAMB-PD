var express = require('express');
var app = express();
const port = 4000;


const mongoose = require('mongoose');
const fs = require('fs');


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/producer', (req, res) => {
  res.render('pages/producer');
});

// Define a post route for the producer2 page
app.post('/producer2', (req, res) => {

  // Get the DJ name from the request body
  var djName = req.body.djName;

  // Find the DJ and update the start and end time of the first show record
  Show.findOneAndUpdate(
    { "DJ": djName },
    {
      "$set": {
        "Show.0.startTime": req.body.startTime,
        "Show.0.endTime": req.body.endTime
      }
    },
    { new: true } // This option returns the updated document
  )
    .then((updatedShow) => {
      console.log('Show record updated successfully!', updatedShow);
      console.log('Start Time:', req.body.startTime);
      console.log('End Time:', req.body.endTime);

      // Fetch all songs from the database
      Song.find({})
        .then((songs) => {
          // After updating the data, render the producer2 page with the songs data
          res.render('pages/producer2', { songs: songs });
        })
        .catch((err) => {
          console.error('Error fetching songs:', err);
          res.render('pages/producer2', { songs: [] });
        });
    })
    .catch((err) => {
      console.error(err);

      // If there's an error, render the producer2 page
      res.render('pages/producer2');
    });
});


// Define a post route for the producer2 page
app.get('/producer2', (req, res) => {

  // Get the DJ name from the request body
  var djName = req.body.djName;

  // Find the DJ and update the start and end time of the first show record
  Show.findOneAndUpdate(
    { "DJ": djName },
    {
      "$set": {
        "Show.0.startTime": req.body.startTime,
        "Show.0.endTime": req.body.endTime
      }
    },
    { new: true } // This option returns the updated document
  )
    .then((updatedShow) => {
      console.log('Show record updated successfully!', updatedShow);
      console.log('Start Time:', req.body.startTime);
      console.log('End Time:', req.body.endTime);

      // Fetch the first song from the database
      Song.findOne({})
        .then((song) => {
          // After updating the data, render the producer2 page with the song data
          res.render('pages/producer2', { song: song });
        })
        .catch((err) => {
          console.error('Error fetching song:', err);
          res.render('pages/producer2', { song: null });
        });
    })
    .catch((err) => {
      console.error(err);

      // If there's an error, render the producer2 page
      res.render('pages/producer2');
    });
});

// Define a route for the DJ profile page
app.get('/profileDJ', (req, res) => {
  res.render('pages/profileDJ');
});

// Define a route for the DJ profile page
app.get('/profileUS', (req, res) => {
  res.render('pages/profileUS');
});

// Define a schema for shows
const showSchema = new mongoose.Schema({
  DJ: String,
  Experience: String,
  Genres: String,
  Story: String,
  Show: [
    {
      name: String,
      startTime: String,
      endTime: String,
      genres: String,
      djImage: String,
    },
  ],
});


// Define a schema for songs
const songSchema = new mongoose.Schema({
  title: String,
  artist: String
});

// Create a model for songs
const Song = mongoose.model('Song', songSchema);


// Create a model for shows
const Show = mongoose.model('Show', showSchema);

// Define a schema for songs
const playlistSchema = new mongoose.Schema({
  title: String,
  artist: String
});

// Create a model for playlists
const Playlist = mongoose.model('Playlist', playlistSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(error);
  });


// Define a route to display the shows
app.get('/shows', (req, res) => {
  // Retrieve all shows from the MongoDB collection
  Show.find({})
    .then((shows) => {
      // Render the 'shows' view and pass the shows data
      res.render('pages/shows', { shows });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
app.listen(4000);
console.log('Server is running on port 4000');
