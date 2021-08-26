import { CommandInterface } from '../interface/command.interface';
import { CommandLineParserException } from '../../../common/exseption/command-line-parser-exception';

export class CreateUserCommand implements CommandInterface {
  async execute(params: string[]): Promise<string> {
    const processedArgs = this.parseParams(params);

    return 'create-user';
  }

  private parseParams(params: string[]): { [i: string]: string }[] | 'help' {
    if (params[0] === 'help' && params.length === 1) {
      return 'help';
    }

    const processedArgs: { [i: string]: string }[] = [];

    for (const param of params) {
      if (param.indexOf('=') === -1)
        throw new CommandLineParserException('invalid argument');

      const arrayStrings = param.split('=');

      processedArgs.push({
        [arrayStrings[0]]: arrayStrings[1],
      });
    }

    return processedArgs;
  }
}
