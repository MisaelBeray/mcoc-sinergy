import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Champion } from '../champions/entities/champion.entity';
import { SelectQueue } from '../utils/queues.enum'
import { SelectJobs } from '../utils/jobs.enum'

@Processor(SelectQueue.sendMailQueue)
class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process(SelectJobs.sendMailJob)
  async sendMailJOb(job: Job<Champion>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: String('misaelberay@gmail.com'),
      from: `Job Report!`,
      subject: `Champion Created: ${data?.name}`,
      text: `Name: ${data?.name} \n Class Power: ${data?.class_power} \n Profile: ${data?.profile}`,
    });
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`);
  }
}

export { SendMailConsumer };
