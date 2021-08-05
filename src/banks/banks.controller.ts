import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BanksService } from './banks.service';
import { BankInterface } from './interfaces/bank.interface';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  async create(@Body() createBankDto: CreateBankDto): Promise<BankInterface> {
    console.log(`Create bank`);

    return this.banksService.create(createBankDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BankInterface> {
    console.log(`Get bank by id: ${id}`);

    const bank = this.banksService.getById(id);

    return bank || null;
  }

  @Get()
  async get(): Promise<Map<string, BankInterface>> {
    console.log(`Get all banks`);

    const banks = this.banksService.get();

    return banks.size ? banks : null;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<BankInterface> {
    console.log(`Update bank by id: ${id}`);

    return this.banksService.updateById(id, updateBankDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    console.log(`Delete bank by id: ${id}`);

    return this.banksService.deleteById(id);
  }
}
