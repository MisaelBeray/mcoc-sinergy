import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Champion } from 'src/champions/entities/champion.entity';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process('sendMail-job')
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
