const { Router } = require("express");
const UserController = require("../controllers/user.js");

const router = new Router();

// Collection GET => list
// Http Code : 200
router.get("/users", UserController.cget);
// Collection POST => create
// Http Code : 201
router.post("/users", UserController.post);
// Item GET => read
// Http Code : 200, 404
router.get("/users/:id", UserController.get);
// Item PUT => replace => update or create
// Http Code : 200, 201
router.put("/users/:id", UserController.put);
// Item PATCH => update
// Http Code : 200, 404
router.patch("/users/:id", UserController.patch);
// Item DELETE => delete
// Http Code : 204, 404
router.delete("/users/:id", UserController.delete);

// Route actions ends with a verb
// Http Code: 200

// Collection action
// router.post(
//   "/users/notify-expired-account",
//   UserController.notifyExpiredAccount
// );

// Item action
router.post("/users/:id/activate", UserController.activate);

module.exports = router;
