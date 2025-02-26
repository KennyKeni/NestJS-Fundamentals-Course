import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateEffectivenessAttackDto {
  // This is not needed because of @Param
  // @IsNotEmpty()
  // @IsNumber()
  // attacking_type!: number;

  @IsNotEmpty()
  @IsNumber()
  defending_type!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(4)
  multiplier!: number;
}