import { Injectable } from '@nestjs/common';
import { BanksService } from '../../banks/banks.service';
import { RIdHelper } from '../../../common/helper/r-id.helper';

import { UpdateBankDto } from '../../banks/dto/update-bank.dto';
import { commands } from '../commands';
import { updateBankHelp } from '../helps';

@Injectable()
export class UpdateBankCommand {
  private readonly id = 'id';
  private readonly name = 'name';
  private readonly comEnt = 'comEnt';
  private readonly comInd = 'comInd';
  private readonly properties = [this.id, this.name, this.comEnt, this.comInd];

  constructor(
    private readonly banksService: BanksService,
    private readonly helpersService: RIdHelper,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(updateBankHelp);
      process.exit(0);
    }

    const updateBank = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    try {
      updateBank[this.id] = this.parseId(updateBank[this.id]);

      updateBank[this.name] = this.parseName(updateBank[this.name]);

      updateBank[this.comEnt] = this.parseComEnt(updateBank[this.comEnt]);

      updateBank[this.comInd] = this.parseComInd(updateBank[this.comInd]);

      const id = updateBank[this.id];

      const bank = await this.banksService.updateById(
        id,
        updateBank as UpdateBankDto,
      );

      console.log(bank);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return id;
  }

  parseName(name: string): string {
    return name;
  }

  parseComEnt(comEnt: string): number {
    const com = Number.parseInt(comEnt);

    return com || 0;
  }

  parseComInd(comInd: string): number {
    const com = Number.parseInt(comInd);

    return com || 0;
  }
}
