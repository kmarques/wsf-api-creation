module.exports = function exampleWithOptions(options) {
  return function (req, res, next) {
    console.log("Example middleware");
    res.render = function (data) {
      res.json(data);
    };
    next();
  };
};
