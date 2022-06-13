import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Champion, ChampionDocument } from '../champions/schemas/champions.schema';
import { Queue } from 'bull';
import { SelectQueue } from '../utils/queues.enum'
import { SelectJobs } from '../utils/jobs.enum'
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
