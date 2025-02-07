import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePokemonDto {

  @IsNumber()
  readonly pokemon_id: number;
  
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsString()
  readonly image_url!: string;

  @IsString()
  readonly shiny_url!: string;

  @IsNotEmpty()
  @IsString()
  readonly generation!: number;
  
  readonly description!: string;
}