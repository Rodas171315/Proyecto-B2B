import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/nuevo')
  newEndpoint() {
    return 'Yo soy un nuevo endpoint';
  }

  @Get('/usuarios/:usuarioId')
  getUsuario(@Param('usuarioId') usuarioId: string) {
    return `usuario ${usuarioId}`;
  }

  @Get('categories/:categoryId/products/:productId')
  getCategory(@Param() { categoryId, productId }) {
    return `Product ${productId}, Category ${categoryId}`;
  }
}
