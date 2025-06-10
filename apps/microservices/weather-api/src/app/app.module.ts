import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherService } from './weather.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [WeatherService],
})
export class AppModule {}
