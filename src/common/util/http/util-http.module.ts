import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRateService } from './http-rate.service';

@Module({
  imports: [HttpModule],
  providers: [HttpRateService],
  exports: [HttpRateService],
})
export class UtilHttpModule {}
