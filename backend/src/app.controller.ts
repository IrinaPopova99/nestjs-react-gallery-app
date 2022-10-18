import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Queue } from 'bull'
import { log } from 'console';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('image') private readonly testQueue: Queue
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/queue')
  async getQueue() {
    console.log('test queue');

    const job = await this.testQueue.add('optimize', {
      ping: 3
    });

    console.log('job added');

    // return {
    //   jobId: job.id
    // }

    // if (!job) {
    //   return response.sendStatus(404);
    // }
 
    const isCompleted = await job.isCompleted();
 
    // if (!isCompleted) {
    //   return response.sendStatus(202);
    // }

    const result = job.returnvalue;

    console.log({isCompleted, result});

    return {
      res: result
    };
  }
}
