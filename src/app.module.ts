import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import typeOrmConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtModule } from './art/art.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.mysqlConfig),
    UsersModule,
    ArtModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
