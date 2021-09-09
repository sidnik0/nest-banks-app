import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';

@Injectable()
export class GetBanksCommand extends Command {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async executeMainLogic(): Promise<BankModel[]> {
    return await this.bankService.getAll();
  }

  getCommandDescription(): string {
    return `Get all banks

    Options:
      help                              Display help for command
    `;
  }
}
