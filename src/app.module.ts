import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { ChampionsModule } from './champions/champions.module';
import { ChampionsService } from './champions/champions.service';
import { ChampionsResolver } from './champions/champions.resolver';
import { championsProviders } from './champions/champions.providers';
import { SpecialAttacksModule } from './special-attacks/special-attacks.module';
import { SpecialAttacksService } from './special-attacks/special-attacks.service';
import { SpecialAttacksResolver } from './special-attacks/special-attacks.resolver';
import { specialAttacksProviders } from './special-attacks/special-attacks.providers';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ChampionsModule,
    DatabaseModule,
    SpecialAttacksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChampionsService,
    ChampionsResolver,
    SpecialAttacksService,
    SpecialAttacksResolver,
    ...databaseProviders,
    ...championsProviders,
    ...specialAttacksProviders,
  ],
})
export class AppModule {}