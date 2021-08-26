import { CreatorCommand } from '../interface/creator-command';
import { CommandInterface } from '../interface/command.interface';
import { GetBanksCommand } from './get-banks-command';

export class GetBanksCreator extends CreatorCommand {
  factoryMethod(): CommandInterface {
    return new GetBanksCommand();
  }
}
