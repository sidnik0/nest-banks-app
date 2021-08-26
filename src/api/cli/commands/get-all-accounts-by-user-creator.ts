import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetAllAccountsByUserCommand } from './get-all-accounts-by-user-command';

export class GetAllAccountsByUserCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetAllAccountsByUserCommand();
  }
}
