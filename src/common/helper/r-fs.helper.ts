import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { FsHelper } from './interface/fs.helper';

@Injectable()
export class RFsHelper implements FsHelper {
  private readonly dir: string = process.cwd();
  private readonly path: string = `${this.dir}/database`;
  private readonly logger = new Logger('FsHelper');

  readFile<T>(file: string): { [index: string]: T } {
    try {
      const json = fs.readFileSync(`${this.path}/${file}.json`, {
        encoding: 'utf8',
      });

      return JSON.parse(json);
    } catch (e) {
      this.logger.error(e);

      this.writeFile(file, {});

      return {};
    }
  }

  writeFile(file: string, json: { [index: string]: any }): boolean {
    try {
      fs.writeFileSync(`${this.path}/${file}.json`, JSON.stringify(json));

      return true;
    } catch (e) {
      this.logger.error(e);

      return false;
    }
  }
}
