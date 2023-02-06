const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});



/* format response en middleware */

app.get('/', function (req, res) {
  res.format({
    'text/plain': function () {
      res.send('hey');
    },
    'text/html' () {
      res.send('<p>hey</p>')
    },
  
    'application/json' () {
      res.send({ message: 'hey' })
    },
    
    default() {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable')
    } 
  })
});



