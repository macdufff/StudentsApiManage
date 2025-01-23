import { CreateStudentDTO } from "./dtos/create-student.dto";
import { StudentRepository } from "./students.repository";
import { Injectable } from '@nestjs/common';
export class StudentService { 

  studentRepo: StudentRepository;

  constructor() { 
    this.studentRepo = new StudentRepository();
  }

  findAll() { 
    return this.studentRepo.findAll();
  }

  // Знайти студента за ID
  findOne(id: string) { 
    return this.studentRepo.findOne(id);
  }

  // Додати нового студента
  create(content: CreateStudentDTO) {
    return this.studentRepo.create(content);
  }

  // Оновити інформацію про студента
  async update(id: string, content: CreateStudentDTO) {
    const student = await this.studentRepo.findOne(id);

    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }

    return this.studentRepo.update(id, content);
  }
 

  // Підрахунок кількості студентів
  async countStudents() {
    const students = await this.studentRepo.findAll();
    return Object.keys(students).length;
  }
  // Видалити студента за ID
  async remove(id: string) {
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
