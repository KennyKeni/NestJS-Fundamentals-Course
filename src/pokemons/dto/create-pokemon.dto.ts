import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreatePokemonStatDto } from "./create-pokemonStat.dto";

export class CreatePokemonDto {
  // @IsOptional()
  // @IsNumber()
  // @Type(() => Number)
  // readonly pokemon_uuid?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly national_dex!: number;
  
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

  @ValidateNested()
  @Type(() => CreatePokemonStatDto)
  readonly stats!: CreatePokemonStatDto;
}