import { Injectable } from '@nestjs/common';
import { ICommand } from './commands/command.interface';
import { CommandDescriptor } from './interface/command-descriptor';
import { ICommandExecutor } from './interface/command-executor';
import { CommandResult } from './interface/command-result';

@Injectable()
export class RestCommandExecutor extends ICommandExecutor {
  async factoryMethod(
    command: ICommand,
    { params }: CommandDescriptor,
  ): Promise<CommandResult> {
    const model = this.convertMapToObject(params);

    return await command.executeMainLogic(model);
  }

  private convertMapToObject(map: Map<string, any>): Record<string, any> {
    const obj: Record<string, any> = {};

    map.forEach((value, key) => (obj[key] = value));

    return obj;
  }
}
