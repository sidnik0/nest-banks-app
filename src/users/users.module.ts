import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HelpersModule } from '../common/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
