const TaskModel = require("../models/task.js");
const Papa = require("papaparse");

module.exports = {
  cget: async (req, res, next) => {
    const items = await TaskModel.findAll();
    res.render(items);
    //res.format({
    //  "text/csv"() {
    //    const csv = Papa.unparse(items.map((itemOrm) => itemOrm.dataValues));
    //    res.setHeader("Content-Type", "text/csv");
    //    res.send(csv);
    //  },
    //  default() {
    //    res.json(items);
    //  },
    //});
  },
  post: async (req, res, next) => {
    const newData = req.body;
    const newTask = await TaskModel.create(newData);
    res.status(201).render(newTask);
  },
  get: async (req, res, next) => {
    const task = await TaskModel.findByPk(req.params.id);
    if (task) {
      res.render(task);
    } else {
      res.sendStatus(404);
    }
  },
  put: async (req, res, next) => {
    const nbDeleted = await TaskModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    const newData = req.body;
    const newTask = await TaskModel.create({ id: req.params.id, ...newData });
    res.status(nbDeleted === 1 ? 200 : 201).render(newTask);
  },
  patch: async (req, res, next) => {
    /**
     * const result =  await TaskModel.update(req.body, {
     * const nbUpdated = result[0];
     * const data = result[0];
     * const updatedTask = data[0];
     *
     * <=> destructuration
     *
     * const [nbUpdated, [updatedTask]] = await TaskModel.update(req.body, {
     */
    const [nbUpdated, [updatedTask]] = await TaskModel.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (nbUpdated === 0) {
      res.sendStatus(404);
    } else {
      res.render(updatedTask);
    }

    // MySQL
    //
    // if (result === 0) {
    //   res.sendStatus(404);
    // } else {
    //   const task = await TaskModel.findByPk(req.params.id);
    //   res.json(task);
    // }
  },
  delete: async (req, res, next) => {
    const nbDeleted = await TaskModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (nbDeleted === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  },
};
