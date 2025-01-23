"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const promises_1 = require("fs/promises");
class StudentRepository {
    constructor() {
        this.filePath = 'students.json';
    }
    async readData() {
        try {
            const contents = await (0, promises_1.readFile)(this.filePath, 'utf8');
            return JSON.parse(contents);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return {};
            }
            throw error;
        }
    }
    async writeData(data) {
        await (0, promises_1.writeFile)(this.filePath, JSON.stringify(data, null, 2));
    }
    async findOne(id) {
        const students = await this.readData();
        return students[id] || null;
    }
    async findAll() {
        const students = await this.readData();
        return students;
    }
    async create(content) {
        const students = await this.readData();
        const id = Math.floor(Math.random() * 999).toString();
        students[id] = { name: content.name, email: content.email };
        await this.writeData(students);
        return { id, ...students[id] };
    }
    async update(id, content) {
        const students = await this.readData();
        if (!students[id]) {
            throw new Error(`Student with ID ${id} not found`);
        }
        students[id] = { ...students[id], ...content };
        await this.writeData(students);
        return students[id];
    }
    async delete(id) {
        const students = await this.readData();
        if (!students[id]) {
            throw new Error(`Student with ID ${id} not found`);
        }
        delete students[id];
        await this.writeData(students);
        return { message: `Student with ID ${id} has been deleted` };
    }
    async getRandomStudent() {
        const students = await this.readData();
        const studentIds = Object.keys(students);
        if (studentIds.length === 0) {
            throw new Error('No students found');
        }
        const randomIndex = Math.floor(Math.random() * studentIds.length);
        const randomId = studentIds[randomIndex];
        return { id: randomId, ...students[randomId] };
    }
    async countStudents() {
        const students = await this.readData();
        return Object.keys(students).length;
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=students.repository.js.map