import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class TriggerPlcDto {
  @IsInt()
  @Min(0)
  @Max(7)
  coil_index: number;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(10000)
  pulse_duration_ms?: number;
}
