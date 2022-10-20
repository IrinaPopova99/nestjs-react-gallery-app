import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import sharp from 'sharp';

@Processor('image')
export class ImageProcessor {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}.`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with data ${result}.`,
    );
  }

  @Process('thumbnail')
  async handleThumbnail(job: Job) {
    const file = job.data;
    const fileBuffer = Buffer.from(file.buffer);
    let outputBuffer: Buffer;

    try {
      outputBuffer = await sharp(fileBuffer)
        .resize(200, 200)
        .sharpen()
        .webp({ quality: 80 })
        .toBuffer();
    } catch (err) {
      console.log('Thumbnail generation error: ', err);
    }

    return outputBuffer;
  }
}
