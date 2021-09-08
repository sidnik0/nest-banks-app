import { Module } from '@nestjs/common';
import { ConsoleInterpreter } from './console-interpreter';
import { ConsoleCommandResultViewer } from './console-command-result-viewer';
import { CommandModule } from '../command/command.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommandLineParser } from './command-line-parser';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://user:password@localhost:5432/db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommandModule,
  ],
  providers: [ConsoleInterpreter, ConsoleCommandResultViewer, CommandLineParser],
  exports: [ConsoleInterpreter],
})
export class CliModule {}
