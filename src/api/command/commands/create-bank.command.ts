import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { CreateBankDto } from '../../rest-dto/create-bank.dto';

@Injectable()
export class CreateBankCommand extends Command {
  constructor(private readonly bankService: IBankService) {
    super();

    this.paramsDefinition = {
      name: {
        type: 'string',
        required: true,
      },
      commissionForEntity: {
        type: 'number',
        required: true,
      },
      commissionForIndividual: {
        type: 'number',
        required: true,
      },
    };
  }

  async executeMainLogic(model: CreateBankDto): Promise<BankModel> {
    return await this.bankService.create(model);
  }

  getCommandDescription(): string {
    return `Create bank

    Options:
      name=<name>                       Bank name
      commissionForEntity=<comEnt>      Entity commission
      commissionForIndividual=<comInd>  Individuals commission
      
      help                              Display help for command
    `;
  }
}
