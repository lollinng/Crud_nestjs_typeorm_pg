import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [DbModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}
