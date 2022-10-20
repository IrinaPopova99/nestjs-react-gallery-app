import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Queue } from 'bull';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // @InjectQueue('image') private readonly testQueue: Queue,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/queue')
  // async getQueue() {
  //   console.log('test queue');

  //   const job = await this.testQueue.add('optimize', {
  //     ping: 3,
  //   });

  //   console.log('job added');

  //   const result = job.finished();

  //   const data = await result;

  //   console.log({ data });

  //   return {
  //     res: data,
  //   };
  // }
}
