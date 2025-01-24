const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Генерація токенів
const generateAccessToken = (user) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "25m" });
    return { accessToken };
};

// Middleware для перевірки токену
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Беремо токен з заголовка

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.userId = decoded.id; // Зберігаємо decoded userId для подальших операцій
        next(); // Перехід до наступного middleware або маршруту
    });
};
// DELETE ACCOUNT by ID
router.delete("/deleteAccount/:id", verifyToken, async (req, res) => {
    try {
        // Перевірка, чи токен користувача відповідає тому, хто запитує видалення
        if (req.userId !== req.params.id) {
            return res.status(403).json({ message: "You are not authorized to delete this account" });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting account" });
    }
});
router.get('/usersAll', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});
// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });

        await user.save();
        
        // Генерація токену після реєстрації
        const { accessToken } = generateAccessToken(user);
        
        return res.status(200).json({ message: "Sign Up Successful", accessToken });
    } catch (error) {
        res.status(400).json({ message: "User Already Exists" });
    }
});

// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please Sign Up First" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is not correct" });
        }

        const { accessToken } = generateAccessToken(user);
        
        const { password: pwd, ...userWithoutPassword } = user._doc;
        res.status(200).json({ user: userWithoutPassword, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// REFRESH TOKEN
// Прибираємо refresh token. Більше не використовуємо його в API.

// GET ALL USERS
router.get("/users", verifyToken, async (req, res) => {
    try {
        // Перевірка, чи користувач є адміністратором, або має дозвіл на доступ
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// UPDATE PROFILE
router.put("/updateProfile", async (req, res) => {
  try {
      const { userId, email, username, password } = req.body;

      if (!userId) {
          return res.status(403).json({ message: "User ID is required" });
      }

      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Оновлення даних користувача
      if (email) user.email = email;
      if (username) user.username = username;
      if (password) {
          const hashpassword = bcrypt.hashSync(password);
          user.password = hashpassword;
      }

      await user.save();
      
      return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
