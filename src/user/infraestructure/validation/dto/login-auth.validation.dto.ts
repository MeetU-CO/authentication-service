import { IsEmail, IsNotEmpty } from 'class-validator';
import { LoginAuthDTO } from 'src/user/domain/dto/login-auth.dto';

export class LoginAuthDTOValidation implements LoginAuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
