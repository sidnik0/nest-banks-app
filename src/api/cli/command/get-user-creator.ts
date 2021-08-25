import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetUserCommand } from './get-user-command';

export class GetUserCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetUserCommand();
  }
}
