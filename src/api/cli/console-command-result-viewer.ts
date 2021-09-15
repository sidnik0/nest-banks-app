import { Injectable } from '@nestjs/common';
import { CommandResult } from '../command/values-object/command-result';
import { CommandLineParserException } from '../../common/exception/command-line-parser.exception';
import { ConvertorException } from '../../common/exception/convertor.exception';
import { ValidatorException } from '../../common/exception/validator.exception';
import { CommandFactoryException } from '../../common/exception/command-factory.exception';
import { TransactionCurrencyException } from '../../common/exception/transaction-currency.exception';
import { TransactionBalanceException } from '../../common/exception/transaction-balance.exception';
import { NotFountException } from '../../common/exception/not-fount.exception';
import { AccountCreatorException } from '../../common/exception/account-creator.exception';

@Injectable()
export class ConsoleCommandResultViewer {
  parseCommandResult({ result }: CommandResult): string {
    if (typeof result === 'string') {
      return result;
    } else if (Array.isArray(result)) {
      return result.reduce((previous, current) => {
        if (!previous) {
          return previous + ConsoleCommandResultViewer.parseObjToString(current);
        }

        return previous + `\n\n${ConsoleCommandResultViewer.parseObjToString(current)}`;
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
    return Object.keys(result).reduce((previous, current) => {
      if (!previous) {
        return previous + `${current}: ${result[current]}`;
      }

      return previous + `\n${current}: ${result[current]}`;
    }, '');
  }
}
