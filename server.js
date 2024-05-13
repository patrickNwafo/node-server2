const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


let db = [
  { id: 1, title: "Why did the scarecrow win an award?", comedian: "Bob", year: 2023 },
  { id: 2, title: "What do you call a fish with no eyes?", comedian: "Alice", year: 2024 },
];


app.use(bodyParser.json());

// Routes

// GET /: Get all jokes
app.get('/', (req, res) => {
  res.json(db);
});

// POST /: Adding a new joke
app.post('/', (req, res) => {
  const newJoke = req.body;
  newJoke.id = Date.now(); // Generate unique ID
  db.push(newJoke);
  res.json(db);
});

// PATCH /joke/:id: Updating a joke
app.patch('/joke/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  const updatedJoke = req.body;

  const jokeIndex = db.findIndex(joke => joke.id === jokeId);
  if (jokeIndex !== -1) {
    db[jokeIndex] = { ...db[jokeIndex], ...updatedJoke }; // Update existing joke
    res.json(db[jokeIndex]);
  } else {
    res.status(404).send('Joke not found');
  }
});

// DELETE /joke/:id: Delete the joke
app.delete('/joke/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  const jokeIndex = db.findIndex(joke => joke.id === jokeId);

  if (jokeIndex !== -1) {
    const deletedJoke = db.splice(jokeIndex, 1)[0]; // Remove and return deleted joke
    res.json(deletedJoke);
  } else {
    res.status(404).send('Joke not found');
  }
});