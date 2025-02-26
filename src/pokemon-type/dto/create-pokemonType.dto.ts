import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePokemonTypeDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;
}