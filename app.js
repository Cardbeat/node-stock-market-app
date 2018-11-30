const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      socket = require('socket.io');

const app = express();
var port = process.env.PORT || 3000;
const server = app.listen( port,  ()=>{
    console.log('Listening on port ' + port);
});



const io = socket(server)

mongoose.connect("mongodb://stock-market:stock351@ds119394.mlab.com:19394/stock-market").then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req,res) => {
    res.send('index')
})

io.on('connection', client => {
    console.log('websocket connected')
  });

  // need to get my input, store at mongoDB, get data from API and send back to client 

