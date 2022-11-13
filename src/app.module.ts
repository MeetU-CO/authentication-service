import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/infraestructure/api/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { urlConnection } from './user/infraestructure/implementation/mongodb/config';

@Module({
  imports: [MongooseModule.forRoot(urlConnection), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
