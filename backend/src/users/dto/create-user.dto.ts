import { IsEmail, IsString, MinLength } from 'class-validator';

//clase que define las validaciones para crear un usuario
export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

}
