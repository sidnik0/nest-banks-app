import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { RateModel } from '../../model/interface/rate.model';
import { CommandName } from '../../types/command-name.type';
import { UpdateRateDto } from './rest-dto/update-rate.dto';
import { IdDto } from './rest-dto/id.dto';

@ApiTags('rates')
@Controller('rates')
export class RateController extends BaseController {
  @Get(':id')
  @ApiOperation({ summary: 'Get rate by bank id', description: 'Get rate by bank id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: RateModel, status: 200 })
  async get(@Param() idDto: IdDto): Promise<RateModel> {
    return await this.executeCommand({ name: CommandName.RATE_GET, params: { id: idDto.id } });
  }

  @Get()
  @ApiOperation({ summary: 'Get all rates', description: 'Get all rates' })
  @ApiResponse({ type: [RateModel], status: 200 })
  async getAll(): Promise<RateModel[]> {
    return await this.executeCommand({ name: CommandName.RATE_GET_ALL, params: {} });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update rate by bank id', description: 'Update rate by bank id' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateRateDto })
  async update(@Param() idDto: IdDto, @Body() updateRateDto: UpdateRateDto): Promise<void> {
    await this.executeCommand({ name: CommandName.RATE_UPDATE, params: { id: idDto.id, ...updateRateDto } });
  }
}
