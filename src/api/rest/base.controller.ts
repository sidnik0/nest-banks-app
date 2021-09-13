import { Inject } from '@nestjs/common';
import { CommandExecutor } from '../command/command-executor';
import { TypedCommandDescriptor } from '../command/values-object/typed-command-descriptor';

export abstract class BaseController {
  @Inject(CommandExecutor)
  protected readonly commandExecutor: CommandExecutor;

  protected async executeCommand(typedCommandDescriptor: TypedCommandDescriptor): Promise<any> {
    const commandResult = await this.commandExecutor.executeCommand(typedCommandDescriptor);

    return commandResult.result;
  }
}
