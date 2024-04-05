// Create web server
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing comments.json file
const fs = require('fs');
const comments = require('./comments.json');

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get a specific comment
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found');
  res.send(comment);
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    email: req.body.email,
    body: req.body.body,
  };
  comments.push(comment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) throw err;
    res.send(comment)