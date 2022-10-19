import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('image')
export class ImageProcessor {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.ping}.`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with data ${result}.`,
    );
  }

  @Process('optimize')
  async handleOptimization(job: Job) {
    const pong = job.data.ping + 1;

    console.log({ pong });

    return pong;
  }
}
