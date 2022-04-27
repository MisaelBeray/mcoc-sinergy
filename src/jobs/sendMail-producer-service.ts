import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Champion } from 'src/champions/entities/champion.entity';
import { Queue } from 'bull';

@Injectable()
class SendMailProducesService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}
  async sendMail(champion: Champion) {
    await this.queue.add('sendMail-job', champion, {
      delay: 3000,
    });
  }
}

export { SendMailProducesService };
