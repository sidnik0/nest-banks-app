import { Injectable } from '@nestjs/common';
import { CommandResult } from '../command/interface/command-result';
import { CommandLineParserException } from '../../common/exseption/command-line-parser-exception';
import { ConvertorException } from '../../common/exseption/convertor-exception';
import { ValidatorException } from '../../common/exseption/validator-exception';
import { CommandFactoryException } from '../../common/exseption/command-factory-exception';
import { TransactionCurrencyException } from '../../common/exseption/transaction-currency-exception';
import { TransactionBalanceException } from '../../common/exseption/transaction-balance-exception';
import { NotFountException } from '../../common/exseption/not-fount-exception';
import { AccountCreatorException } from '../../common/exseption/account-creator-exception';

@Injectable()
export class ConsoleCommandResultViewer {
  parseCommandResult({ result }: CommandResult): string {
    if (typeof result === 'string') {
      return result;
    } else if (Array.isArray(result)) {
      return result.reduce((previous, current) => {
        if (!previous)
          return (
            previous + ConsoleCommandResultViewer.parseObjToString(current)
          );

        return (
          previous +
          `\n\n${ConsoleCommandResultViewer.parseObjToString(current)}`
        );
      }, '');
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

  private static parseObjToString(result: Record<string, any>): string {
    let string = '';

    return Object.keys(result).reduce((previous, current) => {
      if (!previous) return previous + `${current}: ${result[current]}`;

      return previous + `\n${current}: ${result[current]}`;
    }, '');
  }
}
