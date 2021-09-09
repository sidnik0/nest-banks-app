import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IBankService } from '../../../service/interface/bank.service';
import { DeleteBankDto } from '../../rest-dto/delete-bank.dto';

@Injectable()
export class DeleteBankCommand extends Command {
  constructor(private readonly bankService: IBankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: DeleteBankDto): Promise<string> {
    await this.bankService.delete(model.id);

    return `Bank with id=${model.id} deleted`;
  }

  getCommandDescription(): string {
    return `Delete bank by id

    Options:
      id=<bankId>                       Bank id
      
      help                              Display help for command
    `;
  }
}
