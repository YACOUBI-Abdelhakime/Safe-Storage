import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { FileManagerDto } from './dtos/file-manager.dto';
import { FileManagerService } from './file-manager.service';
import { FileManager } from './schemas/file-manager.schema';

@Controller('file-manager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      // 3MB limit
      limits: { fileSize: 1024 * 1024 * 3 },
      // Accept only JPG, JPEG, PNG and PDF files
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Only JPG, JPEG, PNG and PDF files are allowed!',
            ),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: './uploadedFiles',
        filename: async (req, file, callback) => {
          const userId = (req as any).user.user._id;
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e6);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<FileManager> {
    let userId: string;
    try {
      userId = (req as any).user.user._id;
    } catch (e) {
      throw new UnauthorizedException('User id not found from request');
    }
    const fileExtension = extname(file.originalname);
    const fileData: FileManagerDto = {
      userId: userId,
      fileName: file.originalname,
      fileTempName: file.filename,
      size: file.size,
      type: fileExtension,
    };
    return await this.fileManagerService.uploadFile(fileData);
  }
}
