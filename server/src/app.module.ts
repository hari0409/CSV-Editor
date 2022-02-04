import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule,MongooseModule.forRoot("mongodb+srv://admin:admin@cluster0.ohemp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")],
  controllers: [],
  providers: [],
})
export class AppModule {}