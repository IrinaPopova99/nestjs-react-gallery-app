import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('image')
export class ImageProcessor {
    @Process('optimize')
    async handleOptimization(job: Job) {
        const pong = job.data.ping + 1;

        return {
            pong
        };
    }
}