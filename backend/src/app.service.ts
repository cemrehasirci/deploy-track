// DB'den veri çeken

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Deploy Track API is running',
      version: '1.0.0',
      status: 'OK',
    };
  }
}
