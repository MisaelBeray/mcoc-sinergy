import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { ChampionsModule } from './champions/champions.module';
import { SpecialAttacksModule } from './special-attacks/special-attacks.module';
import { TagsModule } from './tags/tags.module';
import { SkillsModule } from './skills/skills.module';
import { SinergiesModule } from './sinergies/sinergies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core'
import { GqlJwtAuthGuard } from './common/guards/gql-jwt-auth.guard'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ChampionsModule,
    MongooseModule.forRoot(process.env.MONO_DB_CONNECTION_STRING),
    SpecialAttacksModule,
    TagsModule,
    SkillsModule,
    SinergiesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlJwtAuthGuard
    },
    AppService,
    ...databaseProviders,
  ],
})
export class AppModule {}
