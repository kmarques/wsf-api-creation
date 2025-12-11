const initTranslation = require("../lib/i18next.js");
const getAskedApiVersion = require("../lib/versioning.js");
const TaskModel = require("../models/task.js");
const Papa = require("papaparse");

module.exports = {
  cgetV1: async (req, res, next) => {
    const items = await TaskModel.findAll();
    res.render(items);
  },
  cgetV2: async (req, res, next) => {
    const trad = initTranslation(req);
    const items = await TaskModel.findAll();
    res.render(
      items.map((item) => {
        item.dataValues.completed_trad = trad(
          item.completed ? "completed" : "not-completed"
        );
        return item;
      })
    );
  },
  cget: async (req, res, next) => {
    const hateoas = {};
    const searchParams = req.query;
    let { itemsPerPage, page, ...filters } = searchParams;
    const pagination = {};
    if (itemsPerPage || page) {
      page = page ? parseInt(page, 10) : 1;
      itemsPerPage = itemsPerPage ? parseInt(itemsPerPage, 10) : 4;

      pagination.offset = (page - 1) * itemsPerPage; // page
      pagination.limit = itemsPerPage; // itemsPerPage
    }

    const trad = initTranslation(req);
    const { count, rows: items } = await TaskModel.findAndCountAll({
      where: filters,
      ...pagination,
    });
    // if (Object.keys(pagination).length > 0) {
    if (itemsPerPage || page) {
      const lastPage = Math.ceil(count / itemsPerPage);
      const hasNextPage = page < lastPage;
      const hasPrevPage = page > 1;

      const baseUrl =
        `${req.protocol}://${req.host}` + req.originalUrl.split("?")[0];
      const firstPageParams = new URLSearchParams({
        ...filters,
        page: 1,
        itemsPerPage: itemsPerPage,
      });
      const lastPageParams = new URLSearchParams({
        ...filters,
        page: lastPage,
        itemsPerPage: itemsPerPage,
      });

      hateoas.first = `${baseUrl}?${firstPageParams.toString()}`;
      hateoas.last = `${baseUrl}?${lastPageParams.toString()}`;

      if (hasPrevPage) {
        const prevPageParams = new URLSearchParams({
          ...filters,
          page: page - 1,
          itemsPerPage: itemsPerPage,
        });
        hateoas.prev = `${baseUrl}?${prevPageParams.toString()}`;
      }
      if (hasNextPage) {
        const nextPageParams = new URLSearchParams({
          ...filters,
          page: page + 1,
          itemsPerPage: itemsPerPage,
        });
        hateoas.next = `${baseUrl}?${nextPageParams.toString()}`;
      }
    }

    if (Object.keys(hateoas).length > 0) {
      const hateoasString = Object
        // hateoas = {prev: "...", next: "..."}
        .entries(hateoas)
        // hateoas = [ [prev, ...], [next, ...] ]
        .map((entry) => {
          // Transformation clé: prev => rel="prev"
          entry[0] = `rel="${entry[0]}"`;
          // Transformation value: https://api.example.com/issues?page=2 => <https://api.example.com/issues?page=2>
          entry[1] = `<${entry[1]}>`;
          // entry = [prev, https://api.example.com/issues?page=2] => [rel="prev", <https://api.example.com/issues?page=2>]
          return `${entry[1]}; ${entry[0]}`;
          // => return '<https://api.example.com/issues?page=2>; rel="prev"'
        })
        .join(", ");
      res.setHeader("Link", hateoasString);
    }

    res.setHateoas(hateoas);
    res.render(
      items.map((item) => {
        item.dataValues.completed = trad(
          item.completed ? "completed" : "not-completed"
        );
        return item;
      })
    );

    console.log(hateoas);
  },
  post: async (req, res, next) => {
    const newData = req.body;
    const newTask = await TaskModel.create(newData);
    res.status(201).render(newTask);
  },
  postV1: async (req, res, next) => {
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
