import { CreateStudentDTO } from './dtos/create-student.dto';
export declare class StudentRepository {
    filePath: string;
    readData(): Promise<any>;
    writeData(data: any): Promise<void>;
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(content: CreateStudentDTO): Promise<any>;
    update(id: string, content: CreateStudentDTO): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getRandomStudent(): Promise<any>;
    countStudents(): Promise<number>;
}
