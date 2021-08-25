import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { CreateUserCommand } from './create-user-command';

export class CreateUserCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new CreateUserCommand();
  }
}
