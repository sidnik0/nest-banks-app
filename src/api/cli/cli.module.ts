import { Module } from '@nestjs/common';
import { ConsoleInterpreter } from './console-interpreter';
import { CommandExecutor } from './command-executor';
import { CommandLineParser } from './command-line-parser';
import { ServiceModule } from '../../service/service.module';
import { CreateUserCommand } from './commands/create-user-command';
import { CreateUserCreator } from './commands/create-user-creator';

@Module({
  imports: [ServiceModule],
  providers: [
    ConsoleInterpreter,
    CommandExecutor,
    CommandLineParser,
    CreateUserCommand,
    CreateUserCreator,
  ],
  exports: [ConsoleInterpreter],
})
export class CliModule {}
