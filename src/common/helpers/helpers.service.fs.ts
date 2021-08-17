import * as fs from 'fs/promises';
import { dirname } from '../../path';

import { Injectable } from '@nestjs/common';
import { HelpersService } from './helpers.service';

@Injectable()
export class HelpersServiceFs extends HelpersService {
  createId(): string {
    return Date.now().toString(36);
  }

  convertingArgs(
    args: ReadonlyArray<string>,
    currentProperties: ReadonlyArray<string>,
  ): any {
    const result = {};

    const processedArgs = args.map((item) => {
      const arrayStrings = item.split('=');

      return arrayStrings.map((item) => item.trim());
    });

    processedArgs.forEach((arg) => {
      currentProperties.forEach((property) => {
        if (arg[0] === property) {
          result[arg[0]] = arg[1];
        }
      });
    });

    return result;
  }

  async readFile(file: string) {
    try {
      const buffer = await fs.readFile(`${dirname}/database/${file}.json`, {
        encoding: 'utf8',
      });

      return JSON.parse(buffer);
    } catch (e) {
      console.log(e);
    }
  }

  async writeFile(file: string, data: Map<string, any>) {
    await fs.writeFile(
      `${dirname}/database/${file}.json`,
      JSON.stringify(data),
    );
  }
}
