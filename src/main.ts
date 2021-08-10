import { NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';
import { RestModule } from './rest.module';
import { CliModule } from './cli.module';

async function bootstrap() {
  console.log(0);
  console.log(process.argv);
  console.log(1);
  switch ('rest' as string) {
    case 'cli':
      await CommandFactory.run(CliModule, ['warn', 'error']);

      break;
    case 'rest':
    default:
      const app = await NestFactory.create(RestModule);
      await app.listen(3000);

      break;
  }
  // // const app = await NestFactory.create(RestModule);
  // // await app.listen(3000);
  // await CommandFactory.run(CliModule, ['warn', 'error']);
}
bootstrap();
