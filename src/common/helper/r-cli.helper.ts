import { Injectable } from '@nestjs/common';
import { CliHelper } from './interface/cli.helper';

@Injectable()
export class RCliHelper implements CliHelper {
  convertingArgs(
    args: ReadonlyArray<string>,
    properties: ReadonlyArray<string>,
  ): { [i: string]: string } {
    const result = {};

    if (!args || !args.length) return null;

    const processedArgs = args.map((item) => {
      const arrayStrings = item.split('=');

      return arrayStrings.map((item) => item.trim());
    });

    processedArgs.forEach((arg) => {
      properties.forEach((property) => {
        if (arg[0] === property) {
          result[arg[0]] = arg[1];
        }
      });
    });

    return result;
  }
}
