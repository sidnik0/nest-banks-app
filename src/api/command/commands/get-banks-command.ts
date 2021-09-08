import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';

@Injectable()
export class GetBanksCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();
  }

  async performAdditionally(): Promise<BankModel[]> {
    return await this.bankService.getAll();
  }

  getCommandDescription(): string {
    return `Get all banks

    Options:
      help                              Display help for command
    `;
  }
}
