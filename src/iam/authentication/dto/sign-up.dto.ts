import { IsEmail, IsString, isString, MinLength } from "class-validator";

export class SignUpDto {

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(10)
  password!: string;
}
