import { readFile, writeFile } from 'fs/promises';
import { CreateStudentDTO } from './dtos/create-student.dto';

export class StudentRepository {
  filePath = 'students.json';

  async readData() {
    try {
      const contents = await readFile(this.filePath, 'utf8');
      return JSON.parse(contents);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {}; // Якщо файл не знайдений, повертаємо порожній об'єкт
      }
      throw error;
    }
  }

  async writeData(data: any) {
    await writeFile(this.filePath, JSON.stringify(data, null, 2)); 
  }

  async findOne(id: string) {
    const students = await this.readData();
    return students[id] || null; 
  }

  async findAll() {
    const students = await this.readData();
    return students;
  }

  async create(content: CreateStudentDTO) {
    const students = await this.readData();

    const id = Math.floor(Math.random() * 999).toString(); 
    students[id] = { name: content.name, email: content.email };

    await this.writeData(students);
    return { id, ...students[id] }; 
  }

  async update(id: string, content: CreateStudentDTO) {
    const students = await this.readData();

    if (!students[id]) {
      throw new Error(`Student with ID ${id} not found`);
    }

    students[id] = { ...students[id], ...content }; 
    await this.writeData(students);

    return students[id];
  }

  async delete(id: string) {
    const students = await this.readData();

    if (!students[id]) {
      throw new Error(`Student with ID ${id} not found`);
    }

    delete students[id]; 
    await this.writeData(students);

    return { message: `Student with ID ${id} has been deleted` }; 
  }

  // Отримати випадкового студента
  async getRandomStudent() {
    const students = await this.readData();
    
    // Перевіряємо, чи є студенти
    const studentIds = Object.keys(students);
    if (studentIds.length === 0) {
      throw new Error('No students found');
    }
  
    // Випадковий індекс серед студентів
    const randomIndex = Math.floor(Math.random() * studentIds.length);
    const randomId = studentIds[randomIndex];
  
    return { id: randomId, ...students[randomId] }; // Повертаємо студента з випадковим ID
  }


  // Підрахунок кількості студентів
  async countStudents() {
    const students = await this.readData();
    return Object.keys(students).length; // Повертає кількість студентів
  }
}
