import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePokemonStatDto {

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly hp!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly attack!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly defense!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly special_attack!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly special_defense!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly speed!: number;
}