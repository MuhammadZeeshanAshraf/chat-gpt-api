import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('models')
  getModel() {
    return this.appService.getModel();
  }

  @Post('completions')
  createCompletion() {
    return this.appService.createCompletion();
  }
}
