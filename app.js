const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      socket = require('socket.io')

let Companies = require('./db/Companies')

const app = express();
var port = process.env.PORT || 3000;
const server = app.listen( port,  ()=>{
    console.log('Listening on port ' + port);
});



const io = socket(server)
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());




app.get('/', (req,res) => {
    res.send('index')
})

app.get('/data',(req, res) => {
    mongoose.connect("mongodb://stock-market:stock351@ds119394.mlab.com:19394/stock-market").then(
          () => {
              mongoose.connect('open', () => {
                Companies.findById('5c73eb93fb6fc07201282cb3', (err, model) => {
                    res.send(model.companies)
                })
            })
            },
          err => { console.log('Error when connecting to the database'+ err)}
        );
})


io.on('connection', client => {
    client.on('companies', data => {
        mongoose.connect("mongodb://stock-market:stock351@ds119394.mlab.com:19394/stock-market").then(
          () => {
              mongoose.connect('open', () => {
                Companies.findById('5c73eb93fb6fc07201282cb3', (err, model) => {
                    model.companies = data
                    model.save()
                })
            })
            },
          err => { console.log('Error when connecting to the database'+ err)}
);
        io.sockets.emit('companies', data)
    })
  });

