import { IsLowercase, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AssignPokemonTypeDto {
  
  // @IsNotEmpty()
  // @IsString()
  // @IsLowercase()
  // readonly pokemon_name!: string;

  @IsNotEmpty()
  @IsNumber()
  readonly type_id!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly slot!: number;
}