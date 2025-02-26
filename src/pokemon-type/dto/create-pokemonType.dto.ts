import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePokemonTypeDto {
  @IsOptional()
  @IsNumber()
  type_id?: number;

  @IsNotEmpty()
  @IsString()
  name!: string;
}