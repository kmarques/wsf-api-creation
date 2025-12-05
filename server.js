const express = require("express");
const example = require("./middlewares/example");

const app = express();

app.use(express.json());
app.use(example);
app.use(require("./routes/tasks"));
app.use(require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
