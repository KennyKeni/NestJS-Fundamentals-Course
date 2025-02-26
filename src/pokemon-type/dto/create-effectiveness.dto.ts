import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateEffectivenessDto {
  @IsNotEmpty()
  @IsNumber()
  attacking_type!: number;

  @IsNotEmpty()
  @IsNumber()
  defending_type!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(4)
  multiplier!: number;
}
export class CreateEffectivenessAttackDto {
  @IsNotEmpty()
  @IsNumber()
  defending_type!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(4)
  multiplier!: number;
}

export class CreateEffectivenessDefenseDto {
  @IsNotEmpty()
  @IsNumber()
  attacking_type!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(4)
  multiplier!: number;
}