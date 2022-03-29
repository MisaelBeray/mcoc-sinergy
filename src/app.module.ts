import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionsModule } from './champions/champions.module';
import { DatabaseModule } from './database/database.module';
import { ChampionsService } from './champions/champions.service';
import { ChampionsResolver } from './champions/champions.resolver';
import { databaseProviders } from './database/database.providers';
import { championsProviders } from './champions/champions.providers';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ChampionsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChampionsService,
    ChampionsResolver,
    ...databaseProviders,
    ...championsProviders,
  ],
})
export class AppModule {}
