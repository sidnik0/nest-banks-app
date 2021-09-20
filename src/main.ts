import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { CliModule } from './api/cli/cli.module';
import { RestModule } from './api/rest/rest.module';
import { ConsoleInterpreter } from './api/cli/console-interpreter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  switch (process.env.API as string) {
    case 'rest':
      const app = await NestFactory.create(RestModule);

      const config = new DocumentBuilder()
        .setTitle('Bank app')
        .setDescription('The bank app API description')
        .setVersion('0.0.1')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);

      await app.listen(3000);

      break;
    case 'cli':
    default:
      const cli = await NestFactory.createApplicationContext(CliModule);
      const consoleInterpreter = cli.get(ConsoleInterpreter);
      await consoleInterpreter.run();

      break;
  }
}

bootstrap();
