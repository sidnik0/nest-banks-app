import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { BaseController } from './base.controller';
import { RateModel } from '../../model/interface/rate.model';
import { CommandName } from '../../types/command-name.type';
import { UpdateRateDto } from './rest-dto/update-rate.dto';
import { IdDto } from './rest-dto/id.dto';

@Controller('rates')
export class RateController extends BaseController {
  @Get(':id')
  async get(@Param() idDto: IdDto): Promise<RateModel> {
    return await this.executeCommand({ name: CommandName.GET_RATE, params: { id: idDto.id } });
  }

  @Get()
  async getAll(): Promise<RateModel[]> {
    return await this.executeCommand({ name: CommandName.GET_RATES, params: {} });
  }

  @Put(':id')
  async update(@Param() idDto: IdDto, @Body() updateRateDto: UpdateRateDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_RATE, params: { id: idDto.id, ...updateRateDto } });
  }
}
