import { Injectable } from '@nestjs/common';
import { BankInterface } from './interfaces/bank.interface';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
  private banks: Map<string, BankInterface> = new Map();

  create(createBankDto: CreateBankDto): BankInterface {
    this.banks.set(createBankDto.id, createBankDto);

    return this.banks.get(createBankDto.id);
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
