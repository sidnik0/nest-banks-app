import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from '../command/command.module';
import { ConsoleInterpreter } from './console-interpreter';
import { ConsoleCommandResultViewer } from './console-command-result-viewer';
import { ConsoleLineParser } from './console-line-parser';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://user:password@localhost:5432/db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommandModule,
  ],
  providers: [ConsoleInterpreter, ConsoleCommandResultViewer, ConsoleLineParser],
  exports: [ConsoleInterpreter],
})
export class CliModule {}
