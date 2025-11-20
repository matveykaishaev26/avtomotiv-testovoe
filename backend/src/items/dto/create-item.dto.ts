import { IsString, Max, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Min(6)
  @Max(255)
  name: string;
}
