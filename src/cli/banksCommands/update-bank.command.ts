import { Command, CommandRunner, Option } from 'nest-commander';
import { BanksService } from '../../banks/banks.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { UpdateBankDto } from '../../banks/dto/update-bank.dto';

@Command({ name: 'update-bank', description: 'Update bank' })
export class UpdateBankCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly name = 'name';
  private readonly comEnt = 'comEnt';
  private readonly comInd = 'comInd';
  private readonly properties = [this.id, this.name, this.comEnt, this.comInd];

  constructor(
    private readonly banksService: BanksService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: UpdateBankDto): Promise<void> {
    const updateBank = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    const id = updateBank[this.id] || options.id;

    const bank = await this.banksService.updateById(id, {
      ...updateBank,
      ...options,
    });

    console.log(bank);
  }

  @Option({
    flags: '-i, id=<id>',
    description: 'Bank id',
  })
  parseId(id: string): string {
    if (!id) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return id;
  }

  @Option({
    flags: '-n, name=<name>',
    description: 'Bank name',
  })
  parseName(name: string): string {
    return name;
  }

  @Option({
    flags: '-e, comEnt=<comEnt>',
    description: 'Entity commission',
  })
  parseComEnt(comEnt: string): number {
    const com = Number.parseInt(comEnt);

    return com || 0;
  }

  @Option({
    flags: '-i, comInd=<comInd>',
    description: 'Individuals commission',
  })
  parseComInd(comInd: string): number {
    const com = Number.parseInt(comInd);

    return com || 0;
  }
}
