import { Module } from '@nestjs/common';
import { ServiceModule } from '../../service/service.module';
import { HelperModule } from '../../common/helper/helper.module';
import { CliCommandExecutor } from './cli-command-executor';
import { RestCommandExecutor } from './rest-command-executor';
import { CommandExecutor } from './command-executor';
import { CommandFactory } from './command-factory';
import { commands } from './commands';
import { CommandName } from 'src/types/command-name.type';

@Module({
  imports: [ServiceModule, HelperModule],
  providers: [
    {
      provide: CommandExecutor,
      useClass: process.env.API === 'rest' ? RestCommandExecutor : CliCommandExecutor,
    },
    CommandFactory,
    ...commands,
  ],
  exports: [CommandExecutor],
})
export class CommandModule {}
