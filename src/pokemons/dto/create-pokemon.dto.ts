import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePokemonDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly pokemon_id?: number;
  
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsOptional()
  @IsString()
  readonly image_url?: string;

  @IsOptional()
  @IsString()
  readonly shiny_url?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly generation!: number;
  
  @IsOptional()
  @IsString()
  readonly description?: string;
}