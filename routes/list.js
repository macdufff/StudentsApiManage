const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


//create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//getTska
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/allLists", async (req, res) => {
  // Перевіряємо чи є в req.user об'єкт
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  const { role } = req.user; // Отримуємо роль поточного користувача

  try {
    // Перевірка, чи користувач має роль "адмін" або "ментор"
    if (role !== "admin" && role !== "mentor") {
      return res.status(403).json({ message: "Access denied. Only admins or mentors can view this data." });
    }

    // Отримуємо всі списки з бази даних
    const lists = await List.find().populate("user", "username email role");

    return res.status(200).json({ lists });
  } catch (error) {
    console.error("Error fetching lists:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
