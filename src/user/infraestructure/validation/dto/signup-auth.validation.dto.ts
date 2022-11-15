import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SignupAuthDTO } from '../../../domain/dto/signup-auth.dto';

export class SignupAuthDTOValidation implements SignupAuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  password?: string | undefined;

  @IsString()
  name: string;
}
