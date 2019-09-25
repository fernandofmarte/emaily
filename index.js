const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.get('/yo', (req, res) => {
  res.send({ yo: 'bro' });
});

app.get('/dope', (req, res) => {
  res.send({ this: 'is dope' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
