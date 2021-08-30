import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FileSystem {
  private readonly dir: string = process.cwd();
  private readonly path: string = `${this.dir}/database`;
  private readonly logger = new Logger('FsHelper');

  readFile<T>(file: string): { [i: string]: T } {
    try {
      if (fs.existsSync(`${this.path}/${file}.json`)) {
        const json = fs.readFileSync(`${this.path}/${file}.json`, {
          encoding: 'utf8',
        });

        return JSON.parse(json);
      } else {
        if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);

        fs.writeFileSync(`${this.path}/${file}.json`, JSON.stringify({}));

        return {};
      }
    } catch (e) {
      this.logger.error(`File ${file}.json read error`, e.stack);

      throw e;
    }
  }

  writeFile(file: string, json: { [index: string]: any }): void {
    try {
      fs.writeFileSync(`${this.path}/${file}.json`, JSON.stringify(json));
    } catch (e) {
      this.logger.error(`File ${file}.json write error`, e.stack);

      throw e;
    }
  }
}
