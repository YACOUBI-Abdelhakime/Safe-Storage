import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileManager } from './schemas/file-manager.schema';
import { Model } from 'mongoose';
import { rename } from 'fs';
import { join } from 'path';
import { FileManagerDto } from './dtos/file-manager.dto';

@Injectable()
export class FileManagerService {
  constructor(
    @InjectModel('File')
    private fileManagerModel: Model<FileManager>,
  ) {}

  async uploadFile(fileData: FileManagerDto): Promise<FileManager> {
    const uploadedFilesFolderPath: string = `./uploadedFiles/${fileData.userId}`;

    // Extract all parts of the file name except the last one (which is the extension)
    let fileNameWithoutExtension = fileData.fileName
      .split('.')
      .slice(0, -1)
      .join('.');

    const createdFile = await this.fileManagerModel.create({
      userId: fileData.userId,
      type: fileData.type,
      fileName: fileNameWithoutExtension,
      size: fileData.size,
    });

    const oldPath = join(uploadedFilesFolderPath, fileData.fileTempName);
    const newPath = join(
      uploadedFilesFolderPath,
      createdFile._id + fileData.type,
    );

    rename(oldPath, newPath, (err) => {
      if (err) {
        throw new InternalServerErrorException('File renaming failed');
      }
    });
    return createdFile;
  }
}
