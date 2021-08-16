import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { CliModule } from './cli/cli.module';
import { CliService } from './cli/cli.service';

async function bootstrap() {
  switch ('cli' as string) {
    case 'cli':
      const cli = await NestFactory.createApplicationContext(CliModule);
      const cliService = cli.get(CliService);
      await cliService.run(process.argv);

      break;
    case 'rest':
    default:
      const app = await NestFactory.create(RestModule);
      await app.listen(3000);

      break;
  }
}

bootstrap();
