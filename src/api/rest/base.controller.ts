import { Inject, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../common/filter/all-exception.filter';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { CommandExecutor } from '../command/command-executor';
import { TypedCommandDescriptor } from '../command/values-object/typed-command-descriptor';

@ApiTags('bank-app')
@UseFilters(HttpExceptionFilter)
@UseFilters(AllExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export abstract class BaseController {
  @Inject(CommandExecutor)
  protected readonly commandExecutor: CommandExecutor;

  protected async executeCommand(typedCommandDescriptor: TypedCommandDescriptor): Promise<any> {
    const commandResult = await this.commandExecutor.executeCommand(typedCommandDescriptor);

    return commandResult.result;
  }
}
