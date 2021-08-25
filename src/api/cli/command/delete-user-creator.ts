import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { DeleteUserCommand } from './delete-user-command';

export class DeleteUserCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new DeleteUserCommand();
  }
}
