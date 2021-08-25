import { CommandInterface } from '../interface/command.interface';

export class HelpCommand implements CommandInterface {
  async execute(): Promise<string> {
    return 'help';
  }
}
