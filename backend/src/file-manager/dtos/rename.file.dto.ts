import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RenameFileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fileName: string;
}
