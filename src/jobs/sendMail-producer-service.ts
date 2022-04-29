import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Champion } from 'src/champions/entities/champion.entity';
import { Queue } from 'bull';
import { SelectQueue } from 'src/utils/queues.enum'
import { SelectJobs } from 'src/utils/jobs.enum'
@Injectable()
class SendMailProducesService {
  constructor(@InjectQueue(SelectQueue.sendMailQueue) private queue: Queue) {}
  async sendMail(champion: Champion) {
    await this.queue.add(SelectJobs.sendMailJob, champion, {
      delay: 3000,
    });
  }
}

export { SendMailProducesService };
