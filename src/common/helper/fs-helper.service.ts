import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FsHelperService {
  private readonly dir: string = process.cwd();

  readFile<T>(file: string): { [index: string]: T } {
    try {
      const json = fs.readFileSync(`${this.dir}/database/${file}.json`, {
        encoding: 'utf8',
      });

      return JSON.parse(json);
    } catch (e) {
      console.log(e.message);

      this.writeFile(file, {});
    }
  }

  writeFile(file: string, json: { [index: string]: any }): boolean {
    try {
      fs.writeFileSync(
        `${this.dir}/database/${file}.json`,
        JSON.stringify(json),
      );

      return true;
    } catch (e) {
      console.log(e.message);

      return false;
    }
  }
}
