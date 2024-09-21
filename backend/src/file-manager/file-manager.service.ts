import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileManager } from './schemas/file-manager.schema';
import { Model, Types } from 'mongoose';
import { rename } from 'fs';
import { join } from 'path';
import { FileManagerDto } from './dtos/file-manager.dto';
import { RenameFileDto } from './dtos/rename.file.dto';
import { unlink } from 'fs/promises';

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

    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      fileData.userId,
    );

    const createdFile = await this.fileManagerModel.create({
      userId: userIdAsObjectId,
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

  async getFileData(
    payload,
    fileId: string,
  ): Promise<{ filePath: string; fileName: string }> {
    const userId = payload.user._id;
    const file = await this.fileManagerModel.findById(fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    const filePath = `./uploadedFiles/${userId}/${fileId}${file.type}`;
    const fileName = file.fileName + file.type;
    return { filePath, fileName };
  }

  async getFiles(payload): Promise<FileManager[]> {
    // Get user id from jwt payload
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    return await this.fileManagerModel.find({ userId: userIdAsObjectId });
  }

  async renameFile(
    payload,
    fileId: string,
    renameFileDto: RenameFileDto,
  ): Promise<FileManager> {
    // Get user id from jwt payload
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const fileIdAsObjectId = Types.ObjectId.createFromHexString(fileId);
    await this.fileManagerModel.updateOne(
      { userId: userIdAsObjectId, _id: fileIdAsObjectId },
      { fileName: renameFileDto.fileName },
    );
    return await this.fileManagerModel.findById(fileIdAsObjectId);
  }

  async deleteFile(payload, fileId: string): Promise<FileManager> {
    // Get user id from jwt payload
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const fileIdAsObjectId = Types.ObjectId.createFromHexString(fileId);
    const file = await this.fileManagerModel.findOne({
      userId: userIdAsObjectId,
      _id: fileIdAsObjectId,
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    // Delete file from storage
    try {
      const filePath = `./uploadedFiles/${payload.user._id}/${fileId}${file.type}`;
      await unlink(filePath);
    } catch (err) {
      throw new InternalServerErrorException('File deletion failed');
    }
    // Delete file from database
    const deleteFile =
      await this.fileManagerModel.findByIdAndDelete(fileIdAsObjectId);

    return deleteFile;
  }
}
