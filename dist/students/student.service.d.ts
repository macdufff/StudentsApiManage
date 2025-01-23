import { CreateStudentDTO } from "./dtos/create-student.dto";
import { StudentRepository } from "./students.repository";
export declare class StudentService {
    studentRepo: StudentRepository;
    constructor();
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(content: CreateStudentDTO): Promise<any>;
    update(id: string, content: CreateStudentDTO): Promise<any>;
    countStudents(): Promise<number>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getRandom(): Promise<any>;
}
