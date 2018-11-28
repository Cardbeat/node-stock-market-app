const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

mongoose.connect("mongodb://stock-market:stock351@ds119394.mlab.com:19394/stock-market").then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);
const app = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;



app.get('/', (req,res) => {
    res.send('index')
})



app.listen( port,  ()=>{
        console.log('Listening on port ' + port);
});

