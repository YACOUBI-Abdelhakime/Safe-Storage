import { Module } from '@nestjs/common';
import { FileManagerController } from './file-manager.controller';
import { FileManagerService } from './file-manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { fileManagerSchema } from './schemas/file-manager.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: fileManagerSchema }]),
    MulterModule.register({ dest: './uploadedFiles' }),
  ],
  controllers: [FileManagerController],
  providers: [FileManagerService],
})
export class FileManagerModule {}
