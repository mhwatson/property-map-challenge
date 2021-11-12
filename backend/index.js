const express = require('express');
const { getProperties } = require('./models/properties.model');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.get('/properties', (req, res) => {
  getProperties()
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});