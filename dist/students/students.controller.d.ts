import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentService } from './student.service';
export declare class StudentsController {
    studentService: StudentService;
    constructor();
    listStudents(): Promise<any>;
    getRandomStudent(): Promise<any>;
    countStudents(): Promise<{
        count: number;
    }>;
    addStudent(body: CreateStudentDTO): Promise<any>;
    getStudent(id: string): Promise<any>;
    updateStudent(id: string, body: CreateStudentDTO): Promise<any>;
    deleteStudent(id: string): Promise<{
        message: string;
    }>;
}
