module.exports = function example(req, res, next) {
  console.log("Example middleware");
  res.render = function (data) {
    res.json(data);
  };
  next();
};
