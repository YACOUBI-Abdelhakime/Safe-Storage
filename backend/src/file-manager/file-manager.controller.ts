import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { FileManagerDto } from './dtos/file-manager.dto';
import { FileManagerService } from './file-manager.service';
import { FileManager } from './schemas/file-manager.schema';
import { RenameFileDto } from './dtos/rename.file.dto';

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
              'Only JPG, JPEG, PNG and PDF files are allowed',
            ),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          // Extract userId from JWT
          const userId = (req as any).user.user._id;
          const uploadPath = `./uploadedFiles/${userId}`;

          // Check if the directory exists, if not, create it
          if (!existsSync(uploadPath)) {
            // Create directory recursively
            mkdirSync(uploadPath, { recursive: true });
          }

          callback(null, uploadPath); // Save the file in the user-specific folder
        },
        filename: async (req, file, callback) => {
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
    const userId = (req as any).user.user._id;

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

  @Get('download/:fileId')
  @UseGuards(JwtAuthGuard)
  async downloadFile(
    @Req() req: Request,
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ): Promise<void> {
    const filePath: string = await this.fileManagerService.getFilePath(
      (req as any).user,
      fileId,
    );
    if (existsSync(filePath)) {
      res.download(filePath);
    } else {
      throw new BadRequestException('File not found');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFiles(@Req() req: Request): Promise<FileManager[]> {
    return await this.fileManagerService.getFiles((req as any).user);
  }

  @Patch('/:fileId')
  @UseGuards(JwtAuthGuard)
  async renameFile(
    @Param('fileId') fileId: string,
    @Body() renameFileDto: RenameFileDto,
    @Req() req: Request,
  ): Promise<FileManager> {
    return await this.fileManagerService.renameFile(
      (req as any).user,
      fileId,
      renameFileDto,
    );
  }

  @Delete('/:fileId')
  @UseGuards(JwtAuthGuard)
  async deleteFile(
    @Param('fileId') fileId: string,
    @Req() req: Request,
  ): Promise<FileManager> {
    return await this.fileManagerService.deleteFile((req as any).user, fileId);
  }
}
