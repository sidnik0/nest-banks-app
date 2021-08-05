import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { BankInterface } from './interfaces/bank.interface';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
  private banks: Map<string, BankInterface> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  create(createBankDto: CreateBankDto): BankInterface {
    const id = this.helpersService.createId();

    this.banks.set(id, { ...createBankDto, id });

    return this.banks.get(id);
  }

  getById(id: string): BankInterface | undefined {
    return this.banks.get(id);
  }

  get(): Map<string, BankInterface> {
    return this.banks;
  }

  updateById(id: string, updateBankDto: UpdateBankDto): BankInterface {
    const oldValue = this.banks.get(id);

    this.banks.set(id, { ...oldValue, ...updateBankDto });

    return this.banks.get(id);
  }

  deleteById(id: string): boolean {
    return this.banks.delete(id);
  }
}
