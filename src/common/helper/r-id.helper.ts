import { Injectable } from '@nestjs/common';
import { IdHelper } from './interface/id.helper';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RIdHelper implements IdHelper {
  createId(): string {
    return uuidv4();
  }
}
