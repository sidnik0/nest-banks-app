import { Injectable } from '@nestjs/common';
import { CommandResult } from './interface/command-result';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';
import { ConvertorException } from '../../common/exseption/convertor-exception';
import { ValidatorException } from '../../common/exseption/validator-exception';
import { CommandFactoryException } from '../../common/exseption/command-factory-exception';
import { TransactionCurrencyException } from '../../common/exseption/transaction-currency-exception';
import { TransactionBalanceException } from '../../common/exseption/transaction-balance-exception';
import { NotFountException } from 'src/common/exseption/not-fount-exception';
import { AccountCreatorException } from 'src/common/exseption/account-creator-exception';

@Injectable()
export class ConsoleCommandResultViewer {
  parseCommandResult({ result }: CommandResult): string {
    if (typeof result === 'string') {
      return result;
    } else if (Array.isArray(result)) {
      let string = '';

      for (const obj of result) {
        string += `${ConsoleCommandResultViewer.parseObjToString(obj)}\n`;
      }

      return string;
    } else {
      return ConsoleCommandResultViewer.parseObjToString(result);
    }
  }

  parseError(e: Error): string | Error {
    if (
      e instanceof CommandLineParserException ||
      e instanceof ConvertorException ||
      e instanceof ValidatorException ||
      e instanceof CommandFactoryException ||
      e instanceof TransactionCurrencyException ||
      e instanceof TransactionBalanceException ||
      e instanceof AccountCreatorException ||
      e instanceof NotFountException
    ) {
      return e.message;
    } else {
      return e;
    }
  }

  private static parseObjToString(obj: Record<string, any>): string {
    let string = '';

    for (const key of Object.keys(obj)) {
      string += `${key}: ${obj[key]} `;
    }

    return string;
  }
}
