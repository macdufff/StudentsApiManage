"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const students_repository_1 = require("./students.repository");
class StudentService {
    constructor() {
        this.studentRepo = new students_repository_1.StudentRepository();
    }
    findAll() {
        return this.studentRepo.findAll();
    }
    findOne(id) {
        return this.studentRepo.findOne(id);
    }
    create(content) {
        return this.studentRepo.create(content);
    }
    async update(id, content) {
        const student = await this.studentRepo.findOne(id);
        if (!student) {
            throw new Error(`Student with ID ${id} not found`);
        }
        return this.studentRepo.update(id, content);
    }
    async countStudents() {
        const students = await this.studentRepo.findAll();
        return Object.keys(students).length;
    }
    async remove(id) {
        const student = await this.studentRepo.findOne(id);
        if (!student) {
            throw new Error(`Student with ID ${id} not found`);
        }
        return this.studentRepo.delete(id);
    }
    async getRandom() {
        const student = await this.studentRepo.getRandomStudent();
        if (!student) {
            throw new Error('No students found');
        }
        return student;
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map