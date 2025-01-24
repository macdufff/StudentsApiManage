const express = require('express');
const router = express.Router();
const Student = require('../models/students');
const verifyToken = require('../middleware/verifyToken');  // Middleware для перевірки JWT токену
const jwt = require('jsonwebtoken');

// Створення нового студента
router.post('/students', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Перевірка, чи студент з таким email вже існує
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Student with this email already exists" });
        }

        const newStudent = new Student({
            name,
            email,
            age
        });

        await newStudent.save();
        res.status(201).json({ message: "Student created successfully", student: newStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating student" });
    }
});

// Отримання всіх студентів
router.get('/studentsAll', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching students" });
    }
});

// Отримання студента за ID
router.get('/studentsbyId/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching student" });
    }
});

// Оновлення студента
router.put('/students/:id', verifyToken, async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Перевірка, чи студент існує
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, age },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating student" });
    }
});

// Видалення студента
router.delete('/students/:id', verifyToken, async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findByIdAndDelete(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting student" });
    }
});




module.exports = router;
