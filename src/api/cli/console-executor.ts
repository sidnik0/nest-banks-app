import { CreatorCommand } from './interface/creator-command';

export class ConsoleExecutor {
  async executeCommand(
    creatorCommand: CreatorCommand,
    params: { [i: string]: string }[],
  ): Promise<string> {
    return await creatorCommand.create(params);
  }
}
