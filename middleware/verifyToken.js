const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Модель користувача для перевірки ролей

// Middleware для перевірки JWT токена
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];  // Передбачається, що токен передається в заголовку Authorization

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);  // Використовуємо секретний ключ з .env
        req.user = decoded;  // зберігаємо інформацію про користувача, яку отримуємо з токена
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
