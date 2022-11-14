import { Module } from '@nestjs/common';
import { UserModule } from './user/infraestructure/api/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { urlConnection } from './user/infraestructure/implementation/mongodb/config';

@Module({
  imports: [MongooseModule.forRoot(urlConnection), UserModule],
})
export class AppModule {}
