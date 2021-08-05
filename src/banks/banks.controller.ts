import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  async create(@Body() createBankDto: CreateBankDto): Promise<void> {
    this.banksService.create(createBankDto);

    console.log(`Create bank`);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<void> {
    this.banksService.getById(id);

    console.log(`Get bank by id: ${id}`);
  }

  @Get()
  async get(): Promise<void> {
    this.banksService.get();

    console.log(`Get all banks`);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<void> {
    this.banksService.updateById(id, updateBankDto);

    console.log(`Update bank by id: ${id}`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    this.banksService.deleteById(id);

    console.log(`Delete bank by id: ${id}`);
  }
}
