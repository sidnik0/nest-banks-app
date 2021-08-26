import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { UpdateUserCommand } from './update-user-command';

export class UpdateUserCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new UpdateUserCommand();
  }
}
