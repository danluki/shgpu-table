import { Injectable } from '@nestjs/common';

@Injectable()
export class PairsService {
  getHello(): string {
    return 'Hello World!';
  }
}
