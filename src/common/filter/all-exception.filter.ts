import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AccountCreatorException } from '../exception/account-creator.exception';
import { CommandFactoryException } from '../exception/command-factory.exception';
import { ExistsException } from '../exception/exists.exception';
import { NotFountException } from '../exception/not-fount.exception';
import { TransactionBalanceException } from '../exception/transaction-balance.exception';
import { TransactionCurrencyException } from '../exception/transaction-currency.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: HttpStatus;
    let message: string;

    switch (exception.constructor) {
      case TransactionCurrencyException:
      case TransactionBalanceException:
      case AccountCreatorException:
      case ExistsException:
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        break;
      case NotFountException:
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        break;
      case CommandFactoryException:
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
