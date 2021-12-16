const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  
  res.send('Hello World');
})

app.listen(3737);

