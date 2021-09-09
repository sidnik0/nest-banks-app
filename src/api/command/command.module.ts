import { Module } from '@nestjs/common';
import { ServiceModule } from '../../service/service.module';
import { HelperModule } from '../../common/helper/helper.module';
import { CliCommandExecutor } from './cli-command-executor';
import { ICommandExecutor } from './interface/command-executor';
import { CommandFactory } from './command-factory';
import { commands } from './commands';

@Module({
  imports: [ServiceModule, HelperModule],
  providers: [
    {
      provide: ICommandExecutor,
      useClass: CliCommandExecutor,
    }, 
    CommandFactory,
    ...commands
  ],
  exports: [ICommandExecutor],
})
export class CommandModule {}
