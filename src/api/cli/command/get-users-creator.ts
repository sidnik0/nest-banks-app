import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetUsersCommand } from './get-users-command';

export class GetUsersCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetUsersCommand();
  }
}
