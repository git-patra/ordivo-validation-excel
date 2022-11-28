import { Module } from '@nestjs/common';
import { AppController } from './module/infra/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
