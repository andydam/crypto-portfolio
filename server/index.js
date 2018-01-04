const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.path}`);
  if (req.body) {
    console.log(`data: ${JSON.stringify(req.body, 2)}`);
  }
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.listen(process.env.PORT || 3000, console.log(`crypto-portfolio listening on port ${process.env.PORT || 3000}`));