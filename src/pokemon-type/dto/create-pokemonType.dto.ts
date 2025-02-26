import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePokemonTypeDto {
  @IsNotEmpty()
  @IsNumber()
  type_id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;
}