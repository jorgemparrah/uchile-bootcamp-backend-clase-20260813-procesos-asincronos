import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Res() res: Response
  ) {
    const salida = this.appService.getHello();
    console.log(1);
    
    setTimeout(() => {
      console.log(2);
      setTimeout(() => {
        console.log(3);
        setTimeout(() => {
          console.log(5);
          res.send(salida);
        }, 5000);
      }, 1000);
    }, 2000);

    console.log(4);
    
    // return this.appService.getHello();
  }
}
