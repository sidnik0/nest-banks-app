import { Injectable } from '@nestjs/common';
import { IIdHelper } from './interface/id-helper';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IdHelper implements IIdHelper {
  createId(): string {
    return uuidv4();
  }
}
