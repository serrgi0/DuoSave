import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//clase que hereda las validaciones de CreateUserDto pero todas son opcionales
export class UpdateUserDto extends PartialType(CreateUserDto) {}
