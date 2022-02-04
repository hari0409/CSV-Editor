import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot(),UserModule,MongooseModule.forRoot(process.env.MONGODB_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
