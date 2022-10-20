import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadedFile, UploadedFileSchema } from './schemas/file.schema';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { CloudService } from 'src/cloud/cloud.service';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './processors/image.processor';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService, CloudService, ImageProcessor],
  imports: [
    MongooseModule.forFeature([
      { name: UploadedFile.name, schema: UploadedFileSchema },
    ]),
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
})
export class UserModule {}
