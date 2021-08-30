import { Injectable } from '@nestjs/common';
import { CommandResult } from './interface/command-result';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';
import { ConvertorException } from '../../common/exseption/convertor-exception';
import { ValidatorException } from '../../common/exseption/validator-exception';
import { CommandFactoryException } from '../../common/exseption/command-factory-exception';

@Injectable()
export class ConsoleCommandResultViewer {
  parseCommandResult({ result }: CommandResult): string {
    if (typeof result === 'string') return result;

    let string = '';

    for (const key of Object.keys(result)) {
      string += `${key}: ${result[key]}\n`;
    }

    return string;
  }

  parseError(e: Error): string | Error {
    if (
      e instanceof CommandLineParserException ||
      e instanceof ConvertorException ||
      e instanceof ValidatorException ||
      e instanceof CommandFactoryException
    ) {
      return e.message;
    } else {
      return e;
    }
  }
}
