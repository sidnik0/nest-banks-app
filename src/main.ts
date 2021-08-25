import { NestFactory } from '@nestjs/core';
// import { RestModule } from './rest.module';
import { CliModule } from './api/cli/cli.module';
import { CliService } from './api/cli/cli.service';

async function bootstrap() {
  switch ('cli' as string) {
    case 'cli':
      const cli = await NestFactory.createApplicationContext(CliModule);
      const cliService = cli.get(CliService);
      await cliService.runApp();

      break;
    case 'rest':
    default:
      break;
  }
}

bootstrap();
