let express = require("express");
let app = express();

// middleware

app.get("/", (req, res) => {
    
});

app.listen(3000)


const formatChange = (req, res, next) => {
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
        });
}
