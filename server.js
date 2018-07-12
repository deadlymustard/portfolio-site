//Install express server
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:4200',
    'http://localhost:8080',
    'https://localhost:4200',
    'https://localhost:8080'
  ]
};


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/regan-portfolio'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


app.get('/api/root-hint', (req, res) => {
  res.send({hint: new Buffer(process.env.ROOT_PASSWORD).toString('base64')});
});

app.get('/api/root-verify/:password', (req, res) => {
  if(process.env.ROOT_PASSWORD === req.params.password)
    res.send({valid: true});
  else
    res.send({valid: false});
});

app.get('/api/resume', (req, res) => {
  res.sendFile(path.join(__dirname + '/documents/resume.pdf'));
});
app.get('/api/design_doc', (req, res) => {
  res.send({link: process.env.DROPBOX_SHARED_LINK});
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/regan-portfolio/index.html'));
});




// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
