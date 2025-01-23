import { IsInt, IsString } from 'class-validator';

export class CreateStudentDTO { 
  @IsString()
  name: string;

  @IsString()
  email: string;

}