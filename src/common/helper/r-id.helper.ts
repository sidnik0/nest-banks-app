import { Injectable } from '@nestjs/common';
import { IdHelper } from './interface/id.helper';

@Injectable()
export class RIdHelper implements IdHelper {
  createId(): string {
    return Date.now().toString(36);
  }
}
