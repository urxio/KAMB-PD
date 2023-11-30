var express = require('express');
var app = express();
const port = 4000;

const mongoose = require('mongoose');
const fs = require('fs');

const session = require('express-session');

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if your website uses https
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');

//Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to render the main page
app.get('/mainpage', (req, res) => {
  res.render('pages/mainpage', { username: req.session.username });
});

// Route to render the login page
app.get('/login', (req, res) => {
  res.render('pages/login');
});

// Route to render the producer page
app.get('/producer', (req, res) => {
  res.render('pages/producer');
});

// Route to render the DJ page
app.get('/djpage', async (req, res) => {
  try {
    const timeslot1Songs = await Timeslot1.find();
    const timeslot2Songs = await Timeslot2.find();
    const allSongs = await Song.find(); // fetch all songs from the database
    res.render('pages/djpage', { timeslot1Songs, timeslot2Songs, allSongs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to handle login post request
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    req.session.username = username;
    // if authentication is successful, redirect to the main page
    res.redirect('/mainpage');
  } else {
    res.redirect('/login');
  }
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

//save playlist in DB
app.post('/api/playlists', async (req, res) => {
  console.log("Received request to create playlist:", req.body);

  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    console.log("Playlist saved successfully:", playlist);
    res.status(201).json(playlist);
  } catch (error) {
    console.error("Error saving playlist:", error);
    res.status(500).send(error);
  }
});

// Define a route for the DJ profile page
app.get('/profileDJ', (req, res) => {
  res.render('pages/profileDJ');
});

// Define a route for the DJ profile page
app.get('/profileUS', (req, res) => {
  res.render('pages/profileUS', { username: req.session.username });;
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


// Define a schema for available-songs
const songSchema = new mongoose.Schema({
  title: String,
  artist: String
});

// Define the Song schema for playlist Songs
const SongSchema = new mongoose.Schema({
  title: String,
  artist: String
});


// Define a schema for playlist
const PlaylistSchema = new mongoose.Schema({
  dj: String,
  timeslot: String,
  songs: [songSchema]
});

// Define the Timeslot schema
const timeslot1Schema = new mongoose.Schema({ title: String, artist: String });

// Define the Timeslot2 schema
const timeslot2Schema = new mongoose.Schema({ title: String, artist: String });


// Create a model for songs
const Song = mongoose.model('Song', songSchema);

// Create a model for shows
const Show = mongoose.model('Show', showSchema);


// Create a model for playlists
const Playlist = mongoose.model('Playlist', PlaylistSchema);

// Create a model for Timeslot
const Timeslot1 = mongoose.model('Timeslot1', timeslot1Schema);

// Create a model for Timeslot2
const Timeslot2 = mongoose.model('Timeslot2', timeslot1Schema);

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
