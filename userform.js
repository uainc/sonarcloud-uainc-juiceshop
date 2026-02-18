const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to SQLite database (for demo purposes)
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, email TEXT)');
  db.run("INSERT INTO users (username, email) VALUES ('alice', 'alice@example.com')");
  db.run("INSERT INTO users (username, email) VALUES ('bob', 'bob@example.com')");
});

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/search">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <button type="submit">Search</button>
    </form>
  `);
});

app.post('/search', (req, res) => {
  const username = req.body.username;
  // Intentionally vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    if (rows.length === 0) {
      res.send('No user found.');
    } else {
      res.send(`User found: ${rows[0].username}, Email: ${rows[0].email}`);
    }
  });
});

// Intentionally missing error handler middleware

// Intentionally using deprecated API
app.listen(port, function() {
  console.log('Server running on port ' + port);
});
