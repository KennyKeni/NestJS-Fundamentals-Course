import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePokemonStatDto {

  @IsNotEmpty()
  @IsNumber()
  readonly hp!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly attack!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly defense!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly special_attack!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly special_defense!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly speed!: number;
}