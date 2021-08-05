import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  createId(): string {
    return Date.now().toString(36);
  }
}
