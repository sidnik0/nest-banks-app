import { CommandInterface } from '../interface/command.interface';

export class ExitCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'exit';
  }
}
