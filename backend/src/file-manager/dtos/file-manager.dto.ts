import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FileManagerDto {
  @IsNotEmpty()
  @IsString()
  fileTempName: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;
}
