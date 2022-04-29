import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsResolver } from './champions.resolver';
import { DatabaseModule } from '../database/database.module';
import { championsProviders } from './champions.providers';
import { SpecialAttacksModule } from 'src/special-attacks/special-attacks.module';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SendMailProducesService } from '../jobs/sendMail-producer-service';
import { SendMailConsumer } from '../jobs/sendMail-consumer';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { SelectQueue } from 'src/utils/queues.enum'
@Module({
  imports: [
    DatabaseModule,
    SpecialAttacksModule,
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    BullModule.registerQueue({
      name: SelectQueue.sendMailQueue,
    }),
  ],
  providers: [
    ChampionsResolver,
    ChampionsService,
    ...championsProviders,
    SendMailProducesService,
    SendMailConsumer,
  ],
})
export class ChampionsModule {
  constructor(@InjectQueue(SelectQueue.sendMailQueue) private sendMailQueue: Queue) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendMailQueue)]);
    consumer.apply(router).forRoutes('/admin/queues');
  }
}
