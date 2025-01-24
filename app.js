const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn");
require("dotenv").config();
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); // Додайте файл swagger.json із вашою документацією
const students = require('./routes/students')
app.use(express.json());
app.use(cors());

// Додаємо Swagger UI для API-документування
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Підключаємо ваші маршрути
app.use("/api/", auth, list, students);

// Рендеринг фронтенду
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// Запускаємо сервер
app.listen(3000, "0.0.0.0", () => {
  console.log("Server Started");
});
