import { Body, Controller, Get, NotFoundException, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentsController {
  studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  @Get()
  @ApiOperation({ summary: 'Отримати всіх студентів' })
  @ApiResponse({ status: 200, description: 'Список студентів отримано успішно' })
  listStudents() {
    return this.studentService.findAll();
  }
  @Get('/random')
  @ApiOperation({ summary: 'Отримати випадкового студента' })
  @ApiResponse({ status: 200, description: 'Випадковий студент отримано успішно' })
  @ApiResponse({ status: 404, description: 'Студентів не знайдено' })
  async getRandomStudent() {
    const student = await this.studentService.getRandom();
    
    if (!student) {
      throw new NotFoundException('No students found');
    }
    return student;
  }
  @Get('/count')
  @ApiOperation({ summary: 'Отримати кількість студентів' })
  @ApiResponse({ status: 200, description: 'Кількість студентів отримано успішно' })
  async countStudents() {
    const count = await this.studentService.countStudents();
    return { count };
  }
  @Post()
  @ApiOperation({ summary: 'Додати нового студента' })
  @ApiResponse({ status: 201, description: 'Студента додано успішно' })
  @ApiBody({
    description: 'Дані студента',
    type: CreateStudentDTO,
  })
  addStudent(@Body() body: CreateStudentDTO) {
    return this.studentService.create(body);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Отримати студента за ID' })
  @ApiParam({ name: 'id', description: 'ID студента', type: String })
  @ApiResponse({ status: 200, description: 'Студента знайдено' })
  @ApiResponse({ status: 404, description: 'Студента не знайдено' })
  async getStudent(@Param('id') id: string) {
    const student = await this.studentService.findOne(id);

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Оновити інформацію про студента' })
  @ApiParam({ name: 'id', description: 'ID студента', type: String })
  @ApiResponse({ status: 200, description: 'Дані студента оновлено успішно' })
  @ApiResponse({ status: 404, description: 'Студента не знайдено' })
  @ApiBody({
    description: 'Дані для оновлення студента',
    type: CreateStudentDTO,
  })
  updateStudent(@Param('id') id: string, @Body() body: CreateStudentDTO) {
    return this.studentService.update(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Видалити студента за ID' })
  @ApiParam({ name: 'id', description: 'ID студента', type: String })
  @ApiResponse({ status: 200, description: 'Студента успішно видалено' })
  @ApiResponse({ status: 404, description: 'Студента не знайдено' })
  deleteStudent(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

}
