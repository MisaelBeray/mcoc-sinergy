import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsResolver } from './champions.resolver';
import { SpecialAttacksModule } from '../special-attacks/special-attacks.module';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SendMailProducesService } from '../jobs/sendMail-producer-service';
import { SendMailConsumer } from '../jobs/sendMail-consumer';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { SelectQueue } from '../utils/queues.enum'
import { MongooseModule } from '@nestjs/mongoose';
import { Champion, ChampionSchema } from './schemas/champions.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Champion.name, schema: ChampionSchema }
    ]),
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
