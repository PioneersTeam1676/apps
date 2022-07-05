import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from 'src/server/auth/auth.module';
import { UsersModule } from 'src/server/users/users.module';
import { PostsModule } from 'src/server/posts/posts.module';
import config from 'src/server/common/configs/config';
import { join } from 'path';
import { loggingMiddleware } from 'src/server/common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';

@Module({
  imports: [

    // Load & Parse .env
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    PostsModule,

    // Serves Svelte SPA & Static Image Files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
