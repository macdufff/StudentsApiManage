"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_student_dto_1 = require("./dtos/create-student.dto");
const student_service_1 = require("./student.service");
let StudentsController = class StudentsController {
    constructor() {
        this.studentService = new student_service_1.StudentService();
    }
    listStudents() {
        return this.studentService.findAll();
    }
    async getRandomStudent() {
        const student = await this.studentService.getRandom();
        if (!student) {
            throw new common_1.NotFoundException('No students found');
        }
        return student;
    }
    async countStudents() {
        const count = await this.studentService.countStudents();
        return { count };
    }
    addStudent(body) {
        return this.studentService.create(body);
    }
    async getStudent(id) {
        const student = await this.studentService.findOne(id);
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }
    updateStudent(id, body) {
        return this.studentService.update(id, body);
    }
    deleteStudent(id) {
        return this.studentService.remove(id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати всіх студентів' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список студентів отримано успішно' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "listStudents", null);
__decorate([
    (0, common_1.Get)('/random'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати випадкового студента' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Випадковий студент отримано успішно' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Студентів не знайдено' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getRandomStudent", null);
__decorate([
    (0, common_1.Get)('/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати кількість студентів' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Кількість студентів отримано успішно' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "countStudents", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Додати нового студента' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Студента додано успішно' }),
    (0, swagger_1.ApiBody)({
        description: 'Дані студента',
        type: create_student_dto_1.CreateStudentDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDTO]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати студента за ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID студента', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Студента знайдено' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Студента не знайдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudent", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Оновити інформацію про студента' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID студента', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Дані студента оновлено успішно' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Студента не знайдено' }),
    (0, swagger_1.ApiBody)({
        description: 'Дані для оновлення студента',
        type: create_student_dto_1.CreateStudentDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_student_dto_1.CreateStudentDTO]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Видалити студента за ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID студента', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Студента успішно видалено' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Студента не знайдено' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "deleteStudent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [])
], StudentsController);
//# sourceMappingURL=students.controller.js.map