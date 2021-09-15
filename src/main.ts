import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { CliModule } from './api/cli/cli.module';
import { RestModule } from './api/rest/rest.module';
import { ConsoleInterpreter } from './api/cli/console-interpreter';

async function bootstrap() {
  switch (process.env.API as string) {
    case 'rest':
      const app = await NestFactory.create(RestModule);
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
