import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { DeleteAccountCommand } from './delete-account-command';

export class DeleteAccountCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new DeleteAccountCommand();
  }
}
