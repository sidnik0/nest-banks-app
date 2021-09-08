import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { Command } from './command';
import { DeleteBankDto } from 'src/api/rest-dto/delete-bank.dto';

@Injectable()
export class DeleteBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: DeleteBankDto): Promise<string> {
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
